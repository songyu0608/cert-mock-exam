import { useMemo, useState } from 'react';
import { DomainTable } from '../components/DomainTable.tsx';
import { VendorBadge } from '../components/VendorBadge.tsx';
import { inHiddenSet, type Exam } from '../data/schema.ts';
import { flattenQuestion } from '../lib/items.ts';
import { shuffle } from '../lib/scoring.ts';
import {
  createSession,
  mockMinutes,
  pickMockQuestions,
  pickScenarioMock,
  pickSetMock,
  sessionLabel,
  type Mode,
} from '../lib/session.ts';
import {
  clearActive,
  loadActive,
  loadAttempts,
  loadStats,
  resetExam,
  saveActive,
  wrongKeys,
} from '../lib/storage.ts';
import { getKey, syncNow } from '../lib/sync.ts';
import { useQuestions } from '../lib/useQuestions.ts';
import { useRecordsVersion } from '../lib/useRecords.ts';
import { navigate, onLinkClick, paths } from '../router.ts';

const PRACTICE_COUNTS = [10, 20, 50] as const;

export function ExamHome({ exam }: { exam: Exam }) {
  const { data, error } = useQuestions(exam.id);
  // 기록을 지우거나 세션을 버리면 다시 읽도록 하는 값
  const [localRev, setRev] = useState(0);
  // 다른 기기에서 받은 기록도 반영한다.
  const rev = localRev + useRecordsVersion(exam.id);
  const active = useMemo(() => (rev >= 0 ? loadActive(exam.id) : null), [exam.id, rev]);
  const attempts = useMemo(() => (rev >= 0 ? loadAttempts(exam.id) : []), [exam.id, rev]);
  const stats = useMemo(() => (rev >= 0 ? loadStats(exam.id) : {}), [exam.id, rev]);

  const [mockN, setMockN] = useState(exam.mock.questions);
  const [domains, setDomains] = useState<string[]>(exam.domains.map((d) => d.id));
  // 숨긴 회차는 실전 목록·연습·오답 다시 풀기에서 뺀다(문항과 기록은 그대로).
  const sets = useMemo(() => exam.sets.filter((s) => !s.hidden), [exam]);
  const [practiceSets, setPracticeSets] = useState<string[]>(sets.map((s) => s.id));
  const scenarioExam = !!exam.mock.scenarios;
  const inPracticeSets = (set?: string) =>
    !exam.sets.length || (set !== undefined && practiceSets.includes(set));
  const [practiceN, setPracticeN] = useState<number | 'all'>(20);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetFailed, setResetFailed] = useState(false);

  // 숨긴 회차를 뺀 문항 key. 오답 다시 풀기와 도메인별 정답률은 이것만 센다.
  const visibleKeys = useMemo(
    () =>
      new Set(
        (data?.questions ?? [])
          .filter((q) => !inHiddenSet(exam, q.set))
          .flatMap((q) => flattenQuestion(q).map((i) => i.key)),
      ),
    [exam, data],
  );

  const wrong = useMemo(
    () => wrongKeys(stats).filter((k) => visibleKeys.has(k)),
    [visibleKeys, stats],
  );

  const domainRows = useMemo(
    () =>
      exam.domains.map((d) => {
        const keys =
          data?.items
            .filter((i) => i.topDomain === d.id && visibleKeys.has(i.key))
            .map((i) => i.key) ?? [];
        const seen = keys.filter((k) => stats[k]);
        const sum = seen.reduce((s, k) => s + stats[k]!.last, 0);
        return {
          id: d.id,
          pct: seen.length ? (sum / seen.length) * 100 : null,
          detail: `${seen.length}/${keys.length} 풀이`,
        };
      }),
    [exam, data, stats, visibleKeys],
  );

  // 회차별 문항 수(하위 문항까지 센다)
  const setSizes = useMemo(() => {
    const out: Record<string, number> = {};
    for (const q of data?.questions ?? [])
      if (q.set !== undefined) out[q.set] = (out[q.set] ?? 0) + flattenQuestion(q).length;
    return out;
  }, [data]);

  // 회차별 정답률(문항마다 마지막으로 푼 결과)
  const setRates = useMemo(() => {
    const out: Record<string, number | null> = {};
    for (const st of sets) {
      const keys =
        data?.questions
          .filter((q) => q.set === st.id)
          .flatMap((q) => flattenQuestion(q).map((i) => i.key)) ?? [];
      const seen = keys.filter((k) => stats[k]);
      out[st.id] = seen.length
        ? Math.round((seen.reduce((sum, k) => sum + stats[k]!.last, 0) / seen.length) * 100)
        : null;
    }
    return out;
  }, [sets, data, stats]);

  const start = (mode: Mode, setId?: string) => {
    if (!data) return;
    let s;
    if (mode === 'mock' && scenarioExam) {
      const picked = pickScenarioMock(exam, data.questions, setId);
      const set = exam.sets.find((x) => x.id === setId);
      const label = [set?.name, `시나리오 ${picked.scenarios.join('·')}`]
        .filter(Boolean)
        .join(' · ');
      // 시나리오를 적게 고정한 회차는 문항 수에 비례해 시간을 줄인다.
      const n = picked.questions.flatMap(flattenQuestion).length;
      s = createSession(exam, picked.questions, 'mock', { minutes: mockMinutes(exam, n), label });
    } else if (mode === 'mock' && setId !== undefined) {
      const picked = pickSetMock(exam, data.questions, setId);
      const n = picked.flatMap(flattenQuestion).length;
      const label = exam.sets.find((x) => x.id === setId)?.name;
      s = createSession(exam, picked, 'mock', { minutes: mockMinutes(exam, n), label });
    } else if (mode === 'mock') {
      const picked = pickMockQuestions(exam, data.questions, mockN);
      s = createSession(exam, picked, 'mock', { minutes: mockMinutes(exam, mockN) });
    } else if (mode === 'practice') {
      const pool = shuffle(
        data.questions.filter(
          (q) => domains.includes(q.domain.split('.')[0] ?? '') && inPracticeSets(q.set),
        ),
      );
      const picked = [];
      let n = 0;
      for (const q of pool) {
        if (practiceN !== 'all' && n >= practiceN) break;
        picked.push(q);
        n += flattenQuestion(q).length;
      }
      s = createSession(exam, picked, 'practice');
    } else {
      const set = new Set(wrong);
      const picked = shuffle(
        data.questions.filter((q) => flattenQuestion(q).some((i) => set.has(i.key))),
      );
      s = createSession(exam, picked, 'review', { onlyKeys: set });
    }
    if (!s.itemKeys.length) return;
    saveActive(s);
    navigate(paths.play(exam.id));
  };

  const practiceAvailable = data
    ? data.questions
        .filter((q) => domains.includes(q.domain.split('.')[0] ?? '') && inPracticeSets(q.set))
        .flatMap(flattenQuestion).length
    : 0;
  const blocked = !!active;

  return (
    <main className="wrap stack">
      <nav className="crumb">
        <a href={paths.list()} onClick={onLinkClick}>
          ← 시험 목록
        </a>
      </nav>
      <header className="stack" style={{ gap: 8 }}>
        <div className="row">
          <VendorBadge vendor={exam.vendor} />
          <span className="code">{exam.code}</span>
          {exam.level && <span className="muted small">{exam.level}</span>}
        </div>
        <h1>{exam.name}</h1>
        {exam.notes && <p className="lede">{exam.notes}</p>}
        {(exam.guides.length > 0 || exam.theories.length > 0) && (
          <p className="row small" style={{ margin: 0 }}>
            {exam.guides.map((g) => (
              <a key={g.id} href={paths.guide(exam.id, g.id)} onClick={onLinkClick}>
                {g.title} 읽기
              </a>
            ))}
            {exam.theories.map((t) => (
              <a key={t.id} href={paths.theory(exam.id, t.id)} onClick={onLinkClick}>
                {t.title} 읽기
              </a>
            ))}
          </p>
        )}
      </header>

      {exam.facts.length > 0 && (
        <div className="facts">
          {exam.facts.map((f) => (
            <div key={f.label}>
              <b>{f.value}</b>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      )}

      {error && <p className="note">문항을 불러오지 못했습니다: {error}</p>}

      {active && (
        <div className="banner spread" role="status">
          <span>
            <b>{sessionLabel(active)}</b> 진행 중 · {active.current + 1}/{active.itemKeys.length}번
          </span>
          <span className="row">
            <button
              type="button"
              className="btn primary"
              onClick={() => navigate(paths.play(exam.id))}
            >
              이어 풀기
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                clearActive(exam.id);
                setRev((r) => r + 1);
              }}
            >
              버리기
            </button>
          </span>
        </div>
      )}

      <section className="modes" aria-label="풀이 모드">
        <div className="panel mode">
          <h2>실전 모의고사</h2>
          {scenarioExam ? (
            <p>
              시나리오 {exam.mock.scenarios}개 × {exam.mock.questions / exam.mock.scenarios!}
              문항을 시나리오별로 묶어 출제하고 시간을 잽니다. 끝까지 풀고 제출하면 한꺼번에
              채점합니다.
            </p>
          ) : exam.sets.length > 0 ? (
            <p>
              회차마다 정해진 문항을 출제하고 시간을 잽니다. 끝까지 풀고 제출하면 한꺼번에
              채점합니다.
            </p>
          ) : (
            <p>도메인 비중대로 출제하고 시간을 잽니다. 끝까지 풀고 제출하면 한꺼번에 채점합니다.</p>
          )}
          {exam.sets.length > 0 ? (
            <>
              <p className="small">
                {exam.mock.questions}문항 · {exam.mock.minutes}분 · 합격선 {exam.mock.passPercent}%
              </p>
              <div className="set-list">
                {sets.map((st) => (
                  <div className="set-row" key={st.id}>
                    <button
                      type="button"
                      className="btn primary"
                      disabled={!data || blocked}
                      onClick={() => start('mock', st.id)}
                    >
                      {st.name} 시작
                    </button>
                    <span className="small muted">
                      {!scenarioExam
                        ? `${setSizes[st.id] ?? 0}문항 고정`
                        : st.scenarios
                          ? `시나리오 ${st.scenarios.join('·')}${
                              st.scenarios.length < exam.mock.scenarios!
                                ? ` · ${setSizes[st.id] ?? 0}문항`
                                : ''
                            }`
                          : `시나리오 ${exam.mock.scenarios}개 무작위`}
                      {setRates[st.id] != null && ` · 정답률 ${setRates[st.id]}%`}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : exam.mock.questionChoices ? (
            <label className="row small">
              문항 수
              <select
                className="sel"
                value={mockN}
                onChange={(e) => setMockN(Number(e.target.value))}
              >
                {exam.mock.questionChoices.map((n) => (
                  <option key={n} value={n}>
                    {n}문항 · {mockMinutes(exam, n)}분
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <p className="small">
              {exam.mock.questions}문항 · {exam.mock.minutes}분 · 합격선 {exam.mock.passPercent}%
            </p>
          )}
          {!exam.sets.length && (
            <div className="row">
              <button
                type="button"
                className="btn primary"
                disabled={!data || blocked}
                onClick={() => start('mock')}
              >
                시작
              </button>
            </div>
          )}
        </div>

        <div className="panel mode">
          <h2>연습</h2>
          <p>
            문항마다 바로 채점하고 해설을 봅니다.{' '}
            {exam.sets.length ? '회차와 도메인을' : '도메인을'} 골라 풀 수 있습니다.
          </p>
          {exam.sets.length > 0 && (
            <div className="chips" role="group" aria-label="회차">
              {sets.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  className="chip"
                  aria-pressed={practiceSets.includes(st.id)}
                  onClick={() =>
                    setPracticeSets((cur) =>
                      cur.includes(st.id)
                        ? cur.filter((x) => x !== st.id)
                        : [...cur, st.id].sort((a, b) => Number(a) - Number(b)),
                    )
                  }
                >
                  {st.name}
                </button>
              ))}
            </div>
          )}
          <div className="chips" role="group" aria-label="도메인">
            {exam.domains.map((d) => (
              <button
                key={d.id}
                type="button"
                className="chip"
                aria-pressed={domains.includes(d.id)}
                title={d.name}
                onClick={() =>
                  setDomains((cur) =>
                    cur.includes(d.id) ? cur.filter((x) => x !== d.id) : [...cur, d.id].sort(),
                  )
                }
              >
                도메인 {d.id}
              </button>
            ))}
          </div>
          <label className="row small">
            문항 수
            <select
              className="sel"
              value={practiceN}
              onChange={(e) =>
                setPracticeN(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
            >
              {PRACTICE_COUNTS.map((n) => (
                <option key={n} value={n}>
                  {n}문항
                </option>
              ))}
              <option value="all">전체 ({practiceAvailable})</option>
            </select>
          </label>
          <div className="row">
            <button
              type="button"
              className="btn primary"
              disabled={!data || blocked || practiceAvailable === 0}
              onClick={() => start('practice')}
            >
              시작
            </button>
          </div>
        </div>

        <div className="panel mode">
          <h2>오답 다시 풀기</h2>
          <p>마지막으로 풀었을 때 틀린 문항만 다시 풉니다. 맞히면 목록에서 빠집니다.</p>
          <p className="small">
            틀린 문항 <b>{wrong.length}</b>개
          </p>
          <div className="row">
            <button
              type="button"
              className="btn primary"
              disabled={!data || blocked || wrong.length === 0}
              onClick={() => start('review')}
            >
              시작
            </button>
          </div>
        </div>
      </section>
      {blocked && (
        <p className="small muted">진행 중인 세션을 이어 풀거나 버린 뒤 새로 시작할 수 있습니다.</p>
      )}

      <section className="panel stack" aria-labelledby="dom-h">
        <h2 id="dom-h">도메인별 비중과 내 정답률</h2>
        <DomainTable exam={exam} rows={domainRows} />
        <p className="small muted">정답률은 문항마다 마지막으로 푼 결과로 계산합니다.</p>
      </section>

      {exam.scenarios.length > 0 && (
        <section className="panel stack" aria-labelledby="scen-h">
          <h2 id="scen-h">시나리오</h2>
          <ul className="scen-list" lang={exam.lang}>
            {exam.scenarios.map((sc) => (
              <li key={sc.id}>
                <details>
                  <summary>
                    <b>
                      {sc.id}. {sc.name}
                    </b>
                  </summary>
                  <p>{sc.description}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="panel stack" aria-labelledby="hist-h">
        <h2 id="hist-h">풀이 기록</h2>
        {attempts.length === 0 ? (
          <p className="muted small">아직 기록이 없습니다.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="history">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>모드</th>
                  <th>점수</th>
                  <th>결과</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <a href={paths.result(exam.id, a.id)} onClick={onLinkClick}>
                        {new Date(a.finishedAt).toLocaleString('ko-KR', {
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </a>
                    </td>
                    <td>{sessionLabel(a.session)}</td>
                    <td>
                      {Math.round(a.score * 10) / 10}/{a.total} ({a.percent}%)
                    </td>
                    <td>
                      {a.passed === undefined ? (
                        '–'
                      ) : (
                        <span className={`pill ${a.passed ? 'ok' : 'bad'}`}>
                          {a.passed ? '합격' : '불합격'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="row">
          {confirmReset ? (
            <>
              <span className="small">이 시험의 기록과 통계를 모두 지울까요?</span>
              <button
                type="button"
                className="btn sm danger"
                onClick={() => {
                  const ok = resetExam(exam.id);
                  setResetFailed(!ok);
                  setConfirmReset(false);
                  if (!ok) return;
                  setRev((r) => r + 1);
                  void syncNow();
                }}
              >
                지우기
              </button>
              <button type="button" className="btn sm" onClick={() => setConfirmReset(false)}>
                취소
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn sm ghost"
              onClick={() => setConfirmReset(true)}
              disabled={attempts.length === 0 && Object.keys(stats).length === 0}
            >
              기록 초기화
            </button>
          )}
        </div>
        {resetFailed && (
          <p className="note small" role="alert">
            기록을 지우지 못했습니다(저장 공간 부족). 브라우저 저장 공간을 정리한 뒤 다시
            시도하세요.
          </p>
        )}
        <p className="small muted">
          {getKey()
            ? '기록은 이 브라우저에 저장하고, 같은 비밀키를 넣은 기기와 주고받습니다. 초기화도 함께 적용됩니다.'
            : '기록은 이 브라우저에만 저장됩니다.'}{' '}
          <a href={paths.settings()} onClick={onLinkClick}>
            동기화 설정
          </a>
        </p>
      </section>

      {exam.sources.length > 0 && (
        <footer className="src">
          시험 형식 출처:{' '}
          {exam.sources.map((s, i) => (
            <span key={s.url}>
              {i > 0 && ', '}
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </span>
          ))}
          {exam.sources[0]?.checked && ` (${exam.sources[0].checked} 확인)`}
        </footer>
      )}
    </main>
  );
}
