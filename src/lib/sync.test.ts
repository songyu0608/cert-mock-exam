import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Attempt } from './session.ts';
import { loadPendingResets, loadScores, resetExam } from './storage.ts';
import { syncNow } from './sync.ts';

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
    expect(loadPendingResets()).toEqual({});
  });
});
