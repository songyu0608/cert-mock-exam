import { toggleTheme, useTheme } from '../lib/theme.ts';

/** 밝게 ↔ 어둡게 전환 버튼. 고른 값은 이 브라우저에 남고, 설정 화면에서 기기 설정 따르기로 되돌린다. */
export function ThemeToggle() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={dark ? '밝은 화면으로 바꾸기' : '어두운 화면으로 바꾸기'}
      title={dark ? '밝은 화면으로 바꾸기' : '어두운 화면으로 바꾸기'}
    >
      {dark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
        </svg>
      )}
      <span>{dark ? '밝게' : '어둡게'}</span>
    </button>
  );
}
