// 작은 주소 라우터. 페이지가 몇 개뿐이라 라이브러리 없이 history API만 쓴다.
import { useEffect, useState, type MouseEvent } from 'react';

export type Route =
  | { name: 'list' }
  | { name: 'settings' }
  | { name: 'guides' }
  | { name: 'guide'; examId: string; guideId: string }
  | { name: 'theories' }
  | { name: 'theory'; examId: string; note?: string }
  | { name: 'exam'; examId: string }
  | { name: 'play'; examId: string }
  | { name: 'result'; examId: string; attemptId: string }
  | { name: 'notFound' };

export function parse(pathname: string): Route {
  const p = pathname.replace(/\/+$/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (p.length === 0) return { name: 'list' };
  if (p.length === 1 && p[0] === 'settings') return { name: 'settings' };
  if (p.length === 1 && p[0] === 'guides') return { name: 'guides' };
  if (p.length === 3 && p[0] === 'guide' && p[1] && p[2])
    return { name: 'guide', examId: p[1], guideId: p[2] };
  if (p.length === 1 && p[0] === 'theory') return { name: 'theories' };
  if (p.length === 2 && p[0] === 'theory' && p[1]) return { name: 'theory', examId: p[1] };
  if (p.length === 3 && p[0] === 'theory' && p[1] && p[2])
    return { name: 'theory', examId: p[1], note: p[2] };
  if (p[0] === 'exam' && p[1]) {
    if (p.length === 2) return { name: 'exam', examId: p[1] };
    if (p.length === 3 && p[2] === 'play') return { name: 'play', examId: p[1] };
    if (p.length === 4 && p[2] === 'result' && p[3])
      return { name: 'result', examId: p[1], attemptId: p[3] };
  }
  return { name: 'notFound' };
}

export const paths = {
  list: () => '/',
  settings: () => '/settings',
  guides: () => '/guides',
  guide: (examId: string, guideId: string) =>
    `/guide/${encodeURIComponent(examId)}/${encodeURIComponent(guideId)}`,
  theories: () => '/theory',
  theory: (examId: string, note?: string) =>
    `/theory/${encodeURIComponent(examId)}${note ? `/${encodeURIComponent(note)}` : ''}`,
  exam: (id: string) => `/exam/${encodeURIComponent(id)}`,
  play: (id: string) => `/exam/${encodeURIComponent(id)}/play`,
  result: (id: string, attemptId: string) =>
    `/exam/${encodeURIComponent(id)}/result/${encodeURIComponent(attemptId)}`,
};

const EVENT = 'cme:navigate';

export function navigate(to: string, opts: { replace?: boolean } = {}): void {
  if (opts.replace) history.replaceState(null, '', to);
  else history.pushState(null, '', to);
  window.dispatchEvent(new Event(EVENT));
  window.scrollTo(0, 0);
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(location.pathname));
  useEffect(() => {
    const update = () => setRoute(parse(location.pathname));
    window.addEventListener('popstate', update);
    window.addEventListener(EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(EVENT, update);
    };
  }, []);
  return route;
}

/** 내부 링크 클릭을 가로채 새로고침 없이 이동한다. */
export function onLinkClick(e: MouseEvent<HTMLAnchorElement>): void {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
    return;
  e.preventDefault();
  navigate(e.currentTarget.getAttribute('href') ?? '/');
}
