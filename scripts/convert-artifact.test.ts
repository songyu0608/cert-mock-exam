import { describe, expect, it } from 'vitest';
import { convertArtifact } from './convert-artifact.ts';

const cfg = {
  code: 'TST-01',
  name: '테스트 시험',
  domains: [
    { n: '도메인 1', w: 60 },
    { n: '도메인 2', w: 40 },
  ],
  examN: 4,
  examMin: 10,
  passPct: 70,
  sourceNote: '<a href="https://example.com/guide" target="_blank">안내서</a>. 2026-10-24 확인.',
};
const data = [
  { t: '1.1', y: 's', q: '단일', o: ['정답', '오답'], w: ['맞음', '틀림'] },
  { t: '1.2', y: 'm', k: 2, q: '복수', o: ['정1', '정2', '오1'], w: ['a', 'b', 'c'] },
  { t: '2.1', y: 'o', q: '순서', o: ['첫째', '둘째', '셋째'], x: '해설' },
  { t: '2.1', y: 'p', q: '연결', pr: ['p1', 'p2'], o: ['r1', 'r2'], dx: ['함정'], b: '참고' },
];
const html = `<script type="application/json" id="cfg">${JSON.stringify(cfg)}</script>
<script type="application/json" id="data">${JSON.stringify(data)}</script>`;

describe('convertArtifact', () => {
  const { exam, questions } = convertArtifact(html, 'tst-01', 'tst', 'aws');
  it('시험 설정', () => {
    expect(exam.domains).toEqual([
      { id: '1', name: '도메인 1', weight: 60 },
      { id: '2', name: '도메인 2', weight: 40 },
    ]);
    expect(exam.types).toEqual(['single', 'multi', 'ordering', 'matching']);
    expect(exam.sources).toEqual([
      { label: '안내서', url: 'https://example.com/guide', checked: '2026-10-24' },
    ]);
  });
  it('정답 규칙: 단일 o[0], 복수 앞 k개, 연결 pr[i]→o[i]', () => {
    const [s, m, o, p] = questions;
    expect(s).toMatchObject({
      id: 'tst-0001',
      type: 'single',
      options: [{ correct: true, why: '맞음' }, { correct: false }],
    });
    expect(m?.type === 'multi' && m.options.map((x) => x.correct)).toEqual([true, true, false]);
    expect(o).toMatchObject({
      type: 'ordering',
      items: ['첫째', '둘째', '셋째'],
      explanation: '해설',
    });
    expect(p).toMatchObject({
      type: 'matching',
      note: '참고',
      prompts: [{ answer: 'r1' }, { answer: 'r2' }],
      responses: [
        { key: 'r1', text: 'r1' },
        { key: 'r2', text: 'r2' },
        { key: 'x1', text: '함정' },
      ],
    });
  });
});
