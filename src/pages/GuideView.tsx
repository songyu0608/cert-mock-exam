import { guideUrl } from '../data/exams.ts';
import type { Exam } from '../data/schema.ts';
import { onLinkClick, paths } from '../router.ts';

/** 가이드 HTML을 화면 전체 높이의 iframe으로 연다. 문서 안의 탭·목차는 문서가 스스로 처리한다. */
export function GuideView({ exam, guideId }: { exam: Exam; guideId: string }) {
  const guide = exam.guides.find((g) => g.id === guideId);
  const url = guide && guideUrl(exam.id, guide.id);
  if (!guide || !url)
    return (
      <main className="wrap stack">
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
          <a href={paths.guides()} onClick={onLinkClick}>
            가이드
          </a>{' '}
          / <span className="code">{exam.code}</span> {guide.title}
        </nav>
        <span className="row small">
          <a href={paths.exam(exam.id)} onClick={onLinkClick}>
            모의고사 풀기
          </a>
          <a href={url} target="_blank" rel="noopener">
            새 탭에서 열기
          </a>
        </span>
      </div>
      <iframe className="guide-frame" src={url} title={`${exam.code} ${guide.title}`} />
    </div>
  );
}
