import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { describe, expect, it } from 'vitest';
import { folderLabel, noteTargets, parseNote, remarkObsidian, toMarkdown } from './theory.ts';

const render = (md: string) =>
  renderToStaticMarkup(
    createElement(ReactMarkdown, { remarkPlugins: [remarkGfm, remarkObsidian] as never }, md),
  ).replace(/\n/g, '');
const resolve = (name: string) =>
  ['개념 A', '1.1 핵심'].includes(name) ? `/theory/x/${encodeURIComponent(name)}` : undefined;

describe('parseNote', () => {
  it('머리말을 속성과 본문으로 나눈다', () => {
    const n = parseNote('---\naliases: ["가", "나"]\n도메인: 1\n작업: "1.1"\n---\n# 제목\n본문');
    expect(n.props).toEqual([
      ['aliases', ['가', '나']],
      ['도메인', '1'],
      ['작업', '1.1'],
    ]);
    expect(n.body).toBe('# 제목\n본문');
  });

  it('닫는 줄에 제목이 붙어 있어도 본문으로 살린다', () => {
    const n = parseNote('---\ntags: ["a"]\n---# 비교 노트 목록\n\n- 항목');
    expect(n.props).toEqual([['tags', ['a']]]);
    expect(n.body).toBe('# 비교 노트 목록\n\n- 항목');
  });

  it('따옴표 없는 [a, b] 목록도 나눈다', () => {
    expect(parseNote('---\naliases: [Bedrock, 베드록]\ntags: []\n---\n본문').props).toEqual([
      ['aliases', ['Bedrock', '베드록']],
      ['tags', []],
    ]);
  });

  it('머리말이 없으면 전체가 본문', () => {
    expect(parseNote('# 제목')).toEqual({ props: [], body: '# 제목' });
  });
});

describe('toMarkdown', () => {
  it('위키 링크를 사이트 링크로, 없는 노트는 글자로 바꾼다', () => {
    expect(toMarkdown('[[개념 A]] · [[없는 노트]]', resolve)).toBe(
      '[개념 A](</theory/x/%EA%B0%9C%EB%85%90%20A>) · 없는 노트',
    );
  });

  it('[[노트#제목]]은 제목 id로 가는 링크', () => {
    expect(toMarkdown('[[개념 A#문제 1|1번]] [[개념 A#문제 2]]', resolve)).toBe(
      '[1번](</theory/x/%EA%B0%9C%EB%85%90%20A#%EB%AC%B8%EC%A0%9C-1>) [개념 A \\> 문제 2](</theory/x/%EA%B0%9C%EB%85%90%20A#%EB%AC%B8%EC%A0%9C-2>)',
    );
  });

  it('표 안의 [[노트|별칭]]도 칸을 나누지 않는다', () => {
    const html = render(toMarkdown('| a | b |\n|---|---|\n| 1 | [[1.1 핵심|1.1]], x |', resolve));
    expect(html).toContain('<td><a href="/theory/x/1.1%20%ED%95%B5%EC%8B%AC">1.1</a>, x</td>');
  });

  it('질문::답 줄을 접는 카드로, `코드`가 든 형식 설명은 그대로 둔다', () => {
    const md = toMarkdown('형식: `질문::답`\n## 덱\n질문 1?::답 1\n질문 2?::답 2', resolve);
    expect(md).toBe(
      '형식: `질문::답`\n## 덱\n\n> [!card]- 질문 1?\n> 답 1\n\n> [!card]- 질문 2?\n> 답 2\n',
    );
  });

  it('카드 답에 `코드`가 있어도 카드, 본문의 ::명령::은 카드가 아니다', () => {
    expect(toMarkdown('터미널?::Copilot CLI(`copilot`)', resolve)).toBe(
      '> [!card]- 터미널?\n> Copilot CLI(`copilot`)\n',
    );
    expect(toMarkdown('경고 문법?::> [!WARNING] 등', resolve)).toBe(
      '> [!card]- 경고 문법?\n> \\> [!WARNING] 등\n',
    );
    for (const line of ['::warning::·::error:: 명령을 쓴다.', '파일과 ::error::·::debug:: 명령'])
      expect(toMarkdown(line, resolve)).toBe(line);
  });

  it('인라인 코드 안의 [[링크]]는 글자 그대로 둔다', () => {
    expect(toMarkdown('| `[[링크]]` | [[개념 A]] |', resolve)).toBe(
      '| `[[링크]]` | [개념 A](</theory/x/%EA%B0%9C%EB%85%90%20A>) |',
    );
  });

  it('SVG 임베드는 카드 제목과 설명이 있는 이미지로 바꾸고 코드 예시는 보존한다', () => {
    const source = '![[그림.svg]]\n\n`![[그림.svg]]`\n\n~~~md\n![[그림.svg]]\n~~~';
    const md = toMarkdown(source, resolve, (name) =>
      name === '그림.svg'
        ? { url: '/assets/diagram-123.svg', alt: '개념 A: [가]와 나를 비교한다.' }
        : undefined,
    );
    const html = render(md);
    expect(html).toContain(
      '<img src="/assets/diagram-123.svg" alt="개념 A: [가]와 나를 비교한다."',
    );
    expect(html.match(/<img /g)).toHaveLength(1);
    expect(html).toContain('<code>![[그림.svg]]</code>');
    expect(toMarkdown('![[없는.svg]]', resolve)).toBe('없는.svg');
  });

  it('그림과 역링크 대상을 구분하고 코드 안은 제외한다', () => {
    expect(
      noteTargets('[[a]] [[b|별칭]] [[a#제목]] `[[c]]` ![[그림.svg]]\n~~~\n![[예시.svg]]\n~~~'),
    ).toEqual({ notes: ['a', 'b'], images: ['그림.svg'] });
  });
});

describe('remarkObsidian', () => {
  it('접는 callout은 details, 제목 다음 줄부터 본문', () => {
    const html = render('> [!quote]- 공식 문구\n> 첫 줄\n>\n> 둘째 문단');
    expect(html).toBe(
      '<details class="callout callout-quote"><summary class="callout-title">공식 문구</summary><p>첫 줄</p><p>둘째 문단</p></details>',
    );
  });

  it('접지 않는 callout과 제목 없는 callout', () => {
    expect(render('> [!warning] **함정**')).toBe(
      '<div class="callout callout-warning"><p class="callout-title"><strong>함정</strong></p></div>',
    );
    expect(render('> [!tip]\n> 본문')).toContain('<p class="callout-title">팁</p>');
  });

  it('제목에 id를 붙이고, 겹치면 번호를 붙인다', () => {
    expect(render('## 문제 1\n### **굵은** 제목\n## 문제 1')).toBe(
      '<h2 id="문제-1">문제 1</h2><h3 id="굵은-제목"><strong>굵은</strong> 제목</h3><h2 id="문제-1-1">문제 1</h2>',
    );
  });

  it('일반 인용과 문단 안 줄바꿈', () => {
    expect(render('> 인용')).toBe('<blockquote><p>인용</p></blockquote>');
    expect(render('첫 줄\n둘째 줄')).toBe('<p>첫 줄<br/>둘째 줄</p>');
  });
});

it('folderLabel은 정렬용 번호를 뗀다', () => {
  expect(folderLabel('01 이론')).toBe('이론');
  expect(folderLabel('04 암기/플래시카드')).toBe('암기 › 플래시카드');
  expect(folderLabel('')).toBe('노트');
});
