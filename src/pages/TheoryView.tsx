import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { hasQuestions } from '../data/exams.ts';
import { loadTheory, type Note } from '../data/theory.ts';
import type { Exam, Theory } from '../data/schema.ts';
import { byName, folderLabel, remarkObsidian, toMarkdown } from '../lib/theory.ts';
import { onLinkClick, paths } from '../router.ts';

const plugins = [[remarkGfm, { singleTilde: false }], remarkObsidian] as const;
const PROP_LABEL: Record<string, string> = { aliases: '별칭', tags: '태그' };

function useTheory(examId: string, theoryId: string): { notes?: Note[]; error?: string } {
  const [notes, setNotes] = useState<Note[]>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    let alive = true;
    loadTheory(examId, theoryId).then(
      (n) => alive && setNotes(n),
      (e: unknown) => alive && setError(e instanceof Error ? e.message : String(e)),
    );
    return () => {
      alive = false;
    };
  }, [examId, theoryId]);
  return { notes, error };
}

/** 이론 노트 읽기: 왼쪽(좁은 화면은 위) 노트 목록과 검색, 오른쪽 노트 본문 */
export function TheoryView({ exam, theory, note }: { exam: Exam; theory: Theory; note?: string }) {
  const { notes, error } = useTheory(exam.id, theory.id);
  const [query, setQuery] = useState('');
  const [navOpen, setNavOpen] = useState(false);

  const index = useMemo(() => new Map(notes?.map((n) => [n.name.toLowerCase(), n])), [notes]);
  const current = index.get((note ?? theory.home).toLowerCase());
  const hrefOf = (name: string) =>
    name.toLowerCase() === theory.home.toLowerCase()
      ? paths.theory(exam.id, theory.id)
      : paths.theory(exam.id, theory.id, name);

  // 폴더별 노트 목록. 첫 화면 노트는 자기 폴더 맨 위에 둔다.
  const folders = useMemo(() => {
    const map = new Map<string, Note[]>();
    for (const n of notes ?? []) map.set(n.folder, [...(map.get(n.folder) ?? []), n]);
    const isHome = (n: Note) => (n.name.toLowerCase() === theory.home.toLowerCase() ? 0 : 1);
    return [...map.entries()]
      .sort(([a], [b]) => byName(a, b))
      .map(
        ([f, list]) =>
          [f, list.sort((a, b) => isHome(a) - isHome(b) || byName(a.name, b.name))] as const,
      );
  }, [notes, theory.home]);

  const q = query.trim().toLowerCase();
  const found = q
    ? (notes ?? [])
        .filter((n) => [n.name, ...n.aliases].some((s) => s.toLowerCase().includes(q)))
        .sort((a, b) => byName(a.name, b.name))
    : [];

  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    setNavOpen(false);
    onLinkClick(e);
  };
  const link = (n: Note) => (
    <a
      href={hrefOf(n.name)}
      onClick={go}
      aria-current={n === current ? 'page' : undefined}
      title={n.aliases.length ? n.aliases.join(', ') : undefined}
    >
      {n.name}
    </a>
  );

  return (
    <div className="theory">
      <div className="guide-bar">
        <nav className="crumb" aria-label="위치">
          <a href={paths.theories()} onClick={onLinkClick}>
            이론
          </a>{' '}
          /{' '}
          <a href={paths.theory(exam.id, theory.id)} onClick={onLinkClick}>
            <span className="code">{exam.code}</span> <span lang={theory.lang}>{theory.title}</span>
          </a>
        </nav>
        <span className="row small">
          {hasQuestions(exam.id) && (
            <a href={paths.exam(exam.id)} onClick={onLinkClick}>
              모의고사 풀기
            </a>
          )}
          {exam.theories
            .filter((t) => t.id !== theory.id)
            .map((t) => (
              <a key={t.id} href={paths.theory(exam.id, t.id)} onClick={onLinkClick} lang={t.lang}>
                {t.title}
              </a>
            ))}
          {exam.guides.map((g) => (
            <a key={g.id} href={paths.guide(exam.id, g.id)} onClick={onLinkClick}>
              {g.title}
            </a>
          ))}
        </span>
      </div>
      <div className="theory-body">
        <aside className={navOpen ? 'theory-nav open' : 'theory-nav'} aria-label="노트 목록">
          <button
            type="button"
            className="btn sm theory-nav-toggle"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? '노트 목록 닫기' : '노트 목록'}
            {current ? ` · ${current.name}` : ''}
          </button>
          <div className="theory-nav-in">
            <input
              type="search"
              className="theory-search"
              placeholder="노트 찾기(이름·별칭)"
              aria-label="노트 찾기"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {q ? (
              <ul className="theory-list">
                {found.map((n) => (
                  <li key={n.name}>{link(n)}</li>
                ))}
                {!found.length && <li className="muted small">찾는 노트가 없습니다.</li>}
              </ul>
            ) : (
              folders.map(([folder, list]) =>
                // 보관함 맨 위에 있는 노트(폴더 없음)는 묶지 않고 바로 보여 준다.
                folder === '' ? (
                  <ul key="" className="theory-list theory-root">
                    {list.map((n) => (
                      <li key={n.name}>{link(n)}</li>
                    ))}
                  </ul>
                ) : (
                  <details key={folder} open={list.includes(current!)}>
                    <summary>
                      {folderLabel(folder)} <span className="muted small">{list.length}</span>
                    </summary>
                    <ul className="theory-list">
                      {list.map((n) => (
                        <li key={n.name}>{link(n)}</li>
                      ))}
                    </ul>
                  </details>
                ),
              )
            )}
          </div>
        </aside>
        {error ? (
          <main className="theory-main">
            <p className="note">노트를 불러오지 못했습니다: {error}</p>
          </main>
        ) : !notes ? (
          <main className="theory-main muted">불러오는 중…</main>
        ) : !current ? (
          <main className="theory-main stack">
            <h1>노트를 찾을 수 없습니다</h1>
            <p>
              <a href={paths.theory(exam.id, theory.id)} onClick={onLinkClick}>
                {theory.home}(으)로
              </a>
            </p>
          </main>
        ) : (
          <NoteArticle
            key={current.name}
            lang={theory.lang}
            note={current}
            notes={notes}
            resolve={(name) => {
              const n = index.get(name.toLowerCase());
              return n && hrefOf(n.name);
            }}
            hrefOf={hrefOf}
          />
        )}
      </div>
    </div>
  );
}

