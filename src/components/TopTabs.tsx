import { ThemeToggle } from './ThemeToggle.tsx';
import { onLinkClick, paths } from '../router.ts';

export function TopTabs({ current }: { current: 'exams' | 'guides' | 'theory' | 'notes' }) {
  const tabs = [
    { key: 'exams', label: '모의고사', href: paths.list() },
    { key: 'guides', label: '가이드', href: paths.guides() },
    { key: 'theory', label: '이론', href: paths.theories() },
    { key: 'notes', label: '노트', href: paths.notes() },
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
      <ThemeToggle />
    </nav>
  );
}
