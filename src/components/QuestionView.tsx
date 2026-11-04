// 한 item(채점 단위)을 그린다. reveal이면 정답과 해설을 함께 보여 주고 입력을 막는다.
import type { Exam } from '../data/schema.ts';
import type { Item, ItemBody } from '../lib/items.ts';
import {
  correctCount,
  orderingUsesSlots,
  scoreItem,
  type Answer,
  type View,
} from '../lib/scoring.ts';
import { Markdown } from './Markdown.tsx';

const KEYS = 'ABCDEFGHIJKLMNOP';
const NUM_WORD = ['', '하나', '두 개', '세 개', '네 개', '다섯 개', '여섯 개'];

export const TYPE_LABEL: Record<ItemBody['type'], string> = {
  single: '단일 선택',
  multi: '복수 선택',
  ordering: '순서 배열',
  matching: '연결',
  yesno: '예/아니요',
  solution: '문제-해결',
};

function instruction(body: ItemBody): string {
  switch (body.type) {
    case 'single':
      return '하나를 고르십시오.';
    case 'multi': {
      const n = correctCount(body);
      return `${NUM_WORD[n] ?? `${n}개`}를 고르십시오.`;
    }
    case 'ordering':
      return orderingUsesSlots(body)
        ? '각 자리에 들어갈 항목을 순서대로 고르십시오. 쓰지 않는 항목이 있습니다.'
        : '항목을 올바른 순서로 배열하십시오.';
    case 'matching':
      return body.reuse
        ? '각 항목에 맞는 답을 고르십시오. 같은 답을 여러 번 쓸 수 있습니다.'
        : '각 항목에 맞는 답을 고르십시오. 답은 한 번씩만 쓰며, 쓰지 않는 답이 있을 수 있습니다.';
    case 'yesno':
      return '각 문장이 맞으면 "예", 틀리면 "아니요"를 고르십시오.';
    case 'solution':
      return '이 해결책이 목표를 달성합니까?';
  }
}

interface Props {
  exam: Exam;
  item: Item;
  view: View;
  answer: Answer;
  onChange: (a: Answer) => void;
  reveal: boolean;
  /** 입력만 막는다(잠긴 문항) */
  disabled?: boolean;
  /** 화면에 보이는 문항 번호 */
  number: number;
}

export function QuestionView({
  exam,
  item,
  view,
  answer,
  onChange,
  reveal,
  disabled,
  number,
}: Props) {
  const body = item.body;
  const lock = reveal || !!disabled;
  const domain = exam.domains.find((d) => d.id === item.topDomain);
  const score = reveal ? scoreItem(item, answer, exam.scoring) : 0;

  return (
    <article className="panel stack" aria-labelledby={`q-${item.key}`}>
      <div className="q-head">
        <span className="label">문항 {number}</span>
        <span className="tag type">{TYPE_LABEL[body.type]}</span>
        <span className="tag" title={domain?.name}>
          {item.domain} {domain?.name}
        </span>
      </div>

      {item.context && (
        <section className="scenario" aria-label="지문">
          <div className="label">
            {item.context.kind === 'case' ? '사례 연구' : '문제-해결 세트'} · {item.context.index}/
            {item.context.total}
          </div>
          <Markdown>{item.context.scenario}</Markdown>
        </section>
      )}

      <div>
        <div className="q-text" id={`q-${item.key}`}>
          <Markdown>{body.stem}</Markdown>
        </div>
        <p className="q-inst">{instruction(body)}</p>
        <Body
          body={body}
          view={view}
          answer={answer}
          onChange={onChange}
          lock={lock}
          reveal={reveal}
          name={item.key}
        />
      </div>

      {reveal && (
        <div className={`verdict ${score === 1 ? 'ok' : 'bad'}`} role="status">
          <strong>
            {score === 1
              ? '정답입니다'
              : score > 0
                ? `부분 정답 (${Math.round(score * 100)}%)`
                : '오답입니다'}
          </strong>
          {body.explanation ? (
            <Markdown>{body.explanation}</Markdown>
          ) : body.type === 'multi' && score < 1 ? (
            <p>복수 선택은 정답을 모두 골라야 점수를 받습니다.</p>
          ) : null}
        </div>
      )}
      {reveal && item.note && (
        <div className="note">
          <b>참고</b> · {item.note}
        </div>
      )}
    </article>
  );
}

interface BodyProps {
  body: ItemBody;
  view: View;
  answer: Answer;
  onChange: (a: Answer) => void;
  lock: boolean;
  reveal: boolean;
  name: string;
}

function Body(p: BodyProps) {
  switch (p.body.type) {
    case 'single':
    case 'multi':
      return <Choice {...p} body={p.body} />;
    case 'ordering':
      return orderingUsesSlots(p.body) ? (
        <OrderSlots {...p} body={p.body} />
      ) : (
        <OrderMove {...p} body={p.body} />
      );
    case 'matching':
      return <Matching {...p} body={p.body} />;
    case 'yesno':
      return <YesNo {...p} body={p.body} />;
    case 'solution':
      return <Solution {...p} body={p.body} />;
  }
}

