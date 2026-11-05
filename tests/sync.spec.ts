import { expect, test, type Page } from '@playwright/test';
import { modeCard, openExam } from './helpers.ts';

// wrangler.e2e.jsonc에 등록 코드가 들어 있는 테스트 키
const KEY = 'cme-E2ET-ESTK-EY00-0000-0000-0000-00';

// 로컬 D1 하나를 같이 쓰므로, 기기 화면 크기만 다른 mobile 프로젝트에서는 돌리지 않는다.
test.skip(({ isMobile }) => isMobile, '서버 기록 공유');

const pageErrors: string[] = [];
test.afterEach(() => {
  expect(pageErrors).toEqual([]);
  pageErrors.length = 0;
});

async function newDevice(browser: import('@playwright/test').Browser): Promise<Page> {
  const page = await (await browser.newContext()).newPage();
  page.on('pageerror', (e) => pageErrors.push(e.message));
  return page;
}

async function connect(page: Page, key: string): Promise<void> {
  await page.goto('/settings');
  await page.getByRole('textbox', { name: '비밀키' }).fill(key.toLowerCase());
  await page.getByRole('button', { name: '연결' }).click();
}

const syncStatus = (page: Page) =>
  page.getByRole('region', { name: '동기화 상태' }).getByRole('status');

test('같은 키를 넣은 두 기기가 결과 기록과 초기화를 주고받는다', async ({ browser }) => {
  // 기기 A: 동기화를 켜기 전에 틀린 문항 하나를 남긴다.
  const a = await newDevice(browser);
  await openExam(a, 'SAMPLE-01');
  const card = modeCard(a, '연습');
  await card.getByRole('combobox').selectOption('all');
  await card.getByRole('button', { name: '시작' }).click();
  for (;;) {
    const stem = await a.locator('.q-text').innerText();
    if (stem.startsWith('Git에서 새 브랜치')) break;
    await a.getByRole('button', { name: '건너뛰기' }).click();
  }
  await a.getByRole('radio', { name: 'git merge feature' }).check();
  await a.getByRole('button', { name: '정답 확인' }).click();
  await a.getByRole('button', { name: '여기까지 채점하고 끝내기' }).click();
  await expect(a.locator('.score .big')).toHaveText('0%');

  // 키를 넣으면 이 기기에 있던 기록을 올린다(소문자로 넣어도 같은 키).
  await connect(a, KEY);
  await expect(syncStatus(a)).toContainText('올린 기록 1개');

  // 기기 B: 같은 키를 넣으면 기록을 받아 오답 목록과 풀이 기록에 보인다.
  const b = await newDevice(browser);
  await connect(b, KEY);
  await expect(syncStatus(b)).toContainText('받은 기록 1개');
  await openExam(b, 'SAMPLE-01');
  await expect(modeCard(b, '오답 다시 풀기')).toContainText('틀린 문항 1개');
  await expect(b.locator('.history tbody tr')).toHaveCount(1);

  // 기기 B에서 초기화하면 기기 A도 다시 열 때 지워진다.
  await b.getByRole('button', { name: '기록 초기화' }).click();
  await b.getByRole('button', { name: '지우기' }).click();
  await expect(modeCard(b, '오답 다시 풀기')).toContainText('틀린 문항 0개');
  await b.goto('/settings');
  await expect(syncStatus(b)).toContainText('동기화 완료');

  await openExam(a, 'SAMPLE-01');
  await expect(modeCard(a, '오답 다시 풀기')).toContainText('틀린 문항 0개');
  await expect(a.locator('.history tbody tr')).toHaveCount(0);
});

test('새 비밀키는 등록 코드를 보여 주고, 등록 전에는 동기화를 거부한다', async ({ browser }) => {
  const page = await newDevice(browser);
  await page.goto('/settings');
  await page.getByRole('button', { name: '새 비밀키 만들기' }).click();
  await expect(syncStatus(page)).toContainText('등록되지 않은 비밀키');
  await expect(page.getByLabel('등록 코드', { exact: true })).toHaveText(/^[0-9a-f]{64}$/);
  await page.getByRole('button', { name: '보기' }).click();
  await expect(page.getByLabel('비밀키', { exact: true })).toHaveText(
    /^cme-([A-Z0-9]{4}-){6}[A-Z0-9]{2}$/,
  );

  // 연결을 끊으면 다시 키 입력 화면이 나온다.
  await page.getByRole('button', { name: '이 기기에서 연결 끊기' }).click();
  await page.getByRole('button', { name: '연결 끊기', exact: true }).click();
  await expect(page.getByRole('button', { name: '새 비밀키 만들기' })).toBeVisible();

  // 형식이 틀린 키는 받지 않는다.
  await page.getByRole('textbox', { name: '비밀키' }).fill('cme-1234');
  await page.getByRole('button', { name: '연결' }).click();
  await expect(page.getByRole('alert')).toContainText('키 형식이 맞지 않습니다');
});
