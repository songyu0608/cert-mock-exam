// 이론 정리 노트(Obsidian 보관함의 마크다운)를 사이트에서 읽을 수 있게 바꾼다.
// 원본 파일은 고치지 않고, 화면에 그릴 때만 Obsidian 문법을 일반 마크다운·HTML 요소로 옮긴다.
//   - 머리말(YAML frontmatter) → 속성 목록
//   - [[노트]], [[노트|보일 글자]] → 사이트 안 링크
//   - 질문::답 (Spaced Repetition 플래시카드) → 눌러서 답을 보는 카드
//   - > [!type]- 제목 (callout) → 상자, '-'/'+'가 붙으면 접는 상자(details)
//   - 문단 안 줄바꿈 → 줄바꿈 그대로(Obsidian 기본 설정과 같게)

export type PropValue = string | string[];

export interface ParsedNote {
  props: [string, PropValue][];
  body: string;
}

function propValue(raw: string): PropValue {
  const v = raw.trim();
  try {
    const j: unknown = JSON.parse(v);
    if (Array.isArray(j)) return j.map(String);
    if (typeof j === 'string' || typeof j === 'number' || typeof j === 'boolean') return String(j);
  } catch {
    // 따옴표 없는 YAML 값. [a, b] 같은 흐름 목록은 쉼표로 나눈다.
  }
  const unquote = (x: string) => x.trim().replace(/^(["'])(.*)\1$/, '$2');
  if (/^\[.*\]$/.test(v)) return v.slice(1, -1).split(',').map(unquote).filter(Boolean);
  return unquote(v);
}

/** 머리말을 떼어 속성과 본문으로 나눈다. 닫는 줄이 `---# 제목`처럼 붙어 있어도 뒤는 본문으로 둔다. */
export function parseNote(raw: string): ParsedNote {
  const lines = raw.replace(/^\uFEFF/, '').split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return { props: [], body: lines.join('\n') };
  const end = lines.findIndex((l, i) => i > 0 && l.startsWith('---'));
  if (end < 0) return { props: [], body: lines.join('\n') };
  const props: [string, PropValue][] = [];
  for (const line of lines.slice(1, end)) {
    const m = /^([^:\s][^:]*):\s*(.*)$/.exec(line);
    if (m?.[1] && m[2] !== undefined) props.push([m[1].trim(), propValue(m[2])]);
  }
  const rest = (lines[end] ?? '').slice(3);
  const body = [...(rest.trim() ? [rest] : []), ...lines.slice(end + 1)].join('\n');
  return { props, body };
}

const WIKILINK = /!?\[\[([^\]\n]+?)\]\]/g;

function splitLink(inner: string): { name: string; heading?: string; alias?: string } {
  const s = inner.replace(/\\\|/g, '|');
  const bar = s.indexOf('|');
  const target = bar < 0 ? s : s.slice(0, bar);
  const alias = bar < 0 ? undefined : s.slice(bar + 1).trim() || undefined;
  const hash = target.indexOf('#');
  const name = (hash < 0 ? target : target.slice(0, hash)).trim();
  const heading = hash < 0 ? undefined : target.slice(hash + 1).trim() || undefined;
  return { name, heading, alias };
}

/** 본문이 가리키는 노트 이름 목록(겹침 없음) */
export function linkTargets(body: string): string[] {
  const out = new Set<string>();
  for (const m of body.replace(/`[^`\n]*`/g, '').matchAll(WIKILINK)) {
    const { name } = splitLink(m[1] ?? '');
    if (name) out.add(name);
  }
  return [...out];
}

/** 제목의 id(= [[노트#제목]] 링크의 # 뒤). 공백을 하이픈으로 바꾼다. */
export const headingId = (text: string) => text.trim().replace(/\s+/g, '-');

const escapeMd = (s: string) => s.replace(/([\\[\]*_`<>])/g, '\\$1');

/**
 * 플래시카드 한 줄(질문::답)을 질문과 답으로 나눈다. 카드가 아니면 undefined.
 * - 인용·표·제목·목록 줄은 카드가 아니다.
 * - 구분자는 인라인 코드 밖의 첫 `::`. `질문::답`처럼 코드 안에만 있으면(형식 설명) 카드가 아니다.
 * - 그 `::` 바로 앞뒤가 공백이거나 줄 처음이면 본문이다(예: `::error::·::debug:: 명령으로`).
 */
function splitCard(line: string): [string, string] | undefined {
  if (/^[\s>|#*-]/.test(line)) return undefined;
  let pos = 0;
  for (const [i, part] of line.split(/(`[^`]*`)/).entries()) {
    const k = i % 2 ? -1 : part.indexOf('::');
    if (k >= 0) {
      const q = line.slice(0, pos + k);
      const a = line.slice(pos + k + 2);
      // 답이 `> [!WARNING]`처럼 >로 시작하면 인용·상자가 되지 않게 글자로 둔다.
      return /\S$/.test(q) && /^\S/.test(a) ? [q, a.replace(/^>/, '\\>')] : undefined;
    }
    pos += part.length;
  }
  return undefined;
}

/**
 * Obsidian 본문을 react-markdown에 넘길 마크다운으로 바꾼다.
 * resolve는 노트 이름을 받아 사이트 주소를 돌려준다. 없는 노트면 글자만 남긴다.
 */
export function toMarkdown(body: string, resolve: (name: string) => string | undefined): string {
  const out: string[] = [];
  let fence = false;
  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    if (fence) {
      out.push(line);
      continue;
    }
    // `[[링크]]`처럼 인라인 코드 안에 있는 것은 글자 그대로 둔다.
    const linked = line
      .split(/(`[^`]*`)/)
      .map((part, i) =>
        i % 2
          ? part
          : part.replace(WIKILINK, (_all, inner: string) => {
              const { name, heading, alias } = splitLink(inner);
              const text = escapeMd(alias ?? (heading ? `${name} > ${heading}` : name));
              const base = name ? resolve(name) : undefined;
              const href =
                base && heading ? `${base}#${encodeURIComponent(headingId(heading))}` : base;
              return href ? `[${text}](<${href}>)` : text;
            }),
      )
      .join('');
    const card = splitCard(linked);
    if (card) {
      if (out.length && out.at(-1)?.trim()) out.push('');
      out.push(`> [!card]- ${card[0]}`, `> ${card[1]}`, '');
      continue;
    }
    out.push(linked);
  }
  return out.join('\n');
}

// ---- remark 플러그인: callout과 줄바꿈 ----

interface MdNode {
  type: string;
  value?: string;
  children?: MdNode[];
  data?: { hName?: string; hProperties?: Record<string, unknown> };
}

const CALLOUT_LABEL: Record<string, string> = {
  note: '메모',
  info: '정보',
  tip: '팁',
  important: '중요',
  summary: '요약',
  abstract: '개요',
  quote: '인용',
  question: '질문',
  warning: '주의',
  success: '확인',
  example: '예시',
  card: '카드',
};

function callout(node: MdNode): void {
  const first = node.children?.[0];
  const head = first?.children?.[0];
  if (!first || first.type !== 'paragraph' || head?.type !== 'text' || head.value === undefined)
    return;
  const m = /^\[!([A-Za-z-]+)\]([+-]?)[ \t]*/.exec(head.value);
  if (!m?.[1]) return;
  const type = m[1].toLowerCase();
  const fold = m[2];
  head.value = head.value.slice(m[0].length);

  // 첫 줄(제목)과 같은 문단에 이어진 본문을 나눈다.
  const title: MdNode[] = [];
  const rest: MdNode[] = [];
  let inTitle = true;
  for (const c of first.children ?? []) {
    if (!inTitle) rest.push(c);
    else if (c.type === 'break') inTitle = false;
    else if (c.type === 'text' && c.value?.includes('\n')) {
      const i = c.value.indexOf('\n');
      title.push({ type: 'text', value: c.value.slice(0, i) });
      const after = c.value.slice(i + 1);
      if (after) rest.push({ type: 'text', value: after });
      inTitle = false;
    } else title.push(c);
  }
  const shown = title.filter((c) => !(c.type === 'text' && !c.value?.trim()));
  const summary: MdNode = {
    type: 'paragraph',
    children: shown.length ? shown : [{ type: 'text', value: CALLOUT_LABEL[type] ?? type }],
    data: { hName: fold ? 'summary' : 'p', hProperties: { className: ['callout-title'] } },
  };
  node.children = [
    summary,
    ...(rest.length ? [{ type: 'paragraph', children: rest }] : []),
    ...(node.children ?? []).slice(1),
  ];
  node.data = {
    hName: fold ? 'details' : 'div',
    hProperties: {
      className: ['callout', `callout-${type}`],
      ...(fold === '+' ? { open: true } : {}),
    },
  };
}

function walk(node: MdNode): void {
  for (const c of node.children ?? []) walk(c);
  if (node.type === 'blockquote') callout(node);
}

/** 문단 안 줄바꿈을 <br>로 만든다(Obsidian 기본값인 '엄격한 줄바꿈 끔'과 같게). */
function breaks(node: MdNode): void {
  if (!node.children) return;
  const next: MdNode[] = [];
  for (const c of node.children) {
    if (c.type === 'text' && c.value?.includes('\n')) {
      c.value.split('\n').forEach((part, i) => {
        if (i) next.push({ type: 'break' });
        if (part) next.push({ type: 'text', value: part });
      });
    } else {
      breaks(c);
      next.push(c);
    }
  }
  node.children = next;
}

const textOf = (n: MdNode): string => n.value ?? (n.children ?? []).map(textOf).join('');

/** 제목마다 id를 붙인다. 같은 제목이 또 나오면 -1, -2를 붙인다. */
function headingIds(tree: MdNode): void {
  const seen = new Map<string, number>();
  const visit = (n: MdNode) => {
    if (n.type === 'heading') {
      const base = headingId(textOf(n));
      const k = seen.get(base) ?? 0;
      seen.set(base, k + 1);
      n.data = {
        ...n.data,
        hProperties: { ...n.data?.hProperties, id: k ? `${base}-${k}` : base },
      };
    }
    n.children?.forEach(visit);
  };
  visit(tree);
}

export function remarkObsidian() {
  return (tree: MdNode) => {
    walk(tree);
    headingIds(tree);
    breaks(tree);
  };
}

/** 폴더 이름 앞의 정렬용 번호(예: "01 이론")를 떼고 보여 준다. 하위 폴더는 "암기 › 플래시카드" */
export const folderLabel = (folder: string) =>
  folder
    .split('/')
    .map((s) => s.replace(/^\d+\s+/, ''))
    .join(' › ') || '노트';

export const byName = (a: string, b: string) => a.localeCompare(b, 'ko', { numeric: true });
