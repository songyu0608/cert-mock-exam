import { useEffect } from 'react';
import { getExam } from './data/exams.ts';
import { ExamHome } from './pages/ExamHome.tsx';
import { ExamList } from './pages/ExamList.tsx';
import { ResultPage } from './pages/ResultPage.tsx';
import { SessionPage } from './pages/SessionPage.tsx';
import { onLinkClick, paths, useRoute } from './router.ts';

export function App() {
  const route = useRoute();
  const exam = 'examId' in route ? getExam(route.examId) : undefined;

  useEffect(() => {
    document.title = exam ? `${exam.code} · 자격증 모의고사` : '자격증 모의고사';
  }, [exam]);

  if (route.name === 'list') return <ExamList />;
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
