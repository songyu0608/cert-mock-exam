// 이론 정리 노트: exams/<시험 id>/theory/<보관함 id>/<폴더>/<노트>.md
// 파일은 정적 자산으로 내보내고, 이론 화면을 열 때 그 시험의 노트를 모두 받는다(검색·역링크에 전체가 필요).
import { noteTargets, parseNote, type PropValue } from '../lib/theory.ts';

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

interface Diagram {
  url: string;
  description: string;
}
const diagrams: Record<string, Diagram> = {
  ...import.meta.glob<Diagram>('../../exams/*/theory/*/assets/*.svg', {
    query: '?theory-diagram',
    import: 'default',
    eager: true,
  }),
  ...(fixtures
    ? import.meta.glob<Diagram>('../../tests/fixtures/exams/*/theory/*/assets/*.svg', {
        query: '?theory-diagram',
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
  resolveImage: (name: string) => { url: string; alt: string } | undefined;
}

const entries = Object.entries(files).flatMap(([path, url]) => {
  const [, vault, examId, theoryId, folder, name] =
    /^(.*\/exams\/([^/]+)\/theory\/([^/]+))\/(?:(.+)\/)?([^/]+)\.md$/.exec(path) ?? [];
  return vault && examId && theoryId && name
    ? [{ examId, theoryId, vault, folder: folder ?? '', name, url }]
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
              links: noteTargets(body).notes,
              resolveImage(name: string) {
                const image = diagrams[`${e.vault}/assets/${name}`];
                return image && { url: image.url, alt: `${e.name}: ${image.description}` };
              },
            };
          }),
        )
      : Promise.reject(new Error(`이론 노트가 없습니다: ${key}`));
    p.catch(() => cache.delete(key));
    cache.set(key, p);
  }
  return p;
}
