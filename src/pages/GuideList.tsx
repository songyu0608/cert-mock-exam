import { TopTabs } from '../components/TopTabs.tsx';
import { VendorBadge } from '../components/VendorBadge.tsx';
import { exams } from '../data/exams.ts';
import { onLinkClick, paths } from '../router.ts';

export function GuideList() {
  const withGuides = exams.filter((e) => e.guides.length);
  const vendors = [...new Set(withGuides.map((e) => e.vendor))];
  return (
    <main className="wrap stack">
      <header>
        <h1>자격증 모의고사</h1>
        <p className="lede">시험별 공식 가이드를 읽습니다.</p>
      </header>
      <TopTabs current="guides" />
      {!withGuides.length && <p className="muted">아직 등록된 가이드가 없습니다.</p>}
      {vendors.map((v) => (
        <section key={v} className="vendor" aria-labelledby={`gv-${v}`}>
          <h2 id={`gv-${v}`}>
            <VendorBadge vendor={v} />
          </h2>
          <div className="cards">
            {withGuides
              .filter((e) => e.vendor === v)
              .flatMap((e) =>
                e.guides.map((g) => (
                  <a
                    key={`${e.id}/${g.id}`}
                    className="card"
                    href={paths.guide(e.id, g.id)}
                    onClick={onLinkClick}
                  >
                    <span>
                      <span className="code">{e.code}</span>
                    </span>
                    <h2>{g.title}</h2>
                    <span className="meta">{g.description ?? e.name}</span>
                  </a>
                )),
              )}
          </div>
        </section>
      ))}
    </main>
  );
}
