// 화면 테마(밝게·어둡게). 고르지 않으면 기기 설정(prefers-color-scheme)을 따른다.
// 고른 값은 <html data-theme>로 걸고 styles.css의 [data-theme] 규칙이 색을 바꾼다.
// 첫 화면이 깜빡이지 않도록 index.html의 인라인 스크립트도 같은 저장값(cme:v1:theme)을 읽는다.
import { useSyncExternalStore } from 'react';
import { read, write } from './storage.ts';

export type ThemePref = 'system' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

const KEY = 'theme';
const EVENT = 'cme:theme-changed';
const DARK_QUERY = '(prefers-color-scheme: dark)';

// 저장하지 못했을 때(저장소 차단·공간 부족)도 화면과 버튼 상태가 어긋나지 않도록 이 탭에서 고른 값을 들고 있는다.
let chosen: ThemePref | undefined;

export function getThemePref(): ThemePref {
  if (chosen) return chosen;
  const v = read<unknown>(KEY, 'system');
  return v === 'light' || v === 'dark' ? v : 'system';
}

function systemTheme(): Theme {
  try {
    return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/** 지금 화면에 보이는 테마 */
export function currentTheme(): Theme {
  const pref = getThemePref();
  return pref === 'system' ? systemTheme() : pref;
}

/** 문서(앱 또는 가이드 iframe)에 고른 테마를 건다. 'system'이면 속성을 지워 기기 설정을 따르게 한다. */
export function applyTheme(doc: Document = document, pref: ThemePref = getThemePref()): void {
  const root = doc.documentElement;
  if (pref === 'system') delete root.dataset.theme;
  else root.dataset.theme = pref;
}

export function setThemePref(pref: ThemePref): void {
  chosen = pref;
  write(KEY, pref === 'system' ? null : pref);
  applyTheme(document, pref);
  window.dispatchEvent(new Event(EVENT));
}

/**
 * 앱 시작 때 한 번 부른다. 다른 탭에서 바꾼 테마를 화면 구독과 상관없이(풀이 화면처럼 버튼이 없는 화면에서도) 바로 건다.
 */
export function startThemeSync(): void {
  applyTheme();
  window.addEventListener('storage', (e) => {
    if (e.key !== null && !e.key.endsWith(`:${KEY}`)) return;
    chosen = undefined;
    applyTheme();
    window.dispatchEvent(new Event(EVENT));
  });
}

/** 밝게 ↔ 어둡게. 지금 보이는 테마의 반대를 고른다. */
export function toggleTheme(): void {
  setThemePref(currentTheme() === 'dark' ? 'light' : 'dark');
}

function subscribe(onChange: () => void): () => void {
  let media: MediaQueryList | undefined;
  try {
    media = window.matchMedia(DARK_QUERY);
    media.addEventListener('change', onChange);
  } catch {
    // matchMedia가 없는 환경이면 기기 설정 변화는 알 수 없다.
  }
  // 다른 탭에서 바꾼 값은 startThemeSync가 이 이벤트로 알린다.
  window.addEventListener(EVENT, onChange);
  return () => {
    media?.removeEventListener('change', onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

const snapshot = () => `${getThemePref()}/${currentTheme()}`;

/** 고른 값과 지금 보이는 테마. 바뀌면 다시 그린다. */
export function useTheme(): { pref: ThemePref; theme: Theme } {
  const s = useSyncExternalStore(subscribe, snapshot);
  const [pref, theme] = s.split('/') as [ThemePref, Theme];
  return { pref, theme };
}
