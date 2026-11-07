import { onLinkClick, paths } from '../router.ts';

/** 첫 화면의 탭: 모의고사(시험 목록), 가이드(공식 가이드 목록), 이론(이론 정리 노트 목록) */
export function TopTabs({ current }: { current: 'exams' | 'guides' | 'theory' }) {
  const tabs = [
    { key: 'exams', label: '모의고사', href: paths.list() },
    { key: 'guides', label: '가이드', href: paths.guides() },
    { key: 'theory', label: '이론', href: paths.theories() },
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
