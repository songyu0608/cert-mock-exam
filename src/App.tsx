import { useEffect } from 'react';
import { getExam } from './data/exams.ts';
import { ExamHome } from './pages/ExamHome.tsx';
import { ExamList } from './pages/ExamList.tsx';
import { GuideList } from './pages/GuideList.tsx';
import { GuideView } from './pages/GuideView.tsx';
import { ResultPage } from './pages/ResultPage.tsx';
import { SessionPage } from './pages/SessionPage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';
import { startAutoSync } from './lib/sync.ts';
import { onLinkClick, paths, useRoute } from './router.ts';

export function App() {
  const route = useRoute();
  const exam = 'examId' in route ? getExam(route.examId) : undefined;

  useEffect(() => startAutoSync(), []);

  useEffect(() => {
    const guide =
      route.name === 'guide' ? exam?.guides.find((g) => g.id === route.guideId) : undefined;
    document.title = guide
      ? `${exam?.code} ${guide.title} · 자격증 모의고사`
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
