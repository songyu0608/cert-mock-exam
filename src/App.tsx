import { lazy, Suspense, useEffect } from 'react';
import { getExam } from './data/exams.ts';
import { ExamHome } from './pages/ExamHome.tsx';
import { ExamList } from './pages/ExamList.tsx';
import { GuideList } from './pages/GuideList.tsx';
import { GuideView } from './pages/GuideView.tsx';
import { ResultPage } from './pages/ResultPage.tsx';
import { SessionPage } from './pages/SessionPage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';
import { TheoryList } from './pages/TheoryList.tsx';
import { startAutoSync } from './lib/sync.ts';
import type { Exam } from './data/schema.ts';
import { onLinkClick, paths, useRoute, type Route } from './router.ts';

// 이론 화면(마크다운 노트 읽기)은 열 때만 내려받는다.
const TheoryView = lazy(() =>
  import('./pages/TheoryView.tsx').then((m) => ({ default: m.TheoryView })),
);

/**
 * 이론 주소에서 보관함과 노트를 고른다. 보관함 id가 없거나 모르는 값이면 첫 보관함으로 보고,
 * 모르는 값은 예전 주소(/theory/<시험>/<노트>)의 노트 이름으로 쓴다.
 */
function theoryOf(exam: Exam | undefined, route: Route) {
  if (!exam || route.name !== 'theory' || !exam.theories.length) return undefined;
  const found = exam.theories.find((t) => t.id === route.theoryId);
  if (found) return { theory: found, note: route.note };
  return { theory: exam.theories[0]!, note: route.theoryId };
}

export function App() {
  const route = useRoute();
  const exam = 'examId' in route ? getExam(route.examId) : undefined;

  useEffect(() => startAutoSync(), []);

  useEffect(() => {
    const guide =
      route.name === 'guide' ? exam?.guides.find((g) => g.id === route.guideId) : undefined;
    const theory = theoryOf(exam, route);
    document.title = guide
      ? `${exam?.code} ${guide.title} · 자격증 모의고사`
      : theory
        ? `${theory.note ?? theory.theory.title} · ${exam?.code} 이론 · 자격증 모의고사`
        : exam
          ? `${exam.code} · 자격증 모의고사`
          : '자격증 모의고사';
  }, [exam, route]);

  // 시험 화면은 업체별 테마(styles.css의 [data-vendor])와 문항 언어별 글꼴([data-lang])을 쓴다.
  useEffect(() => {
    const root = document.documentElement;
    if (exam) {
      root.dataset.vendor = exam.vendor;
      root.dataset.lang = exam.lang;
    } else {
      delete root.dataset.vendor;
      delete root.dataset.lang;
    }
  }, [exam]);

  if (route.name === 'list') return <ExamList />;
  if (route.name === 'settings') return <SettingsPage />;
  if (route.name === 'guides') return <GuideList />;
  if (exam && route.name === 'guide')
    return <GuideView key={`${exam.id}/${route.guideId}`} exam={exam} guideId={route.guideId} />;
  if (route.name === 'theories') return <TheoryList />;
  const theory = theoryOf(exam, route);
  if (exam && theory)
    return (
      <Suspense fallback={<main className="wrap muted">불러오는 중…</main>}>
        <TheoryView
          key={`${exam.id}/${theory.theory.id}`}
          exam={exam}
          theory={theory.theory}
          note={theory.note}
        />
      </Suspense>
    );
  if (exam && route.name === 'exam') return <ExamHome key={exam.id} exam={exam} />;
  if (exam && route.name === 'play') return <SessionPage key={exam.id} exam={exam} />;
  if (exam && route.name === 'result')
    return <ResultPage key={route.attemptId} exam={exam} attemptId={route.attemptId} />;
  return (
    <main className="wrap stack">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>
        <a href={paths.list()} onClick={onLinkClick}>
          시험 목록으로
        </a>
      </p>
    </main>
  );
}