function NoteArticle({
  lang,
  note,
  notes,
  resolve,
  hrefOf,
}: {
  lang: string;
  note: Note;
  notes: Note[];
  resolve: (name: string) => string | undefined;
  hrefOf: (name: string) => string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [cardsOpen, setCardsOpen] = useState(false);
  const md = useMemo(() => toMarkdown(note.body, resolve), [note, resolve]);
  const hasCards = md.includes('> [!card]-');
  const self = note.name.toLowerCase();
  const backlinks = notes
    .filter((n) => n !== note && n.links.some((l) => l.toLowerCase() === self))
    .sort((a, b) => byName(a.name, b.name));

  // [[노트#제목]] 링크: 주소의 #제목으로 스크롤한다. navigate()가 맨 위로 올린 다음에 움직이도록 한 박자 늦춘다.
  useEffect(() => {
    const go = () =>
      setTimeout(() => {
        const id = decodeURIComponent(location.hash.slice(1));
        if (id) document.getElementById(id)?.scrollIntoView();
      });
    go();
    window.addEventListener('cme:navigate', go);
    window.addEventListener('popstate', go);
    return () => {
      window.removeEventListener('cme:navigate', go);
      window.removeEventListener('popstate', go);
    };
  }, [md]);

  const toggleCards = () => {
    const open = !cardsOpen;
    ref.current
      ?.querySelectorAll<HTMLDetailsElement>('details.callout-card')
      .forEach((d) => (d.open = open));
    setCardsOpen(open);
  };

  return (
    <main ref={ref} className="theory-main theory-note" lang={lang}>
      {note.props.length > 0 && (
        <dl className="theory-props">
          {note.props.map(([k, v]) => (
            <div key={k}>
              <dt>{PROP_LABEL[k] ?? k}</dt>
              <dd>{Array.isArray(v) ? v.join(', ') : v}</dd>
            </div>
          ))}
        </dl>
      )}
      {hasCards && (
        <p className="row">
          <button type="button" className="btn sm" onClick={toggleCards}>
            {cardsOpen ? '답 모두 숨기기' : '답 모두 보기'}
          </button>
          <span className="muted small">카드를 누르면 답이 하나씩 보입니다.</span>
        </p>
      )}
      <ReactMarkdown
        remarkPlugins={plugins as never}
        components={{
          a: ({ node: _node, href, ...props }) =>
            href?.startsWith('/') ? (
              <a {...props} href={href} onClick={onLinkClick} />
            ) : (
              <a {...props} href={href} target="_blank" rel="noopener noreferrer" />
            ),
        }}
      >
        {md}
      </ReactMarkdown>
      {backlinks.length > 0 && (
        <section className="theory-backlinks" aria-label="이 노트를 가리키는 노트">
          <h2>이 노트를 가리키는 노트 {backlinks.length}</h2>
          <p>
            {backlinks.map((n, i) => (
              <span key={n.name}>
                {i > 0 && ' · '}
                <a href={hrefOf(n.name)} onClick={onLinkClick}>
                  {n.name}
                </a>
              </span>
            ))}
          </p>
        </section>
      )}
    </main>
  );
}
