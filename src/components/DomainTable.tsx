import type { Exam } from '../data/schema.ts';

export function barClass(pct: number): string {
  return pct >= 80 ? 'ok' : pct >= 60 ? 'mid' : 'bad';
}

export interface DomainRow {
  id: string;
  /** 정답률(%) 또는 데이터 없음 */
  pct: number | null;
  detail: string;
}

/** 도메인마다 비중과 정답률 막대를 보여 준다. */
export function DomainTable({ exam, rows }: { exam: Exam; rows: DomainRow[] }) {
  return (
    <table className="dom">
      <tbody>
        {exam.domains.map((d) => {
          const r = rows.find((x) => x.id === d.id);
          const pct = r?.pct ?? null;
          return (
            <tr key={d.id}>
              <td>
                {d.id}. <span lang={exam.lang}>{d.name}</span>
                <div className="bar" aria-hidden="true">
                  <i
                    className={pct === null ? '' : barClass(pct)}
                    style={{ width: `${pct ?? 0}%` }}
                  />
                </div>
              </td>
              <td className="sub">비중 {d.weight}%</td>
              <td className="sub">{r?.detail}</td>
              <td className="num">{pct === null ? '–' : `${Math.round(pct)}%`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
