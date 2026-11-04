import { expect, test } from '@playwright/test';
import { answerSampleCorrectly, modeCard, openExam } from './helpers.ts';

// 화면에서 자바스크립트 오류가 나면 테스트를 실패시킨다.
const pageErrors = new WeakMap<object, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  pageErrors.set(page, errors);
  page.on('pageerror', (e) => errors.push(e.message));
});
test.afterEach(async ({ page }) => {
  expect(pageErrors.get(page)).toEqual([]);
});

test('시험 목록에 AWS 두 시험이 보이고, 주소로 바로 들어가도 열린다', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /AIB-C01/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /AIF-C01/ })).toBeVisible();
  await page.goto('/exam/aws-aib-c01');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'AWS Certified AI Business Strategist',
  );
  await expect(page.getByText('0/43 풀이')).toBeVisible();
  await page.goto('/exam/nope');
  await expect(page.getByRole('heading', { name: '페이지를 찾을 수 없습니다' })).toBeVisible();
});

test('연습: 7가지 유형 모두 정답을 입력하면 100%', async ({ page }) => {
  await openExam(page, 'SAMPLE-01');
  const card = modeCard(page, '연습');
  await card.getByRole('combobox').selectOption('all');
  await card.getByRole('button', { name: '시작' }).click();

  const total = Number((await page.locator('.bar-title').innerText()).split('/')[1]);
  expect(total).toBe(10);
  for (let i = 0; i < total; i++) {
    await expect(page.locator('.bar-title')).toContainText(`${i + 1}/${total}`);
    await answerSampleCorrectly(page);
    await page.getByRole('button', { name: '정답 확인' }).click();
    await expect(page.getByRole('status').filter({ hasText: '정답입니다' })).toBeVisible();
    await page.getByRole('button', { name: i < total - 1 ? '다음' : '결과 보기' }).click();
  }
  await expect(page).toHaveURL(/\/result\//);
  await expect(page.locator('.score .big')).toHaveText('100%');
  await expect(page.getByText('틀린 문항이 없습니다.')).toBeVisible();
});

test('연습: 오답이면 정답과 해설을 보여 주고, 오답 다시 풀기에 들어간다', async ({ page }) => {
  await openExam(page, 'SAMPLE-01');
  const card = modeCard(page, '연습');
  await card.getByRole('combobox').selectOption('all');
  await card.getByRole('button', { name: '시작' }).click();
  // 첫 문항만 일부러 틀린다: 단일 선택이면 오답, 그 외 유형이면 건너뛰며 단일 선택을 찾는다.
  for (;;) {
    const stem = await page.locator('.q-text').innerText();
    if (stem.startsWith('Git에서 새 브랜치')) break;
    await page.getByRole('button', { name: '건너뛰기' }).click();
  }
  await page.getByRole('radio', { name: 'git merge feature' }).check();
  await page.getByRole('button', { name: '정답 확인' }).click();
  await expect(page.getByRole('status').filter({ hasText: '오답입니다' })).toBeVisible();
  await expect(page.getByText('정답. -c는 만들고 이동합니다.')).toBeVisible();
  await page.getByRole('button', { name: '여기까지 채점하고 끝내기' }).click();
  await expect(page.locator('.score .big')).toHaveText('0%');

  await page.getByRole('link', { name: '시험 홈', exact: true }).click();
  const review = modeCard(page, '오답 다시 풀기');
  await expect(review).toContainText('틀린 문항 1개');
  await review.getByRole('button', { name: '시작' }).click();
  await expect(page.locator('.bar-title')).toContainText('1/1');
  await expect(page.getByText('오답 다시 풀기 ·')).toBeAttached();
  await answerSampleCorrectly(page);
  await page.getByRole('button', { name: '정답 확인' }).click();
  await page.getByRole('button', { name: '결과 보기' }).click();
  await page.getByRole('link', { name: '시험 홈', exact: true }).click();
  await expect(modeCard(page, '오답 다시 풀기')).toContainText('틀린 문항 0개');
});

test('실전: 표시, 문항 이동, 문제-해결 잠금, 제출 후 결과와 기록', async ({ page }) => {
  await openExam(page, 'SAMPLE-01');
  await modeCard(page, '실전 모의고사').getByRole('button', { name: '시작' }).click();
  await expect(page.getByRole('timer')).toHaveText(/^(10:00|09:5\d)$/);
  const cells = page
    .getByRole('region', { name: '문항 이동' })
    .getByRole('button', { name: /^\d+번/ });
  const total = await cells.count();
  expect(total).toBe(10);

  // 문제-해결 문항을 찾아 답하고 넘어가면 그 칸이 잠긴다.
  let psIndex = -1;
  for (let i = 0; i < total; i++) {
    await cells.nth(i).click();
    if ((await page.locator('.q-text').innerText()).startsWith('해결책이 목표를')) {
      psIndex = i;
      break;
    }
  }
  expect(psIndex).toBeGreaterThanOrEqual(0);
  await expect(page.getByText('넘어가면 돌아올 수 없습니다')).toBeVisible();
  await answerSampleCorrectly(page);
  await page.getByRole('button', { name: '나중에 보기 표시' }).click();
  const next = psIndex < total - 1 ? psIndex + 1 : 0;
  await cells.nth(next).click();
  await expect(cells.nth(psIndex)).toBeDisabled();

  // 새로고침해도 이어진다.
  await page.reload();
  await expect(page.locator('.bar-title')).toContainText(`${next + 1}/${total}`);
  await expect(cells.nth(psIndex)).toBeDisabled();

  await page.getByRole('button', { name: '제출' }).last().click();
  await expect(page.getByRole('alertdialog')).toContainText('답하지 않은 문항 9개');
  await expect(page.getByRole('alertdialog')).toContainText('표시한 문항 1개');
  await page.getByRole('button', { name: '제출하기' }).click();
  await expect(page.locator('.score .big')).toHaveText('10%');
  await expect(page.getByText('합격선 미달')).toBeVisible();
  await page.getByRole('button', { name: /전체 10/ }).click();
  await expect(page.locator('details.review-item')).toHaveCount(10);

  await page.getByRole('link', { name: '시험 홈', exact: true }).click();
  await expect(page.locator('.history tbody tr')).toHaveCount(1);
  await expect(page.locator('.history')).toContainText('불합격');
});

test('나가기 후 시험 홈에서 이어 풀기와 버리기', async ({ page }) => {
  await openExam(page, 'AIF-C01');
  await modeCard(page, '연습').getByRole('button', { name: '시작' }).click();
  await page.locator('.opt').first().click();
  await page.getByRole('link', { name: '나가기' }).click();
  await expect(page.getByRole('status').filter({ hasText: '연습 진행 중 · 1/20번' })).toBeVisible();
  await expect(
    modeCard(page, '실전 모의고사').getByRole('button', { name: '시작' }),
  ).toBeDisabled();
  await page.getByRole('button', { name: '이어 풀기' }).click();
  await expect(page.locator('.opt.sel')).toHaveCount(1);
  await page.getByRole('link', { name: '나가기' }).click();
  await page.getByRole('button', { name: '버리기' }).click();
  await expect(modeCard(page, '실전 모의고사').getByRole('button', { name: '시작' })).toBeEnabled();
});

test('AIB-C01 실전은 문항 수를 고르고 시간이 비례한다', async ({ page }) => {
  await openExam(page, 'AIB-C01');
  const card = modeCard(page, '실전 모의고사');
  await card.getByRole('combobox').selectOption('50');
  await card.getByRole('button', { name: '시작' }).click();
  await expect(
    page.getByRole('region', { name: '문항 이동' }).getByRole('button', { name: /^\d+번/ }),
  ).toHaveCount(50);
  await expect(page.getByRole('timer')).toHaveText(/^1:(40:00|39:5\d)$/);
});
