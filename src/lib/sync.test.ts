import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Attempt } from './session.ts';
import { loadScores, pendingAttempts, pendingResets, resetExam, saveAttempt } from './storage.ts';
import { setKey, syncNow } from './sync.ts';

// 노드에는 localStorage가 없어서 메모리로 흉내 낸다. fail에 맞는 키는 저장 공간 부족처럼 실패한다.
class MemoryStorage {
  map = new Map<string, string>();
  fail: RegExp | null = null;
  getItem(k: string) {
    return this.map.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    if (this.fail?.test(k)) throw new DOMException('full', 'QuotaExceededError');
    this.map.set(k, v);
  }
  removeItem(k: string) {
    this.map.delete(k);
  }
  get length() {
    return this.map.size;
  }
  key(i: number) {
    return [...this.map.keys()][i] ?? null;
  }
}
let store: MemoryStorage;
const EXAM = 'ex';
const config = () => JSON.parse(store.getItem('cme:v1:sync') ?? '{}') as { cursor?: number };

const remote = {
  seq: 1,
  examId: EXAM,
  id: 'r1',
  finishedAt: 10,
  scores: { q1: 0 },
  body: null as Attempt | null,
};
const ok = (data: unknown) => new Response(JSON.stringify(data), { status: 200 });
const pullOne = () => ok({ attempts: [remote], resets: [], cursor: 1, more: false });

beforeEach(() => {
  store = new MemoryStorage();
  (globalThis as { localStorage?: unknown }).localStorage = store;
  store.setItem('cme:v1:sync', JSON.stringify({ key: 'cme-TEST' }));
});
afterEach(() => vi.unstubAllGlobals());

describe('동기화', () => {
  it('받은 기록을 저장하지 못하면 오류를 내고 커서를 옮기지 않는다', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => pullOne()),
    );
    store.fail = /:scores:/;
    const first = await syncNow();
    expect(first.state).toBe('error');
    expect(config().cursor ?? 0).toBe(0);

    // 공간이 생기면 같은 기록을 다시 받는다.
    store.fail = null;
    const second = await syncNow();
    expect(second).toMatchObject({ state: 'ok', pulled: 1 });
    expect(config().cursor).toBe(1);
    expect(loadScores(EXAM).map((e) => e.id)).toEqual(['r1']);
  });

  it('동기화 중에 생긴 변경은 끝난 뒤 한 번 더 돌아 올린다', async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const calls: string[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        calls.push(url);
        if (url.startsWith('/api/sync')) {
          if (calls.filter((c) => c.startsWith('/api/sync')).length === 1) await gate;
          return ok({ attempts: [], resets: [], cursor: 0, more: false });
        }
        return ok({ ok: true });
      }),
    );
    const first = syncNow();
    await vi.waitFor(() => expect(calls).toContain('/api/sync?since=0'));
    // 첫 실행이 받기 단계에 있는 동안 초기화한다.
    resetExam(EXAM, 100);
    const second = syncNow();
    release();
    await first;
    expect(await second).toMatchObject({ state: 'ok' });
    expect(calls).toContain('/api/reset');
    expect(pendingResets()).toEqual([]);
  });

  it('올린 표시를 저장하지 못해도 기록을 빠뜨리지 않고 다음 동기화에서 다시 올린다', async () => {
    // 결과만 저장되고 동기화용 표시는 저장되지 않는 상황(예전 구현의 pending 목록 포함)
    store.fail = /:pending:|:synced:/;
    saveAttempt({
      id: 'a1',
      examId: EXAM,
      finishedAt: 10,
      itemScores: { q1: 1 },
    } as unknown as Attempt);
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) =>
        url === '/api/attempts'
          ? ok({ ok: true })
          : ok({ attempts: [], resets: [], cursor: 0, more: false }),
      ),
    );
    expect(await syncNow()).toMatchObject({ state: 'ok', pushed: 1 });
    store.fail = null;
    expect(await syncNow()).toMatchObject({ state: 'ok', pushed: 1 });
    expect(await syncNow()).toMatchObject({ state: 'ok', pushed: 0 });
  });

  it('올리는 중에 키를 바꾸면 예전 키의 응답으로 새 키의 올릴 목록을 지우지 않는다', async () => {
    saveAttempt({
      id: 'a1',
      examId: EXAM,
      finishedAt: 10,
      itemScores: { q1: 1 },
    } as unknown as Attempt);
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const posts: string[] = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string, init?: RequestInit) => {
        const auth = (init?.headers as Record<string, string>).Authorization ?? '';
        if (url === '/api/attempts') {
          posts.push(auth);
          if (auth === 'Bearer cme-TEST') await gate;
          return ok({ ok: true });
        }
        return ok({ attempts: [], resets: [], cursor: 0, more: false });
      }),
    );
    const first = syncNow();
    await vi.waitFor(() => expect(posts).toEqual(['Bearer cme-TEST']));
    setKey('cme-B');
    const second = syncNow();
    release();
    await first;
    expect(await second).toMatchObject({ state: 'ok', pushed: 1 });
    expect(posts).toEqual(['Bearer cme-TEST', 'Bearer cme-B']);
    expect(pendingAttempts()).toEqual([]);
  });
});
