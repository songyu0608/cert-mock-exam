import { onLinkClick, paths } from '../router.ts';

export function HomeLink({ label = '사이트 홈' }: { label?: string }) {
  return (
    <a
      className="site-home"
      href={paths.list()}
      onClick={onLinkClick}
      aria-label={label}
      title={label}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
