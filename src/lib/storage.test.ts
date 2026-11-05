import { beforeEach, describe, expect, it } from 'vitest';
import type { Attempt } from './session.ts';
import {
  applyReset,
  loadAttempt,
  loadAttempts,
  loadScores,
  loadStats,
  markSynced,
  mergeRemote,
  MAX_ATTEMPTS,
  pendingAttempts,
  pendingResets,
  resetExam,
  saveAttempt,
  wrongKeys,
} from './storage.ts';
import { generateKey, keyHash, normalizeKey } from './sync.ts';

// 노드에는 localStorage가 없어서 메모리로 흉내 낸다.
class MemoryStorage {
  map = new Map<string, string>();
  getItem(k: string) {
    return this.map.get(k) ?? null;
  }
  setItem(k: string, v: string) {
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
beforeEach(() => {
  store = new MemoryStorage();
  (globalThis as { localStorage?: unknown }).localStorage = store;
});

const EXAM = 'ex';
function attempt(id: string, at: number, itemScores: Record<string, number>): Attempt {
  return {
    id,
    examId: EXAM,
    mode: 'practice',
    startedAt: at - 1000,
    finishedAt: at,
    total: Object.keys(itemScores).length,
    score: Object.values(itemScores).reduce((s, n) => s + n, 0),
    percent: 0,
    byDomain: {},
    itemScores,
  } as unknown as Attempt;
}
const row = (a: Attempt, body = true) => ({
  id: a.id,
  at: a.finishedAt,
  scores: a.itemScores,
  body: body ? a : null,
});

describe('저장 형식', () => {
  it('예전 버전의 결과 기록에서 점수 기록을 만들고 누적 통계는 지운다', () => {
    store.setItem(`cme:v1:attempts:${EXAM}`, JSON.stringify([attempt('a2', 20, { q1: 1 })]));
    store.setItem(
      `cme:v1:stats:${EXAM}`,
      JSON.stringify({ q1: { n: 1, sum: 1, last: 1, at: 20 } }),
    );
    expect(loadScores(EXAM)).toEqual([{ id: 'a2', at: 20, s: { q1: 1 } }]);
    expect(store.getItem(`cme:v1:stats:${EXAM}`)).toBeNull();
    expect(loadStats(EXAM).q1).toEqual({ n: 1, sum: 1, last: 1, at: 20 });
  });

  it('통계는 끝난 시각 순서로 계산한다(받은 순서와 무관)', () => {
    mergeRemote(EXAM, [row(attempt('late', 30, { q1: 1 })), row(attempt('early', 10, { q1: 0 }))]);
    expect(loadStats(EXAM).q1).toEqual({ n: 2, sum: 1, last: 1, at: 30 });
    expect(wrongKeys(loadStats(EXAM))).toEqual([]);
  });

  it('같은 기록을 두 번 받아도 두 번 세지 않는다', () => {
    const a = attempt('a1', 10, { q1: 0, q2: 1 });
    saveAttempt(a);
    mergeRemote(EXAM, [row(a)]);
    mergeRemote(EXAM, [row(a)]);
    expect(loadStats(EXAM).q1?.n).toBe(1);
    expect(loadAttempts(EXAM)).toHaveLength(1);
  });

  it('결과 기록은 최근 MAX_ATTEMPTS개만 두지만 점수 기록은 모두 남는다', () => {
    for (let i = 1; i <= MAX_ATTEMPTS + 5; i++) saveAttempt(attempt(`a${i}`, i, { q1: i % 2 }));
    expect(loadAttempts(EXAM)).toHaveLength(MAX_ATTEMPTS);
    expect(loadAttempts(EXAM)[0]!.id).toBe(`a${MAX_ATTEMPTS + 5}`);
    expect(loadScores(EXAM)).toHaveLength(MAX_ATTEMPTS + 5);
    expect(loadStats(EXAM).q1?.n).toBe(MAX_ATTEMPTS + 5);
    // 밀려난 기록은 점수 요약만 올린다.
    const evicted = pendingAttempts().find((p) => p.id === 'a1');
    expect(evicted).toMatchObject({ id: 'a1', scores: { q1: 1 }, body: null });
  });

  it('받은 기록이 이 기기 기록보다 오래됐으면 최근 MAX_ATTEMPTS개 안에서만 둔다', () => {
    for (let i = 1; i <= MAX_ATTEMPTS; i++) saveAttempt(attempt(`a${i}`, 100 + i, { q1: 1 }));
    mergeRemote(EXAM, [row(attempt('old', 1, { q1: 0 }))]);
    expect(loadAttempts(EXAM).some((a) => a.id === 'old')).toBe(false);
    expect(loadStats(EXAM).q1).toMatchObject({ n: MAX_ATTEMPTS + 1, last: 1 });
  });

  it('받은 기록이 더 최근이어도(기기 시계 차이) 방금 저장한 결과는 밀려나지 않는다', () => {
    mergeRemote(
      EXAM,
      Array.from({ length: MAX_ATTEMPTS }, (_, i) => row(attempt(`r${i}`, 1000 + i, { q1: 1 }))),
    );
    expect(saveAttempt(attempt('mine', 5, { q1: 0 }))).toBe(true);
    expect(loadAttempt(EXAM, 'mine')).toBeDefined();
    expect(loadAttempts(EXAM)).toHaveLength(MAX_ATTEMPTS);
  });
});

describe('올릴 기록', () => {
  it('서버에 있다고 확인한 것만 빼고 모두 올린다(받은 기록은 다시 올리지 않음)', () => {
    saveAttempt(attempt('a1', 10, { q1: 0 }));
    saveAttempt(attempt('a2', 20, { q1: 1 }));
    mergeRemote(EXAM, [row(attempt('r1', 30, { q1: 1 }))]);
    expect(pendingAttempts().map((p) => p.id)).toEqual(['a1', 'a2']);
    markSynced(EXAM, ['a1', 'a2']);
    expect(pendingAttempts()).toEqual([]);
  });

  it('올린 표시를 저장하지 못해도 다음에 다시 올린다', () => {
    saveAttempt(attempt('a1', 10, { q1: 0 }));
    const setItem = store.setItem.bind(store);
    store.setItem = (k, v) => {
      if (k.includes(':synced:')) throw new DOMException('full', 'QuotaExceededError');
      setItem(k, v);
    };
    markSynced(EXAM, ['a1']);
    expect(pendingAttempts().map((p) => p.id)).toEqual(['a1']);
  });
});

describe('기록 지우기', () => {
  it('지운 시각 이전 기록은 지우고, 나중에 받아도 버린다', () => {
    saveAttempt(attempt('a1', 10, { q1: 0 }));
    resetExam(EXAM, 50);
    expect(loadAttempts(EXAM)).toEqual([]);
    expect(loadStats(EXAM)).toEqual({});
    expect(pendingAttempts()).toEqual([]);
    expect(pendingResets()).toEqual([{ examId: EXAM, at: 50 }]);
    mergeRemote(EXAM, [row(attempt('a0', 40, { q1: 0 })), row(attempt('a2', 60, { q1: 1 }))]);
    expect(loadAttempts(EXAM).map((a) => a.id)).toEqual(['a2']);
  });

  it('지운 시각을 저장하지 못하면 기록을 지우지 않고 실패를 알린다', () => {
    saveAttempt(attempt('a1', 10, { q1: 0 }));
    const setItem = store.setItem.bind(store);
    store.setItem = (k, v) => {
      if (k.includes(':reset:')) throw new DOMException('full', 'QuotaExceededError');
      setItem(k, v);
    };
    expect(resetExam(EXAM, 50)).toBe(false);
    expect(loadAttempts(EXAM).map((a) => a.id)).toEqual(['a1']);
    expect(loadStats(EXAM).q1?.n).toBe(1);
    // 지운 시각을 받아 적용할 때도 같다(동기화는 이때 오류를 내고 커서를 옮기지 않는다).
    expect(applyReset(EXAM, 60)).toBe(false);
    expect(loadAttempts(EXAM)).toHaveLength(1);
  });

  it('더 이른 지운 시각은 무시한다', () => {
    applyReset(EXAM, 50);
    mergeRemote(EXAM, [row(attempt('a2', 60, { q1: 1 }))]);
    expect(applyReset(EXAM, 40)).toBe(false);
    expect(loadAttempts(EXAM)).toHaveLength(1);
  });
});

describe('비밀키', () => {
  it('새 키는 정규화해도 그대로이고, 공백·소문자 입력도 같은 키가 된다', () => {
    const key = generateKey();
    expect(key).toMatch(/^cme-([A-Z0-9]{4}-){6}[A-Z0-9]{2}$/);
    expect(normalizeKey(key)).toBe(key);
    expect(normalizeKey(` ${key.toLowerCase().replaceAll('-', ' ')} `)).toBe(key);
    expect(normalizeKey('cme-1234')).toBeNull();
    expect(normalizeKey(key.replace(/.$/, 'I'))).toBeNull();
  });

  it('등록 코드는 키의 SHA-256이다(e2e 설정 값과 같음)', async () => {
    expect(await keyHash('cme-E2ET-ESTK-EY00-0000-0000-0000-00')).toBe(
      '250c3646e0bf7e768bbdfcef6e7668fa24cdac6b6ad8eddd07751fe34965b6da',
    );
  });
});

describe('같은 결과 id', () => {
  it('두 번 저장해도 처음 결과를 그대로 둔다(결과 기록은 바꾸지 않음)', () => {
    expect(saveAttempt(attempt('a1', 10, { q1: 0 }))).toBe(true);
    expect(saveAttempt(attempt('a1', 20, { q1: 1 }))).toBe(true);
    expect(loadAttempts(EXAM)).toHaveLength(1);
    expect(loadAttempts(EXAM)[0]!.itemScores).toEqual({ q1: 0 });
    expect(loadStats(EXAM).q1).toMatchObject({ n: 1, last: 0 });
  });
});
