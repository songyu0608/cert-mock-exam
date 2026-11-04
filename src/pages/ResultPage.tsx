import { useMemo, useState } from 'react';
import { DomainTable } from '../components/DomainTable.tsx';
import { Markdown } from '../components/Markdown.tsx';
import { QuestionView, TYPE_LABEL } from '../components/QuestionView.tsx';
import type { Exam } from '../data/schema.ts';
import { flattenQuestion } from '../lib/items.ts';
import { MODE_LABEL, createSession } from '../lib/session.ts';
import { loadActive, loadAttempt, saveActive } from '../lib/storage.ts';
import { useQuestions } from '../lib/useQuestions.ts';
import { navigate, onLinkClick, paths } from '../router.ts';

function duration(ms: number): string {
  const m = Math.round(ms / 60000);
  return m < 60 ? `${m}분` : `${Math.floor(m / 60)}시간 ${m % 60}분`;
}

export function ResultPage({ exam, attemptId }: { exam: Exam; attemptId: string }) {
  const attempt = useMemo(() => loadAttempt(exam.id, attemptId), [exam.id, attemptId]);
  const { data } = useQuestions(exam.id);
  const [filter, setFilter] = useState<'wrong' | 'all'>('wrong');

  if (!attempt) {
    return (
      <main className="wrap stack">
        <h1>결과를 찾을 수 없습니다</h1>
        <p>
          <a href={paths.exam(exam.id)} onClick={onLinkClick}>
            {exam.code} 시험 홈으로
          </a>
        </p>
      </main>
    );
  }

  const s = attempt.session;
  const keys = Object.keys(attempt.itemScores);
  const wrong = keys.filter((k) => attempt.itemScores[k]! < 1);
  const shown = filter === 'wrong' ? wrong : keys;
  const rows = exam.domains.map((d) => {
    const r = attempt.byDomain[d.id] ?? { total: 0, score: 0 };
    return {
      id: d.id,
      pct: r.total ? (r.score / r.total) * 100 : null,
      detail: `${Math.round(r.score * 10) / 10}/${r.total}`,
    };
  });
  const hasActive = !!loadActive(exam.id);

  const retryWrong = () => {
    if (!data || !wrong.length || hasActive) return;
    const set = new Set(wrong);
    const picked = data.questions.filter((q) => flattenQuestion(q).some((i) => set.has(i.key)));
    const session = createSession(exam, picked, 'review', { onlyKeys: set });
    if (!session.itemKeys.length) return;
    saveActive(session);
    navigate(paths.play(exam.id));
  };

  return (
    <main className="wrap stack">
      <nav className="crumb">
        <a href={paths.exam(exam.id)} onClick={onLinkClick}>
          ← {exam.code} 시험 홈
        </a>
      </nav>
      <header>
        <div className="label">
          {MODE_LABEL[attempt.mode]} 결과 · {new Date(attempt.finishedAt).toLocaleString('ko-KR')}
        </div>
        <h1>{exam.name}</h1>
      </header>

      <section className="panel stack" aria-label="점수">
        <div className="score">
          <span className="big">{attempt.percent}%</span>
          {attempt.passed !== undefined && (
            <span className={`pill ${attempt.passed ? 'ok' : 'bad'}`}>
              {attempt.passed ? '합격선 통과' : '합격선 미달'}
            </span>
          )}
        </div>
        <p className="small muted" style={{ margin: 0 }}>
          {Math.round(attempt.score * 10) / 10}/{attempt.total}문항 정답
          {attempt.passed !== undefined && ` · 합격선 ${exam.mock.passPercent}%`} · 걸린 시간{' '}
          {duration(attempt.finishedAt - attempt.startedAt)}
          {attempt.timedOut && ' · 시간 종료로 자동 제출'}
        </p>
        {attempt.passed !== undefined && (
          <p className="small muted" style={{ margin: 0 }}>
            실제 시험은 환산 점수로 합격을 정하며 계산식은 공개되지 않습니다. 정답률 기준은
            참고용입니다.
          </p>
        )}
        <div className="row">
          <button
            type="button"
            className="btn primary"
            disabled={!data || !wrong.length || hasActive}
            onClick={retryWrong}
          >
            틀린 {wrong.length}문항 다시 풀기
          </button>
          <a className="btn" href={paths.exam(exam.id)} onClick={onLinkClick}>
            시험 홈
          </a>
        </div>
        {hasActive && wrong.length > 0 && (
          <p className="small muted" style={{ margin: 0 }}>
            진행 중인 세션이 있어 다시 풀기를 시작할 수 없습니다. 시험 홈에서 이어 풀거나 버리세요.
          </p>
        )}
      </section>

      <section className="panel stack" aria-labelledby="dom-h">
        <h2 id="dom-h">도메인별 정답률</h2>
        <DomainTable exam={exam} rows={rows} />
      </section>

      <section className="stack" aria-labelledby="rev-h">
        <div className="spread">
          <h2 id="rev-h">문항 다시 보기</h2>
          <div className="chips" role="group" aria-label="보기 범위">
            <button
              type="button"
              className="chip"
              aria-pressed={filter === 'wrong'}
              onClick={() => setFilter('wrong')}
            >
              틀린 문항 {wrong.length}
            </button>
            <button
              type="button"
              className="chip"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              전체 {keys.length}
            </button>
          </div>
        </div>
        {!data ? (
          <p className="muted">불러오는 중…</p>
        ) : shown.length === 0 ? (
          <p className="muted">틀린 문항이 없습니다.</p>
        ) : (
          shown.map((k) => {
            const item = data.itemsByKey.get(k);
            const n = s.itemKeys.indexOf(k) + 1;
            const sc = attempt.itemScores[k]!;
            if (!item || !s.views[k] || !s.answers[k])
              return (
                <p key={k} className="small muted">
                  {n}번 문항은 문항 파일에서 빠져 볼 수 없습니다.
                </p>
              );
            return (
              <details key={k} className="panel review-item">
                <summary>
                  <span className={`mark ${sc === 1 ? 'ok' : 'bad'}`}>{sc === 1 ? 'O' : 'X'}</span>
                  <span className="label">{n}번</span>
                  <span className="tag type">{TYPE_LABEL[item.body.type]}</span>
                  <span style={{ minWidth: 0 }}>
                    <Markdown inline>{item.body.stem.split('\n')[0] ?? ''}</Markdown>
                  </span>
                </summary>
                <QuestionView
                  exam={exam}
                  item={item}
                  view={s.views[k]}
                  answer={s.answers[k]}
                  onChange={() => {}}
                  reveal
                  number={n}
                />
              </details>
            );
          })
        )}
      </section>
    </main>
  );
}
