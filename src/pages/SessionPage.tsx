import { useCallback, useEffect, useRef, useState } from 'react';
import { QuestionView } from '../components/QuestionView.tsx';
import type { Exam } from '../data/schema.ts';
import type { Item } from '../lib/items.ts';
import { isComplete, isTouched, type Answer } from '../lib/scoring.ts';
import { MODE_LABEL, finishSession, type Session } from '../lib/session.ts';
import { clearActive, loadActive, saveActive, saveAttempt } from '../lib/storage.ts';
import { useQuestions } from '../lib/useQuestions.ts';
import { navigate, onLinkClick, paths } from '../router.ts';

function formatClock(ms: number): string {
  const t = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function Timer({ deadline, onExpire }: { deadline: number; onExpire: () => void }) {
  const [now, setNow] = useState(() => Date.now());
  const fired = useRef(false);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = deadline - now;
  useEffect(() => {
    if (left <= 0 && !fired.current) {
      fired.current = true;
      onExpire();
    }
  }, [left, onExpire]);
  return (
    <span className={`timer${left < 5 * 60_000 ? ' low' : ''}`} role="timer" aria-label="남은 시간">
      {formatClock(left)}
    </span>
  );
}

export function SessionPage({ exam }: { exam: Exam }) {
  const { data, error } = useQuestions(exam.id);
  const [session, setSession] = useState<Session | null>(() => loadActive(exam.id));
  const [confirming, setConfirming] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    if (session && !finished.current) saveActive(session);
  }, [session]);

  const finish = useCallback(
    (timedOut = false) => {
      if (!session || !data || finished.current) return;
      finished.current = true;
      const attempt = finishSession(exam, data.itemsByKey, session, { timedOut });
      if (attempt.total === 0) {
        clearActive(exam.id);
        navigate(paths.exam(exam.id), { replace: true });
        return;
      }
      // 결과를 저장하지 못하면 진행 세션을 지우지 않고 다시 제출할 수 있게 둔다.
      if (!saveAttempt(attempt)) {
        finished.current = false;
        setSaveFailed(true);
        return;
      }
      clearActive(exam.id);
      navigate(paths.result(exam.id, attempt.id), { replace: true });
    },
    [session, data, exam],
  );

  if (!session) {
    return (
      <main className="wrap stack">
        <h1>진행 중인 풀이가 없습니다</h1>
        <p>
          <a href={paths.exam(exam.id)} onClick={onLinkClick}>
            {exam.code} 시험 홈으로
          </a>
        </p>
      </main>
    );
  }
  if (error) return <main className="wrap note">문항을 불러오지 못했습니다: {error}</main>;
  if (!data) return <main className="wrap muted">불러오는 중…</main>;

  const total = session.itemKeys.length;
  const key = session.itemKeys[session.current];
  const item = key ? data.itemsByKey.get(key) : undefined;
  if (!item || !key) {
    // 문항 파일이 바뀌어 없어진 item. 채점에서도 빠진다.
    return (
      <main className="wrap stack">
        <p className="note">
          {session.current + 1}번 문항은 문항 파일에서 빠져 표시할 수 없습니다.
        </p>
        <div className="row">
          {session.current < session.itemKeys.length - 1 ? (
            <button
              type="button"
              className="btn primary"
              onClick={() => setSession({ ...session, current: session.current + 1 })}
            >
              다음
            </button>
          ) : (
            <button type="button" className="btn primary" onClick={() => finish()}>
              끝내기
            </button>
          )}
        </div>
      </main>
    );
  }

  const isMock = session.mode === 'mock';
  const view = session.views[key]!;
  const answer = session.answers[key]!;
  const checked = !!session.checked[key];
  const answeredCount = session.itemKeys.filter((k) =>
    isTouched(session.answers[k], session.views[k]),
  ).length;
  const checkedCount = Object.keys(session.checked).length;

  const setAnswer = (a: Answer) =>
    setSession((s) => (s ? { ...s, answers: { ...s.answers, [key]: a } } : s));

  const go = (to: number) => {
    // 지금 문항을 다시 누른 것은 이동이 아니므로 잠그지 않는다.
    if (to < 0 || to >= total || to === session.current) return;
    const target = session.itemKeys[to]!;
    if (session.locked[target]) return;
    setConfirming(false);
    setSession((s) => {
      if (!s) return s;
      const leaving = item.noReturn && isMock && isTouched(s.answers[key], s.views[key]);
      return { ...s, current: to, locked: leaving ? { ...s.locked, [key]: true } : s.locked };
    });
    window.scrollTo(0, 0);
  };

  const unanswered = total - answeredCount;
  const flaggedCount = Object.keys(session.flagged).length;
  const progress = isMock ? answeredCount / total : checkedCount / total;

  return (
    <>
      <div className="bar-top">
        <div className="bar-in">
          <span className="code">{exam.code}</span>
          <span className="bar-title">
            <span className="bar-mode">{MODE_LABEL[session.mode]} · </span>
            {session.current + 1}/{total}
          </span>
          {isMock && session.deadline && (
            <Timer deadline={session.deadline} onExpire={() => finish(true)} />
          )}
          <a className="btn sm ghost" href={paths.exam(exam.id)} onClick={onLinkClick}>
            나가기
          </a>
        </div>
        <div className="meter">
          <i style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <main className="wrap stack">
        {saveFailed && (
          <div className="confirm stack" role="alert">
            <b>결과를 저장하지 못했습니다.</b>
            <span className="small">
              브라우저 저장 공간이 부족하거나 저장이 막혀 있을 수 있습니다. 푼 내용은 그대로 남아
              있으니, 저장 공간을 정리한 뒤 다시 제출하세요.
            </span>
            <div className="row">
              <button type="button" className="btn primary" onClick={() => finish()}>
                다시 제출
              </button>
            </div>
          </div>
        )}
        <QuestionView
          key={key}
          exam={exam}
          item={item}
          view={view}
          answer={answer}
          onChange={setAnswer}
          reveal={!isMock && checked}
          disabled={!!session.locked[key]}
          number={session.current + 1}
        />

        {isMock && item.noReturn && !session.locked[key] && (
          <p className="note small">
            <b>주의</b> · 이 문항은 답한 뒤 다른 문항으로 넘어가면 돌아올 수 없습니다.
          </p>
        )}

        {isMock ? (
          <MockNav
            session={session}
            item={item}
            go={go}
            onFlag={() =>
              setSession((s) => {
                if (!s) return s;
                const flagged = { ...s.flagged };
                if (flagged[key]) delete flagged[key];
                else flagged[key] = true;
                return { ...s, flagged };
              })
            }
            onSubmit={() => setConfirming(true)}
          />
        ) : (
          <div className="nav">
            <button
              type="button"
              className="btn"
              onClick={() => go(session.current - 1)}
              disabled={session.current === 0}
            >
              이전
            </button>
            <span className="row">
              {!checked ? (
                <>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => go(session.current + 1)}
                    disabled={session.current === total - 1}
                  >
                    건너뛰기
                  </button>
                  <button
                    type="button"
                    className="btn primary"
                    disabled={!isComplete(answer)}
                    onClick={() =>
                      setSession((s) => (s ? { ...s, checked: { ...s.checked, [key]: true } } : s))
                    }
                  >
                    정답 확인
                  </button>
                </>
              ) : session.current < total - 1 ? (
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => go(session.current + 1)}
                >
                  다음
                </button>
              ) : (
                <button type="button" className="btn primary" onClick={() => finish()}>
                  결과 보기
                </button>
              )}
            </span>
          </div>
        )}

        {!isMock && (
          <div className="spread small muted">
            <span>
              정답 확인 {checkedCount}/{total}
            </span>
            <button type="button" className="btn sm" onClick={() => finish()}>
              {checkedCount ? '여기까지 채점하고 끝내기' : '그만 풀기'}
            </button>
          </div>
        )}

        {isMock && confirming && (
          <div className="confirm stack" role="alertdialog" aria-labelledby="confirm-h">
            <b id="confirm-h">제출하면 채점하고 끝납니다.</b>
            <span className="small">
              {unanswered ? `답하지 않은 문항 ${unanswered}개` : '모든 문항에 답했습니다'}
              {flaggedCount ? ` · 표시한 문항 ${flaggedCount}개` : ''}
            </span>
            <div className="row">
              <button type="button" className="btn primary" onClick={() => finish()}>
                제출하기
              </button>
              <button type="button" className="btn" onClick={() => setConfirming(false)}>
                계속 풀기
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function MockNav({
  session,
  item,
  go,
  onFlag,
  onSubmit,
}: {
  session: Session;
  item: Item;
  go: (i: number) => void;
  onFlag: () => void;
  onSubmit: () => void;
}) {
  const total = session.itemKeys.length;
  const i = session.current;
  const prevLocked = i > 0 && !!session.locked[session.itemKeys[i - 1]!];
  return (
    <>
      <div className="nav">
        <button
          type="button"
          className="btn"
          onClick={() => go(i - 1)}
          disabled={i === 0 || prevLocked}
        >
          이전
        </button>
        <button
          type="button"
          className={`btn${session.flagged[item.key] ? ' on' : ''}`}
          aria-pressed={!!session.flagged[item.key]}
          onClick={onFlag}
        >
          {session.flagged[item.key] ? '표시 해제' : '나중에 보기 표시'}
        </button>
        {i < total - 1 ? (
          <button type="button" className="btn primary" onClick={() => go(i + 1)}>
            다음
          </button>
        ) : (
          <button type="button" className="btn primary" onClick={onSubmit}>
            제출
          </button>
        )}
      </div>
      <section className="panel stack" aria-label="문항 이동">
        <div className="grid">
          {session.itemKeys.map((k, n) => {
            const cls = [
              'cell',
              isTouched(session.answers[k], session.views[k]) ? 'done' : '',
              n === i ? 'cur' : '',
              session.flagged[k] ? 'flag' : '',
            ].join(' ');
            return (
              <button
                key={k}
                type="button"
                className={cls}
                onClick={() => go(n)}
                disabled={!!session.locked[k]}
                aria-current={n === i ? 'step' : undefined}
                aria-label={`${n + 1}번${session.flagged[k] ? ', 표시함' : ''}${session.locked[k] ? ', 잠김' : ''}`}
              >
                {n + 1}
              </button>
            );
          })}
        </div>
        <div className="spread">
          <div className="legend">
            <span className="l-done">답함</span>
            <span className="l-flag">나중에 보기</span>
          </div>
          <button type="button" className="btn sm" onClick={onSubmit}>
            제출
          </button>
        </div>
      </section>
    </>
  );
}