function Choice({
  body,
  view,
  answer,
  onChange,
  lock,
  reveal,
  name,
}: BodyProps & { body: Extract<ItemBody, { type: 'single' | 'multi' }> }) {
  const order =
    view.type === 'single' || view.type === 'multi' ? view.order : body.options.map((_, i) => i);
  const isMulti = body.type === 'multi';
  const chosen = (i: number) =>
    answer.type === 'single'
      ? answer.choice === i
      : answer.type === 'multi' && answer.choices.includes(i);
  const toggle = (i: number) => {
    if (lock) return;
    if (answer.type === 'single') onChange({ type: 'single', choice: i });
    if (answer.type === 'multi') {
      const set = new Set(answer.choices);
      if (set.has(i)) set.delete(i);
      else set.add(i);
      onChange({ type: 'multi', choices: [...set].sort((a, b) => a - b) });
    }
  };
  return (
    <div className="opts" role={isMulti ? 'group' : 'radiogroup'}>
      {order.map((oi, pos) => {
        const o = body.options[oi]!;
        const c = chosen(oi);
        let cls = 'opt';
        if (reveal) cls += ' locked' + (o.correct ? ' right' : c ? ' wrong' : '');
        else if (c) cls += ' sel';
        if (lock) cls += ' locked';
        return (
          <label key={oi} className={cls}>
            <input
              type={isMulti ? 'checkbox' : 'radio'}
              name={name}
              checked={c}
              disabled={lock}
              onChange={() => toggle(oi)}
            />
            <span className="k" aria-hidden="true">
              {KEYS[pos]}
            </span>
            <span className="t">
              <Markdown inline>{o.text}</Markdown>
              {reveal && (o.why || o.correct || c) && (
                <span className="why">
                  {o.correct ? '정답. ' : c ? '선택한 오답. ' : ''}
                  {o.why}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

const orderText = (body: Extract<ItemBody, { type: 'ordering' }>, id: string | null) => {
  if (!id) return '';
  const i = Number(id.slice(1));
  return (id[0] === 'i' ? body.items[i] : body.distractors[i]) ?? '';
};

function OrderMove({
  body,
  answer,
  onChange,
  lock,
  reveal,
}: BodyProps & { body: Extract<ItemBody, { type: 'ordering' }> }) {
  if (answer.type !== 'ordering') return null;
  const slots = answer.slots;
  const move = (from: number, to: number) => {
    if (lock || to < 0 || to >= slots.length) return;
    const next = [...slots];
    [next[from], next[to]] = [next[to]!, next[from]!];
    onChange({ type: 'ordering', slots: next });
  };
  return (
    <>
      <ol className="lines" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {slots.map((id, pos) => {
          const ok = id === `i${pos}`;
          return (
            <li key={id ?? pos} className={`line${reveal ? (ok ? ' right' : ' wrong') : ''}`}>
              <span className="pos">{pos + 1}</span>
              <span className="t">
                <Markdown inline>{orderText(body, id)}</Markdown>
              </span>
              {!lock && (
                <span className="mv">
                  <button
                    type="button"
                    className="btn sm"
                    onClick={() => move(pos, pos - 1)}
                    disabled={pos === 0}
                    aria-label={`${pos + 1}번 항목을 위로`}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn sm"
                    onClick={() => move(pos, pos + 1)}
                    disabled={pos === slots.length - 1}
                    aria-label={`${pos + 1}번 항목을 아래로`}
                  >
                    ↓
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {reveal && <CorrectOrder body={body} />}
    </>
  );
}

function CorrectOrder({ body }: { body: Extract<ItemBody, { type: 'ordering' }> }) {
  return (
    <div className="small" style={{ marginTop: 10 }}>
      <b>정답 순서</b>
      <ol style={{ margin: '4px 0 0', paddingLeft: '1.4em' }}>
        {body.items.map((t, i) => (
          <li key={i}>
            <Markdown inline>{t}</Markdown>
          </li>
        ))}
      </ol>
    </div>
  );
}

function OrderSlots({
  body,
  view,
  answer,
  onChange,
  lock,
  reveal,
  name,
}: BodyProps & { body: Extract<ItemBody, { type: 'ordering' }> }) {
  if (answer.type !== 'ordering' || view.type !== 'ordering') return null;
  const set = (pos: number, id: string) => {
    const next = [...answer.slots];
    next[pos] = id || null;
    onChange({ type: 'ordering', slots: next });
  };
  return (
    <>
      <div className="lines">
        {answer.slots.map((id, pos) => {
          const ok = id === `i${pos}`;
          return (
            <div key={pos} className={`line${reveal ? (ok ? ' right' : ' wrong') : ''}`}>
              <label className="pos" htmlFor={`${name}-s${pos}`}>
                {pos + 1}
              </label>
              <select
                id={`${name}-s${pos}`}
                className="sel"
                style={{ flex: 1 }}
                value={id ?? ''}
                disabled={lock}
                onChange={(e) => set(pos, e.target.value)}
              >
                <option value="">선택…</option>
                {view.choices.map((c) => (
                  <option key={c} value={c}>
                    {orderText(body, c)}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      {reveal && <CorrectOrder body={body} />}
    </>
  );
}

function Matching({
  body,
  view,
  answer,
  onChange,
  lock,
  reveal,
  name,
}: BodyProps & { body: Extract<ItemBody, { type: 'matching' }> }) {
  if (answer.type !== 'matching' || view.type !== 'matching') return null;
  const text = (key: string | null) => body.responses.find((r) => r.key === key)?.text ?? '';
  const set = (i: number, key: string) => {
    const next = [...answer.picks];
    next[i] = key || null;
    onChange({ type: 'matching', picks: next });
  };
  return (
    <div className="lines">
      {body.prompts.map((p, i) => {
        const pick = answer.picks[i] ?? null;
        const ok = pick === p.answer;
        return (
          <div key={i} className={`line${reveal ? (ok ? ' right' : ' wrong') : ''}`}>
            <div className="pair" style={{ flex: 1 }}>
              <label htmlFor={`${name}-m${i}`}>
                <Markdown inline>{p.text}</Markdown>
              </label>
              <select
                id={`${name}-m${i}`}
                className="sel"
                value={pick ?? ''}
                disabled={lock}
                onChange={(e) => set(i, e.target.value)}
              >
                <option value="">선택…</option>
                {view.responses.map((k) => {
                  const usedElsewhere =
                    !body.reuse && answer.picks.some((x, j) => j !== i && x === k);
                  return (
                    <option key={k} value={k}>
                      {text(k)}
                      {usedElsewhere ? ' (사용 중)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>
            {reveal && !ok && <span className="fix">정답: {text(p.answer)}</span>}
          </div>
        );
      })}
    </div>
  );
}

function YesNoRadios({
  name,
  value,
  onSet,
  lock,
}: {
  name: string;
  value: boolean | null;
  onSet: (v: boolean) => void;
  lock: boolean;
}) {
  return (
    <span className="yn">
      {([true, false] as const).map((v) => (
        <label key={String(v)}>
          <input
            type="radio"
            name={name}
            checked={value === v}
            disabled={lock}
            onChange={() => onSet(v)}
          />
          {v ? '예' : '아니요'}
        </label>
      ))}
    </span>
  );
}

function YesNo({
  body,
  answer,
  onChange,
  lock,
  reveal,
  name,
}: BodyProps & { body: Extract<ItemBody, { type: 'yesno' }> }) {
  if (answer.type !== 'yesno') return null;
  return (
    <div className="lines">
      {body.statements.map((s, i) => {
        const v = answer.values[i] ?? null;
        const ok = v === s.answer;
        return (
          <div key={i} className={`line${reveal ? (ok ? ' right' : ' wrong') : ''}`}>
            <span className="t">
              <Markdown inline>{s.text}</Markdown>
            </span>
            <YesNoRadios
              name={`${name}-y${i}`}
              value={v}
              lock={lock}
              onSet={(nv) => {
                const next = [...answer.values];
                next[i] = nv;
                onChange({ type: 'yesno', values: next });
              }}
            />
            {reveal && (
              <span className="fix">
                정답: {s.answer ? '예' : '아니요'}
                {s.why ? ` · ${s.why}` : ''}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Solution({
  body,
  answer,
  onChange,
  lock,
  reveal,
  name,
}: BodyProps & { body: Extract<ItemBody, { type: 'solution' }> }) {
  if (answer.type !== 'solution') return null;
  const ok = answer.value === body.meetsGoal;
  return (
    <div className="stack" style={{ gap: 10 }}>
      <div className="small">
        <b>목표</b> · <Markdown inline>{body.goal}</Markdown>
      </div>
      <div className={`line${reveal ? (ok ? ' right' : ' wrong') : ''}`}>
        <span className="t">
          <b>해결책</b> · <Markdown inline>{body.text}</Markdown>
        </span>
        <YesNoRadios
          name={name}
          value={answer.value}
          lock={lock}
          onSet={(v) => onChange({ type: 'solution', value: v })}
        />
        {reveal && (
          <span className="fix">
            정답: {body.meetsGoal ? '예(목표 달성)' : '아니요(목표 미달성)'}
            {body.why ? ` · ${body.why}` : ''}
          </span>
        )}
      </div>
    </div>
  );
}
