import { TopTabs } from '../components/TopTabs.tsx';
import { VendorBadge } from '../components/VendorBadge.tsx';
import { exams } from '../data/exams.ts';
import { onLinkClick, paths } from '../router.ts';

export function TheoryList() {
  const withTheory = exams.filter((e) => e.theories.length);
  const vendors = [...new Set(withTheory.map((e) => e.vendor))];
  return (
    <main className="wrap stack">
      <header>
        <h1>자격증 모의고사</h1>
        <p className="lede">시험별 이론 정리 노트를 읽습니다.</p>
      </header>
      <TopTabs current="theory" />
      {!withTheory.length && <p className="muted">아직 등록된 이론 노트가 없습니다.</p>}
      {vendors.map((v) => (
        <section key={v} className="vendor" aria-labelledby={`tv-${v}`}>
          <h2 id={`tv-${v}`}>
            <VendorBadge vendor={v} />
          </h2>
          <div className="cards">
            {withTheory
              .filter((e) => e.vendor === v)
              .flatMap((e) =>
                e.theories.map((t) => (
                  <a
                    key={`${e.id}/${t.id}`}
                    className="card"
                    href={paths.theory(e.id, t.id)}
                    onClick={onLinkClick}
                  >
                    <span>
                      <span className="code">{e.code}</span>
                    </span>
                    <h2 lang={t.lang}>{t.title}</h2>
                    <span className="meta" lang={t.lang}>
                      {t.description ?? e.name}
                    </span>
                  </a>
                )),
              )}
          </div>
        </section>
      ))}
    </main>
  );
}
