// 이론 정리 노트: exams/<시험 id>/theory/<보관함 id>/<폴더>/<노트>.md
// 파일은 정적 자산으로 내보내고, 이론 화면을 열 때 그 시험의 노트를 모두 받는다(검색·역링크에 전체가 필요).
import { linkTargets, parseNote, type PropValue } from '../lib/theory.ts';

const fixtures = import.meta.env.MODE === 'e2e';
const files: Record<string, string> = {
  ...import.meta.glob<string>('../../exams/*/theory/**/*.md', {
    query: '?url',
    import: 'default',
    eager: true,
  }),
  ...(fixtures
    ? import.meta.glob<string>('../../tests/fixtures/exams/*/theory/**/*.md', {
        query: '?url',
        import: 'default',
        eager: true,
      })
    : {}),
};

export interface Note {
  name: string;
  folder: string;
  props: [string, PropValue][];
  aliases: string[];
  body: string;
  links: string[];
}

const entries = Object.entries(files).flatMap(([path, url]) => {
  const m = /\/exams\/([^/]+)\/theory\/([^/]+)\/(?:(.+)\/)?([^/]+)\.md$/.exec(path);
  return m?.[1] && m[2] && m[4]
    ? [{ examId: m[1], theoryId: m[2], folder: m[3] ?? '', name: m[4], url }]
    : [];
});

const cache = new Map<string, Promise<Note[]>>();

export function loadTheory(examId: string, theoryId: string): Promise<Note[]> {
  const key = `${examId}/${theoryId}`;
  let p = cache.get(key);
  if (!p) {
    const mine = entries.filter((e) => e.examId === examId && e.theoryId === theoryId);
    p = mine.length
      ? Promise.all(
          mine.map(async (e) => {
            const res = await fetch(e.url);
            if (!res.ok) throw new Error(`${e.name}: HTTP ${res.status}`);
            const { props, body } = parseNote(await res.text());
            const aliases = props.find(([k]) => k === 'aliases')?.[1] ?? [];
            return {
              name: e.name,
              folder: e.folder,
              props,
              aliases: Array.isArray(aliases) ? aliases : [aliases],
              body,
              links: linkTargets(body),
            };
          }),
        )
      : Promise.reject(new Error(`이론 노트가 없습니다: ${key}`));
    p.catch(() => cache.delete(key));
    cache.set(key, p);
  }
  return p;
}
