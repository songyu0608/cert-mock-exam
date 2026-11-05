import { VENDOR_LABEL } from '../data/exams.ts';

/** 업체 이름을 대표색 배지로 보여 준다. 색이 없는 업체는 기본 회색 배지. */
export function VendorBadge({ vendor }: { vendor: string }) {
  return <span className={`vb vb-${vendor}`}>{VENDOR_LABEL[vendor] ?? vendor}</span>;
}
