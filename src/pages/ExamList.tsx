import { TopTabs } from '../components/TopTabs.tsx';
import { VendorBadge } from '../components/VendorBadge.tsx';
import { exams } from '../data/exams.ts';
import { onLinkClick, paths } from '../router.ts';
import { loadActive, loadAttempts } from '../lib/storage.ts';
import { useRecordsVersion } from '../lib/useRecords.ts';
import { getKey } from '../lib/sync.ts';

export function ExamList() {
  // 다른 기기에서 기록을 받으면 다시 그린다.
  useRecordsVersion();
  const vendors = [...new Set(exams.map((e) => e.vendor))];
  return (
    <main className="wrap stack">
      <header>
        <h1>자격증 모의고사</h1>
        <p className="lede">시험을 고르고 실전 모의고사, 연습, 오답 다시 풀기 중 하나로 풉니다.</p>
        <p className="small" style={{ margin: 0 }}>
          <a href={paths.settings()} onClick={onLinkClick}>
            기기 간 기록 동기화 {getKey() ? '설정' : '켜기'}
          </a>
        </p>
      </header>
      <TopTabs current="exams" />
      {vendors.map((v) => (
        <section key={v} className="vendor" aria-labelledby={`v-${v}`}>
          <h2 id={`v-${v}`}>
            <VendorBadge vendor={v} />
          </h2>
          <div className="cards">
            {exams
              .filter((e) => e.vendor === v)
              .map((e) => {
                const last = loadAttempts(e.id).find((a) => a.mode === 'mock');
                const active = loadActive(e.id);
                return (
                  <a key={e.id} className="card" href={paths.exam(e.id)} onClick={onLinkClick}>
                    <span>
                      <span className="code">{e.code}</span>
                    </span>
                    <h2>{e.name}</h2>
                    <span className="meta">
                      {active
                        ? '푸는 중인 세션이 있습니다'
                        : last
                          ? `최근 실전 ${last.percent}% · ${new Date(last.finishedAt).toLocaleDateString('ko-KR')}`
                          : '아직 기록 없음'}
                    </span>
                  </a>
                );
              })}
          </div>
        </section>
      ))}
    </main>
  );
}
