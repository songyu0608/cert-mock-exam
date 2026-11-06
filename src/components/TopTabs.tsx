import { onLinkClick, paths } from '../router.ts';

/** 첫 화면의 탭: 모의고사(시험 목록)와 가이드(읽기 자료 목록) */
export function TopTabs({ current }: { current: 'exams' | 'guides' }) {
  const tabs = [
    { key: 'exams', label: '모의고사', href: paths.list() },
    { key: 'guides', label: '가이드', href: paths.guides() },
  ] as const;
  return (
    <nav className="tabs" aria-label="화면">
      {tabs.map((t) => (
        <a
          key={t.key}
          href={t.href}
          onClick={onLinkClick}
          aria-current={t.key === current ? 'page' : undefined}
        >
          {t.label}
        </a>
      ))}
    </nav>
  );
}
