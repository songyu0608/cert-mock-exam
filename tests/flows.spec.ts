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

test('시나리오형 시험(CCAR-F): 회차를 골라 시작하면 시나리오별로 묶어 출제하고 2단 화면으로 푼다', async ({
  page,
}) => {
  await openExam(page, 'CCAR-F');
  await expect(page.locator('html')).toHaveAttribute('data-vendor', 'anthropic');
  await expect(page.locator('html')).toHaveAttribute('data-lang', 'ja');
  const card = modeCard(page, '실전 모의고사');
  // 1~5회는 숨긴 회차(hidden)라 목록에 없다. 보이는 회차는 6회, 축적, 시나리오별 세트(S1 · A 등).
  // 시나리오별 세트는 계속 늘어나므로 개수는 세지 않고 대표 회차만 확인한다.
  await expect(card.getByRole('button', { name: 'S1 · A 시작' })).toHaveCount(1);
  // 짧은 회차는 실제 출제 수와 제한 시간을 보인다.
  await expect(card.locator('.set-row', { hasText: 'S1 · A' })).toContainText(
    '시나리오 1 · 15문항 · 30분',
  );
  await expect(card.getByRole('button', { name: '2회 시작' })).toHaveCount(0);
  await expect(card.getByRole('button', { name: '축적 시작' })).toHaveCount(1);
  await card.getByRole('button', { name: '6회 · 장문 시작' }).click();

  // 위: 진행 위치, フラグ, 남은 시간(표시/비표시 한 버튼). 나가기 버튼은 없다.
  await expect(page.locator('.bar-title')).toContainText('問題 1 / 60');
  await expect(page.locator('.bar-mode')).toContainText('6회 · 장문 · 시나리오 1·2·3·6');
  await expect(page.getByRole('link', { name: '나가기' })).toHaveCount(0);
  // 숨기면 화면 읽기 프로그램에서도 빠지므로(aria-hidden) 역할 대신 위치로 찾는다.
  const timer = page.locator('.sv-clock .timer');
  await expect(timer).toHaveText(/^(2:00:00|1:59:5\d)$/);
  await page.getByRole('button', { name: '非表示' }).click();
  await expect(timer).toHaveClass(/\boff\b/);
  await page.getByRole('button', { name: '表示', exact: true }).click();
  await expect(timer).not.toHaveClass(/\boff\b/);

  // 왼쪽: 문항 번호와 시나리오 1의 지문(제목 없이 본문만). 오른쪽: 문제와 보기.
  const left = page.locator('.sv-sc');
  await expect(left.getByRole('heading', { name: '問題 1' })).toBeVisible();
  await expect(left.locator('.sv-sc-text')).toContainText('カスタマーサポート解決エージェント');
  await expect(left).not.toContainText('シナリオ 1');
  const right = page.locator('.sv-q');
  await expect(right.locator('[lang="ja"] .q-text')).toBeVisible();
  await expect(right.locator('.q-inst')).toHaveText('1つ選択してください。');

  // 보기에 취소선을 그으면 고를 수 없고, 다시 누르면 돌아온다. 오른쪽 클릭으로도 된다.
  const radios = right.getByRole('radio');
  await radios.first().check();
  await right.getByRole('button', { name: '選択肢 A に取り消し線を引く' }).click();
  await expect(radios.first()).toBeDisabled();
  await expect(radios.first()).not.toBeChecked();
  await right.getByRole('button', { name: '選択肢 A の取り消し線を外す' }).click();
  await expect(radios.first()).toBeEnabled();
  await right.locator('.sv-opt').nth(1).click({ button: 'right' });
  await expect(radios.nth(1)).toBeDisabled();
  await radios.nth(2).check();

  // フラグ, 次の問題 / 前の問題
  await page.getByRole('button', { name: 'フラグ', exact: true }).click();
  await expect(page.locator('.sv-flag')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.sv-flag')).toHaveText('✓ フラグ');
  await expect(page.getByRole('button', { name: '前の問題' })).toBeDisabled();
  await page.getByRole('button', { name: '次の問題' }).click();
  await expect(page.locator('.bar-title')).toContainText('問題 2 / 60');
  await expect(left.getByRole('heading', { name: '問題 2' })).toBeVisible();
  await page.getByRole('button', { name: '前の問題' }).click();
  await expect(radios.nth(2)).toBeChecked();
  await expect(radios.nth(1)).toBeDisabled();

  // 새로고침해도 취소선·フラグ·시간 숨김이 남는다.
  await page.getByRole('button', { name: '非表示' }).click();
  await page.reload();
  await expect(page.locator('.bar-title')).toContainText('問題 1 / 60');
  await expect(page.locator('.sv-q').getByRole('radio').nth(1)).toBeDisabled();
  await expect(timer).toHaveClass(/\boff\b/);

  // レビュー: No·問題·フラグ 60줄, 1번부터. 줄을 누르면 그 문제로 간다.
  await page.getByRole('button', { name: /^レビュー/ }).click();
  const rows = page.locator('.sv-table tbody tr');
  await expect(rows).toHaveCount(60);
  await expect(page.locator('.sv-review')).toHaveJSProperty('scrollTop', 0);
  await expect(rows.first().locator('td').nth(2)).toHaveText('✓');
  await expect(rows.nth(1).locator('td').nth(2)).toHaveText('');
  await expect(rows.first().locator('td').nth(1)).not.toHaveText('');
  // 답한 1번은 표시 없음, 안 답한 문항은 번호 옆에 未回答.
  await expect(rows.first().locator('.sv-unans')).toHaveCount(0);
  await expect(rows.nth(1).locator('.sv-unans')).toHaveText('未回答');
  await expect(rows.nth(1)).toHaveAttribute('aria-label', '問題 2、未回答に移動');
  await expect(page.getByRole('button', { name: '問題に戻る' })).toHaveCount(0);
  await expect(page.locator('.sv-flag')).toHaveCount(0);
  await rows.nth(59).click();
  await expect(page.locator('.bar-title')).toContainText('問題 60 / 60');
  await expect(left.locator('.sv-sc-text')).toContainText('構造化データ抽出');
  // 60번에서 次の問題를 누르면 レビュー로 가고, 다시 열어도 맨 위부터 보인다.
  await page.getByRole('button', { name: '次の問題' }).click();
  await expect(page.getByRole('heading', { name: 'レビュー' })).toBeVisible();
  await expect(page.locator('.sv-review')).toHaveJSProperty('scrollTop', 0);

  // 問題提出 → 팝업에서 いいえ면 그대로, はい면 채점 결과로 간다.
  await page.getByRole('button', { name: '問題提出' }).click();
  const dialog = page.getByRole('alertdialog');
  await expect(dialog).toContainText('問題を提出しますか？');
  await expect(dialog).toContainText('未回答が 59 問あります。');
  // 키보드 포커스는 확인창 안에서만 돈다(배경은 inert).
  await expect(dialog.getByRole('button', { name: 'いいえ' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'はい' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'いいえ' })).toBeFocused();
  await expect(page.locator('.sv-review')).toHaveAttribute('inert', '');
  await dialog.getByRole('button', { name: 'いいえ' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('button', { name: '問題提出' })).toBeFocused();
  await page.getByRole('button', { name: '問題提出' }).click();
  await page.getByRole('alertdialog').getByRole('button', { name: 'はい' }).click();
  await expect(page).toHaveURL(/\/result\//);
  await expect(page.locator('.score .big')).toBeVisible();

  // 시험 목록으로 돌아가면 업체 테마를 지운다.
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveAttribute('data-vendor', 'anthropic');
});

test('시나리오형 시험(CCAR-F): 무작위 조합은 시나리오 4개에서 세트 하나씩 골라 60문항을 낸다', async ({
  page,
}) => {
  await openExam(page, 'CCAR-F');
  const card = modeCard(page, '실전 모의고사');
  // 목록 맨 위에 있다.
  await expect(card.locator('.set-row').first()).toContainText('무작위 조합 시작');
  await card.getByRole('button', { name: '무작위 조합 시작' }).click();
  await expect(page.locator('.bar-title')).toContainText('問題 1 / 60');
  // 이름에 고른 세트 4개가 시나리오 순서대로 붙는다(예: S1 · B, S3 · A, S4 · D, S6 · C).
  await expect(page.locator('.bar-mode')).toContainText(
    /무작위 조합 · S\d · [A-D](, S\d · [A-D]){3}/,
  );
  await expect(page.locator('.sv-clock .timer')).toHaveText(/^(2:00:00|1:59:5\d)$/);
});

test('이론 탭: 노트를 열고 링크·접는 상자·카드·검색이 동작한다', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: '화면' }).getByRole('link', { name: '이론' }).click();
  await expect(page).toHaveURL(/\/theory$/);
  await page.getByRole('link', { name: /견본 이론/ }).click();
  await expect(page).toHaveURL(/\/theory\/sample-all-types\/ko$/);
  const note = page.locator('.theory-note');
  await expect(note.getByRole('heading', { name: '견본 이론 홈' })).toBeVisible();
  await expect(note.locator('.callout-info .callout-title')).toHaveText('이 보관함');
  const quote = note.locator('details.callout-quote');
  await expect(quote.getByText('접혀 있는 본문')).toBeHidden();
  await quote.locator('summary').click();
  await expect(quote.getByText('접혀 있는 본문')).toBeVisible();

  // 표 안의 [[노트|별칭]] 링크로 이동하고, 역링크로 돌아온다.
  await note.getByRole('link', { name: 'A 개념 보기' }).click();
  await expect(page).toHaveURL(/\/theory\/sample-all-types\/ko\/%EA%B0%9C%EB%85%90%20A$/);
  await expect(note.getByRole('heading', { name: '개념 A' })).toBeVisible();
  await expect(note.locator('.theory-props')).toContainText('Concept A');
  const card = note.locator('details.callout-card');
  await expect(card.locator('summary')).toHaveText('견본 질문은?');
  await expect(card.getByText('견본 답')).toBeHidden();
  await note.getByRole('button', { name: '답 모두 보기' }).click();
  await expect(card.getByText('견본 답')).toBeVisible();
  await note.locator('.theory-backlinks').getByRole('link', { name: '홈' }).click();
  await expect(page).toHaveURL(/\/theory\/sample-all-types\/ko$/);

  // 별칭으로 찾기, 새로고침해도 같은 노트, 없는 노트. 좁은 화면은 목록을 펼쳐야 보인다.
  const toggle = page.getByRole('button', { name: /^노트 목록/ });
  if (await toggle.isVisible()) await toggle.click();
  await page.getByRole('searchbox', { name: '노트 찾기' }).fill('ガイネン');
  await page.locator('.theory-nav').getByRole('link', { name: '개념 A' }).click();
  await expect(note.getByRole('heading', { name: '개념 A' })).toBeVisible();
  await page.reload();
  await expect(page.locator('.theory-note').getByRole('heading', { name: '개념 A' })).toBeVisible();
  await page.goto('/theory/sample-all-types/ko/nope');
  await expect(page.getByRole('heading', { name: '노트를 찾을 수 없습니다' })).toBeVisible();

  // 예전 주소(/theory/<시험>/<노트>)는 첫 보관함의 노트로 연다.
  await page.goto('/theory/sample-all-types/' + encodeURIComponent('개념 A'));
  await expect(page.locator('.theory-note').getByRole('heading', { name: '개념 A' })).toBeVisible();

  // 같은 시험의 다른 보관함(일본어)으로 옮기고, [[노트#제목]] 링크는 그 제목으로 간다.
  await page.getByRole('link', { name: '見本ノート' }).click();
  await expect(page).toHaveURL(/\/theory\/sample-all-types\/ja$/);
  await expect(page.locator('.theory-note')).toHaveAttribute('lang', 'ja');
  await page.locator('.theory-note').getByRole('link', { name: '問題 2へ' }).click();
  await expect(page).toHaveURL(/\/ja\/%E8%A8%AD%E5%95%8F%E9%9B%86#%E5%95%8F%E9%A1%8C-2$/);
  await expect(page.locator('#問題-2')).toBeInViewport();
});

test('문항 없이 이론만 있는 시험(GH-200)은 이론 탭에만 보인다', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /CCAR-P/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /GH-200/ })).toHaveCount(0);
  await page.goto('/theory');
  await expect(page.getByRole('link', { name: /CCAR-P/ })).toHaveCount(2);
  for (const code of ['GH-200', 'GH-300', 'GH-900'])
    await expect(page.getByRole('link', { name: new RegExp(code) })).toHaveCount(1);
  // 시험 주소로 들어오면 읽기 자료로 안내한다.
  await page.goto('/exam/github-gh-200');
  await expect(page.getByText('아직 모의고사 문항이 없습니다', { exact: false })).toBeVisible();
  await page.getByRole('link', { name: '이론 정리' }).click();
  await expect(page).toHaveURL(/\/theory\/github-gh-200\/ko$/);
  await expect(
    page.locator('.theory-note').getByRole('heading', { name: 'GH-200 대시보드' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: '모의고사 풀기' })).toHaveCount(0);
  await page.goto('/exam/github-gh-200/play');
  await expect(page.getByText('아직 모의고사 문항이 없습니다', { exact: false })).toBeVisible();
});

