// 시나리오형 시험(예: CCAR-F)의 실전 모의고사 화면.
// 왼쪽에 지금 문항 번호와 시나리오, 오른쪽에 문제와 보기를 두고, 아래에서 レビュー·이전·다음으로 움직인다.
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { Exam } from '../data/schema.ts';
import { itemSummary, type Item, type ItemBody } from '../lib/items.ts';
import { correctCount, isTouched, type Answer } from '../lib/scoring.ts';
import { sessionLabel, toggleStrike, type Session } from '../lib/session.ts';
import { Markdown } from './Markdown.tsx';
import { QuestionView } from './QuestionView.tsx';
import { Timer } from './Timer.tsx';

const KEYS = 'ABCDEFGHIJKLMNOP';

// 화면 문구는 시험 언어를 따른다(일본어 시험은 실제 시험처럼 일본어).
const LABELS = {
  ja: {
    pos: (n: number, total: number) => `問題 ${n} / ${total}`,
    num: (n: number) => `問題 ${n}`,
    left: '残り時間',
    show: '表示',
    hide: '非表示',
    flag: 'フラグ',
    review: 'レビュー',
    prev: '前の問題',
    next: '次の問題',
    submit: '問題提出',
    scenario: 'シナリオ',
    pick: (n: number) => `${n}つ選択してください。`,
    hint: '行をクリックすると、その問題に移動します。',
    answered: '回答済み',
    unanswered: '未回答',
    colNo: 'No',
    colQ: '問題',
    colFlag: 'フラグ',
    goTo: (n: number, flagged: boolean, answered: boolean) =>
      `問題 ${n}${answered ? '' : '、未回答'}${flagged ? '、フラグあり' : ''}に移動`,
    saveFailed: '結果を保存できませんでした。',
    saveFailedBody:
      'ブラウザの保存容量が足りないか、保存がブロックされている可能性があります。解答はそのまま残っているので、保存容量を空けてからもう一度提出してください。',
    retry: 'もう一度提出',
    confirmTitle: '問題を提出しますか？',
    confirmBody: (unanswered: number, flagged: number) =>
      `提出すると採点して試験を終了します。${
        unanswered ? `未回答が ${unanswered} 問あります。` : 'すべての問題に回答しました。'
      }${flagged ? `フラグ付きの問題が ${flagged} 問あります。` : ''}`,
    confirmNote: '提出すると、試験に戻ることはできません。',
    yes: 'はい',
    no: 'いいえ',
    strike: (k: string) => `選択肢 ${k} に取り消し線を引く`,
    unstrike: (k: string) => `選択肢 ${k} の取り消し線を外す`,
  },
  ko: {
    pos: (n: number, total: number) => `문항 ${n} / ${total}`,
    num: (n: number) => `문항 ${n}`,
    left: '남은 시간',
    show: '표시',
    hide: '숨기기',
    flag: '플래그',
    review: '검토',
    prev: '이전 문항',
    next: '다음 문항',
    submit: '제출',
    scenario: '시나리오',
    pick: (n: number) => (n === 1 ? '하나를 고르십시오.' : `${n}개를 고르십시오.`),
    hint: '줄을 누르면 그 문항으로 이동합니다.',
    answered: '답함',
    unanswered: '안 답함',
    colNo: '번호',
    colQ: '문항',
    colFlag: '플래그',
    goTo: (n: number, flagged: boolean, answered: boolean) =>
      `${n}번${answered ? '' : ', 안 답함'}${flagged ? ', 플래그' : ''}으로 이동`,
    saveFailed: '결과를 저장하지 못했습니다.',
    saveFailedBody:
      '브라우저 저장 공간이 부족하거나 저장이 막혀 있을 수 있습니다. 푼 내용은 그대로 남아 있으니, 저장 공간을 정리한 뒤 다시 제출하세요.',
    retry: '다시 제출',
    confirmTitle: '제출하시겠습니까?',
    confirmBody: (unanswered: number, flagged: number) =>
      `제출하면 채점하고 끝납니다. ${
        unanswered ? `답하지 않은 문항이 ${unanswered}개 있습니다.` : '모든 문항에 답했습니다.'
      }${flagged ? ` 플래그한 문항이 ${flagged}개 있습니다.` : ''}`,
    confirmNote: '제출하면 시험으로 돌아갈 수 없습니다.',
    yes: '예',
    no: '아니요',
    strike: (k: string) => `${k} 보기에 취소선 긋기`,
    unstrike: (k: string) => `${k} 보기의 취소선 걷기`,
  },
};

