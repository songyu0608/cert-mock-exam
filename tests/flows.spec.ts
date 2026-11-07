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

// 같은 코드의 한국어판과 일본어판이 함께 있어 이름까지 맞춘다.
const AIB_KO = /AIB-C01 AWS Certified AI Business Strategist(?! \(日本語\))/;

test('시험 목록에 AWS 시험이 모두 보이고, 주소로 바로 들어가도 열린다', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /AIB-C01/ })).toHaveCount(2);
  await expect(page.getByRole('link', { name: AIB_KO })).toBeVisible();
  await expect(page.getByRole('link', { name: /AIB-C01 .*\(日本語\)/ })).toBeVisible();
  for (const code of ['AIF-C01', 'SAA-C03', 'DEA-C01', 'GH-900', 'GH-300'])
    await expect(page.getByRole('link', { name: new RegExp(code) })).toBeVisible();
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
  // 지금 문항 번호를 다시 눌러도 잠기지 않는다.
  await cells.nth(psIndex).click();
  await expect(page.locator('article').getByRole('radio').first()).toBeEnabled();
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

test('결과를 저장하지 못하면 풀던 세션을 지우지 않고 다시 제출할 수 있다', async ({ page }) => {
  await openExam(page, 'SAMPLE-01');
  await modeCard(page, '실전 모의고사').getByRole('button', { name: '시작' }).click();
  await answerSampleCorrectly(page);
  // 저장 공간이 꽉 찬 것처럼 결과 기록 저장만 실패시킨다.
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key: string, value: string) {
      if (key.includes(':attempts:') && !(window as { allowSave?: boolean }).allowSave)
        throw new DOMException('full', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await page.getByRole('button', { name: '제출' }).last().click();
  await page.getByRole('button', { name: '제출하기' }).click();
  await expect(page.getByRole('alert')).toContainText('결과를 저장하지 못했습니다');
  await expect(page).toHaveURL(/\/play$/);
  expect(
    await page.evaluate(() => localStorage.getItem('cme:v1:active:sample-all-types')),
  ).not.toBeNull();
  // 결과를 저장하지 못했으면 점수 기록에도 넣지 않는다(다시 제출해도 두 번 세지 않게).
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem('cme:v1:scores:sample-all-types') ?? '[]'),
    ),
  ).toEqual([]);

  await page.evaluate(() => ((window as { allowSave?: boolean }).allowSave = true));
  await page.getByRole('button', { name: '다시 제출' }).click();
  await expect(page).toHaveURL(/\/result\//);
  await expect(page.locator('.score .big')).toHaveText('10%');
  expect(
    await page.evaluate(() => localStorage.getItem('cme:v1:active:sample-all-types')),
  ).toBeNull();
});