test('고정 회차 시험(CCAR-P): 숨긴 1~5회는 빠지고 1회(장문)만 보이며 60문항을 낸다', async ({
  page,
}) => {
  await openExam(page, 'CCAR-P');
  await expect(page.locator('html')).toHaveAttribute('data-lang', 'ja');
  const card = modeCard(page, '실전 모의고사');
  await expect(card.getByRole('button', { name: /시작$/ })).toHaveCount(1);
  await expect(card).toContainText('60문항 고정');
  await expect(card).not.toContainText('63문항 고정');
  await card.getByRole('button', { name: '1회 시작' }).click();
  await expect(page.locator('.bar-title')).toContainText('1/60');
  await expect(page.locator('.bar-mode')).toContainText('1회');
  await expect(page.locator('article')).toHaveAttribute('lang', 'ja');
});

test('고정 회차 시험(CCAO-F): 1회를 시작하면 60문항을 낸다', async ({ page }) => {
  await openExam(page, 'CCAO-F');
  await expect(page.locator('html')).toHaveAttribute('data-lang', 'ja');
  const card = modeCard(page, '실전 모의고사');
  await expect(card.getByRole('button', { name: /회 시작$/ })).toHaveCount(1);
  await expect(card).toContainText('60문항 고정');
  await card.getByRole('button', { name: '1회 시작' }).click();
  await expect(page.locator('.bar-title')).toContainText('1/60');
  await expect(page.locator('article')).toHaveAttribute('lang', 'ja');
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