interface Props {
  exam: Exam;
  itemsByKey: Map<string, Item>;
  session: Session;
  setSession: Dispatch<SetStateAction<Session | null>>;
  /** 지금 문항(SessionPage가 찾아 둔 것) */
  item: Item;
  /** 문항 이동(잠금 처리는 SessionPage가 한다) */
  go: (to: number) => void;
  onExpire: () => void;
  onSubmit: () => void;
  saveFailed: boolean;
}

export function SplitSession({
  exam,
  itemsByKey,
  session,
  setSession,
  item,
  go,
  onExpire,
  onSubmit,
  saveFailed,
}: Props) {
  const t = exam.lang === 'ja' ? LABELS.ja : LABELS.ko;
  const [review, setReview] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [scenarioOpen, setScenarioOpen] = useState(true);
  const reviewRef = useRef<HTMLElement>(null);
  const qRef = useRef<HTMLElement>(null);
  const scRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const wasConfirming = useRef(false);

  const total = session.itemKeys.length;
  const i = session.current;
  const key = item.key;
  const flagged = !!session.flagged[key];
  const flagCount = Object.keys(session.flagged).length;
  const answeredCount = session.itemKeys.filter((k) =>
    isTouched(session.answers[k], session.views[k]),
  ).length;
  const scenario = item.scenarioId
    ? exam.scenarios.find((s) => s.id === item.scenarioId)
    : undefined;
  const prevLocked = i > 0 && !!session.locked[session.itemKeys[i - 1]!];

  // 문항을 옮기면 문제 칸은 맨 위로, 시나리오가 바뀌면 시나리오 칸도 맨 위로.
  useLayoutEffect(() => {
    qRef.current?.scrollTo?.(0, 0);
    stageRef.current?.scrollTo?.(0, 0);
  }, [key]);
  useLayoutEffect(() => {
    scRef.current?.scrollTo?.(0, 0);
  }, [item.scenarioId]);
  // レビュー는 열 때마다 1번부터 보이게 맨 위에서 시작한다.
  useLayoutEffect(() => {
    if (review) reviewRef.current?.scrollTo?.(0, 0);
  }, [review]);

  // 확인창을 닫으면(いいえ·Escape·바깥 누름) 포커스를 問題提出 버튼으로 돌려준다.
  useEffect(() => {
    if (wasConfirming.current && !confirming) submitRef.current?.focus();
    wasConfirming.current = confirming;
  }, [confirming]);

  useEffect(() => {
    if (!confirming) return;
    noRef.current?.focus();
    // 확인창이 열린 동안 배경은 inert로 막고, Tab은 いいえ·はい 사이에서만 돈다.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setConfirming(false);
      if (e.key !== 'Tab') return;
      const first = noRef.current;
      const last = yesRef.current;
      const at = document.activeElement;
      if (e.shiftKey ? at === first || at !== last : at === last || at !== first) {
        e.preventDefault();
        (e.shiftKey ? last : first)?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [confirming]);

  const openReview = () => {
    setConfirming(false);
    setReview(true);
  };
  const jump = (n: number) => {
    if (session.locked[session.itemKeys[n]!]) return;
    setReview(false);
    go(n);
  };
  const next = () => (i < total - 1 ? go(i + 1) : openReview());

  const setAnswer = (a: Answer) =>
    setSession((s) => (s ? { ...s, answers: { ...s.answers, [key]: a } } : s));
  const toggleFlag = () =>
    setSession((s) => {
      if (!s) return s;
      const f = { ...s.flagged };
      if (f[key]) delete f[key];
      else f[key] = true;
      return { ...s, flagged: f };
    });
  const toggleTimer = () => setSession((s) => (s ? { ...s, timerHidden: !s.timerHidden } : s));
  const strike = (option: number) => setSession((s) => (s ? toggleStrike(s, key, option) : s));

  const body = item.body;
  const choiceBody =
    !item.context && (body.type === 'single' || body.type === 'multi') ? body : undefined;

  return (
    <div className="sv">
      <header className="sv-bar" inert={confirming}>
        <div className="sv-bar-in">
          <span className="code">{exam.code}</span>
          <span className="bar-title">
            <span className="bar-mode">{sessionLabel(session)} · </span>
            {review ? t.review : t.pos(i + 1, total)}
          </span>
          {!review && (
            <button type="button" className="sv-flag" aria-pressed={flagged} onClick={toggleFlag}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 14.5V2h8.5l-2 3 2 3H3.5" />
              </svg>
              {flagged ? `✓ ${t.flag}` : t.flag}
            </button>
          )}
          {session.deadline && (
            <div className="sv-clock">
              <span className="sv-clock-label">{t.left}</span>
              <Timer
                deadline={session.deadline}
                onExpire={onExpire}
                hidden={!!session.timerHidden}
                label={t.left}
              />
              <button
                type="button"
                className="btn sm sv-tv"
                aria-pressed={!!session.timerHidden}
                onClick={toggleTimer}
              >
                {session.timerHidden ? t.show : t.hide}
              </button>
            </div>
          )}
        </div>
        <div className="meter">
          <i style={{ width: `${(answeredCount / total) * 100}%` }} />
        </div>
      </header>

      {saveFailed && (
        <div className="sv-alert" role="alert" inert={confirming}>
          <b>{t.saveFailed}</b> <span className="small">{t.saveFailedBody}</span>{' '}
          <button type="button" className="btn sm primary" onClick={onSubmit}>
            {t.retry}
          </button>
        </div>
      )}

      {review ? (
        <main
          className="sv-review"
          ref={reviewRef}
          aria-labelledby="sv-review-h"
          inert={confirming}
        >
          <div className="sv-review-in">
            <div className="sv-review-head">
              <h2 id="sv-review-h">{t.review}</h2>
              <div className="sv-stats">
                <span>
                  {t.answered} <b>{answeredCount}</b> / {total}
                </span>
                <span>
                  {t.unanswered} <b>{total - answeredCount}</b>
                </span>
                <span>
                  {t.flag} <b>{flagCount}</b>
                </span>
              </div>
            </div>
            <p className="sv-hint">{t.hint}</p>
            <div className="sv-table">
              <table>
                <thead>
                  <tr>
                    <th scope="col" className="c-no">
                      {t.colNo}
                    </th>
                    <th scope="col">{t.colQ}</th>
                    <th scope="col" className="c-flag">
                      {t.colFlag}
                    </th>
                  </tr>
                </thead>
                <tbody lang={exam.lang}>
                  {session.itemKeys.map((k, n) => {
                    const it = itemsByKey.get(k);
                    const f = !!session.flagged[k];
                    const locked = !!session.locked[k];
                    const answered = isTouched(session.answers[k], session.views[k]);
                    return (
                      <tr
                        key={k}
                        className={`${n === i ? 'cur' : ''}${locked ? ' locked' : ''}`}
                        tabIndex={locked ? -1 : 0}
                        aria-disabled={locked || undefined}
                        aria-label={t.goTo(n + 1, f, answered)}
                        onClick={() => jump(n)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            jump(n);
                          }
                        }}
                      >
                        <td className="c-no">
                          <span className="sv-no">{n + 1}</span>
                          {!answered && <span className="sv-unans">{t.unanswered}</span>}
                        </td>
                        <td>{it ? itemSummary(it) : '—'}</td>
                        <td className="c-flag">{f ? '✓' : ''}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      ) : (
        <main className="sv-stage" ref={stageRef} inert={confirming}>
          <section
            className={`sv-pane sv-sc${scenarioOpen ? '' : ' closed'}`}
            ref={scRef}
            aria-labelledby="sv-num"
          >
            <div className="sv-pane-in">
              <h2 className="sv-num" id="sv-num">
                {t.num(i + 1)}
              </h2>
              {scenario && (
                <>
                  <button
                    type="button"
                    className="sv-sc-toggle"
                    aria-expanded={scenarioOpen}
                    onClick={() => setScenarioOpen((o) => !o)}
                  >
                    {t.scenario}
                  </button>
                  <p className="sv-sc-text" lang={exam.lang}>
                    {scenario.description}
                  </p>
                </>
              )}
            </div>
          </section>
          <section className="sv-pane sv-q" ref={qRef} aria-labelledby="sv-num">
            <div className="sv-pane-in">
              {choiceBody ? (
                <div lang={exam.lang}>
                  <div className="q-text">
                    <Markdown>{choiceBody.stem}</Markdown>
                  </div>
                  <p className="q-inst">{t.pick(correctCount(choiceBody))}</p>
                  <Choices
                    body={choiceBody}
                    order={
                      session.views[key]?.type === choiceBody.type
                        ? (session.views[key] as { order: number[] }).order
                        : choiceBody.options.map((_, n) => n)
                    }
                    answer={session.answers[key]!}
                    struck={session.struck?.[key] ?? []}
                    locked={!!session.locked[key]}
                    name={key}
                    onChange={setAnswer}
                    onStrike={strike}
                    labels={t}
                  />
                </div>
              ) : (
                // 시나리오형 시험에 다른 유형이 섞이면 기존 문항 화면으로 그린다.
                <QuestionView
                  key={key}
                  exam={exam}
                  item={item}
                  view={session.views[key]!}
                  answer={session.answers[key]!}
                  onChange={setAnswer}
                  reveal={false}
                  disabled={!!session.locked[key]}
                  number={i + 1}
                  scenarioOpen={false}
                />
              )}
            </div>
          </section>
        </main>
      )}

      <footer className="sv-foot" inert={confirming}>
        {review ? (
          <div className="sv-foot-in">
            <span className="sv-sp" />
            <button
              type="button"
              className="btn primary"
              ref={submitRef}
              onClick={() => setConfirming(true)}
            >
              {t.submit}
            </button>
          </div>
        ) : (
          <div className="sv-foot-in">
            <button type="button" className="btn" onClick={openReview}>
              {t.review}
              {flagCount > 0 && (
                <span className="sv-count">
                  {t.flag} {flagCount}
                </span>
              )}
            </button>
            <span className="sv-sp" />
            <button
              type="button"
              className="btn"
              onClick={() => go(i - 1)}
              disabled={i === 0 || prevLocked}
            >
              {t.prev}
            </button>
            <button type="button" className="btn primary" onClick={next}>
              {t.next}
            </button>
          </div>
        )}
      </footer>

      {confirming && (
        <div
          className="sv-modal-bg"
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfirming(false);
          }}
        >
          <div
            className="sv-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="sv-confirm-h"
            aria-describedby="sv-confirm-p"
          >
            <h3 id="sv-confirm-h">{t.confirmTitle}</h3>
            <p id="sv-confirm-p">{t.confirmBody(total - answeredCount, flagCount)}</p>
            <p className="sv-modal-note">{t.confirmNote}</p>
            <div className="sv-modal-btns">
              <button
                type="button"
                className="btn"
                ref={noRef}
                onClick={() => setConfirming(false)}
              >
                {t.no}
              </button>
              <button
                type="button"
                className="btn primary"
                ref={yesRef}
                onClick={() => {
                  setConfirming(false);
                  onSubmit();
                }}
              >
                {t.yes}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Choices({
  body,
  order,
  answer,
  struck,
  locked,
  name,
  onChange,
  onStrike,
  labels,
}: {
  body: Extract<ItemBody, { type: 'single' | 'multi' }>;
  order: number[];
  answer: Answer;
  struck: number[];
  locked: boolean;
  name: string;
  onChange: (a: Answer) => void;
  onStrike: (option: number) => void;
  labels: (typeof LABELS)['ja'];
}) {
  const isMulti = body.type === 'multi';
  const chosen = (oi: number) =>
    answer.type === 'single'
      ? answer.choice === oi
      : answer.type === 'multi' && answer.choices.includes(oi);
  const toggle = (oi: number) => {
    if (locked || struck.includes(oi)) return;
    if (answer.type === 'single') onChange({ type: 'single', choice: oi });
    if (answer.type === 'multi') {
      const set = new Set(answer.choices);
      if (set.has(oi)) set.delete(oi);
      else set.add(oi);
      onChange({ type: 'multi', choices: [...set].sort((a, b) => a - b) });
    }
  };
  return (
    <div className="opts" role={isMulti ? 'group' : 'radiogroup'}>
      {order.map((oi, pos) => {
        const off = struck.includes(oi);
        const c = chosen(oi);
        const k = KEYS[pos] ?? String(pos + 1);
        return (
          <div
            key={oi}
            className={`opt sv-opt${c ? ' sel' : ''}${off ? ' struck' : ''}`}
            onContextMenu={(e) => {
              if (locked) return;
              e.preventDefault();
              onStrike(oi);
            }}
          >
            <label className="sv-opt-main">
              <input
                type={isMulti ? 'checkbox' : 'radio'}
                name={name}
                checked={c}
                disabled={locked || off}
                onChange={() => toggle(oi)}
              />
              <span className="k" aria-hidden="true">
                {k}
              </span>
              <span className="t">
                <Markdown inline>{body.options[oi]!.text}</Markdown>
              </span>
            </label>
            <button
              type="button"
              className="sv-strike"
              aria-pressed={off}
              aria-label={off ? labels.unstrike(k) : labels.strike(k)}
              title={off ? labels.unstrike(k) : labels.strike(k)}
              disabled={locked}
              onClick={() => onStrike(oi)}
            >
              <s aria-hidden="true">ab</s>
            </button>
          </div>
        );
      })}
    </div>
  );
}
