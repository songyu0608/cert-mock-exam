import { HomeLink } from '../components/HomeLink.tsx';
import { useEffect, useRef } from 'react';
import { ThemeToggle } from '../components/ThemeToggle.tsx';
import { guideUrl, hasQuestions } from '../data/exams.ts';
import type { Exam } from '../data/schema.ts';
import { applyTheme, useTheme } from '../lib/theme.ts';
import { onLinkClick, paths } from '../router.ts';

/** 가이드 HTML을 화면 전체 높이의 iframe으로 연다. 문서 안의 탭·목차는 문서가 스스로 처리한다. */
export function GuideView({ exam, guideId }: { exam: Exam; guideId: string }) {
  const guide = exam.guides.find((g) => g.id === guideId);
  const url = guide && guideUrl(exam.id, guide.id);
  const frame = useRef<HTMLIFrameElement>(null);
  const { pref } = useTheme();
  // 가이드 문서도 :root[data-theme]로 색을 바꾸므로, 같은 출처 iframe 문서에 앱과 같은 값을 건다.
  const syncFrame = () => {
    try {
      const doc = frame.current?.contentDocument;
      if (doc) applyTheme(doc, pref);
    } catch {
      // 다른 출처로 열린 문서면 건드리지 않는다.
    }
  };
  useEffect(syncFrame);
  if (!guide || !url)
    return (
      <main className="wrap stack">
        <HomeLink />
        <h1>가이드를 찾을 수 없습니다</h1>
        <p>
          <a href={paths.guides()} onClick={onLinkClick}>
            가이드 목록으로
          </a>
        </p>
      </main>
    );
  return (
    <div className="guide-view">
      <div className="guide-bar">
        <nav className="crumb" aria-label="위치">
          <HomeLink />
          <a href={paths.guides()} onClick={onLinkClick}>
            가이드
          </a>{' '}
          / <span className="code">{exam.code}</span> {guide.title}
        </nav>
        <span className="row small">
          {hasQuestions(exam.id) && (
            <a href={paths.exam(exam.id)} onClick={onLinkClick}>
              모의고사 풀기
            </a>
          )}
          <a href={url} target="_blank" rel="noopener">
            새 탭에서 열기
          </a>
          <ThemeToggle />
        </span>
      </div>
      <iframe
        ref={frame}
        onLoad={syncFrame}
        className="guide-frame"
        src={url}
        title={`${exam.code} ${guide.title}`}
      />
    </div>
  );
}