test('초기화 시각을 저장하지 못하면 기록을 지우지 않고 알린다', async ({ page }) => {
  await openExam(page, 'SAMPLE-01');
  await modeCard(page, '실전 모의고사').getByRole('button', { name: '시작' }).click();
  await answerSampleCorrectly(page);
  await page.getByRole('button', { name: '제출' }).last().click();
  await page.getByRole('button', { name: '제출하기' }).click();
  await page.getByRole('link', { name: '시험 홈', exact: true }).click();
  await expect(page.locator('.history tbody tr')).toHaveCount(1);

  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key: string, value: string) {
      if (key.includes(':reset:')) throw new DOMException('full', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await page.getByRole('button', { name: '기록 초기화' }).click();
  await page.getByRole('button', { name: '지우기' }).click();
  await expect(page.getByRole('alert')).toContainText('기록을 지우지 못했습니다');
  await expect(page.locator('.history tbody tr')).toHaveCount(1);
});

test('나가기 후 시험 홈에서 이어 풀기와 버리기', async ({ page }) => {
  // 출제 순서가 무작위라 첫 문항 유형이 매번 다르다. 모든 유형을 아는 견본 시험으로 확인한다.
  await openExam(page, 'SAMPLE-01');
  const practice = modeCard(page, '연습');
  await practice.getByRole('combobox').selectOption('all');
  await practice.getByRole('button', { name: '시작' }).click();
  const stem = await page.locator('.q-text').innerText();
  await answerSampleCorrectly(page);
  await page.getByRole('link', { name: '나가기' }).click();
  await expect(page.getByRole('status').filter({ hasText: '연습 진행 중 · 1/10번' })).toBeVisible();
  await expect(
    modeCard(page, '실전 모의고사').getByRole('button', { name: '시작' }),
  ).toBeDisabled();
  await page.getByRole('button', { name: '이어 풀기' }).click();
  // 같은 문항이 열리고, 입력해 둔 답이 남아 있어 정답으로 채점된다.
  await expect(page.locator('.q-text')).toHaveText(stem);
  await page.getByRole('button', { name: '정답 확인' }).click();
  await expect(page.getByRole('status').filter({ hasText: '정답입니다' })).toBeVisible();
  await page.getByRole('link', { name: '나가기' }).click();
  await page.getByRole('button', { name: '버리기' }).click();
  await expect(modeCard(page, '실전 모의고사').getByRole('button', { name: '시작' })).toBeEnabled();
});

test('AIB-C01 실전은 문항 수를 고르고 시간이 비례한다', async ({ page }) => {
  await openExam(page, AIB_KO);
  const card = modeCard(page, '실전 모의고사');
  await card.getByRole('combobox').selectOption('50');
  await card.getByRole('button', { name: '시작' }).click();
  await expect(
    page.getByRole('region', { name: '문항 이동' }).getByRole('button', { name: /^\d+번/ }),
  ).toHaveCount(50);
  await expect(page.getByRole('timer')).toHaveText(/^1:(40:00|39:5\d)$/);
});

test('시나리오형 시험(CCAR-F): 회차를 골라 시작하면 시나리오별로 묶어 출제하고 지문을 보여 준다', async ({
  page,
}) => {
  await openExam(page, 'CCAR-F');
  await expect(page.locator('html')).toHaveAttribute('data-vendor', 'anthropic');
  await expect(page.locator('html')).toHaveAttribute('data-lang', 'ja');
  const card = modeCard(page, '실전 모의고사');
  await expect(card.getByRole('button', { name: /회 시작$/ })).toHaveCount(5);
  await card.getByRole('button', { name: '2회 시작' }).click();

  await expect(page.locator('.bar-title')).toContainText('1/60');
  await expect(page.locator('.bar-mode')).toContainText('2회 · 시나리오 1·2·4·6');
  // 새 시나리오의 첫 문항은 지문을 펼치고, 같은 시나리오의 다음 문항은 접어 둔다.
  const scen = page.locator('article details.scenario');
  await expect(scen.locator('summary')).toHaveText(/시나리오 1 · /);
  await expect(scen).toHaveAttribute('open', '');
  await expect(page.locator('article')).toHaveAttribute('lang', 'ja');
  await page.getByRole('button', { name: '다음' }).click();
  await expect(page.locator('.bar-title')).toContainText('2/60');
  await expect(scen).not.toHaveAttribute('open', '');
  await expect(scen.locator('summary')).toHaveText(/시나리오 1 · /);

  // 시험 목록으로 돌아가면 업체 테마를 지운다.
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveAttribute('data-vendor', 'anthropic');
});

test('가이드 탭: 시험별 가이드를 고르면 문서를 연다', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: '화면' })
    .getByRole('link', { name: '가이드' })
    .click();
  await expect(page).toHaveURL(/\/guides$/);
  await page.getByRole('link', { name: /견본 가이드/ }).click();
  await expect(page).toHaveURL(/\/guide\/sample-all-types\/basics$/);
  const frame = page.frameLocator('iframe.guide-frame');
  await expect(frame.getByRole('heading', { name: '견본 가이드 본문' })).toBeVisible();
  await page.getByRole('link', { name: '가이드', exact: true }).click();
  await expect(page).toHaveURL(/\/guides$/);
  await page
    .getByRole('navigation', { name: '화면' })
    .getByRole('link', { name: '모의고사' })
    .click();
  await expect(page.getByRole('link', { name: /SAMPLE-01/ })).toBeVisible();
  await page.goto('/guide/sample-all-types/nope');
  await expect(page.getByRole('heading', { name: '가이드를 찾을 수 없습니다' })).toBeVisible();
});
