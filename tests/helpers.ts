import { expect, type Page } from '@playwright/test';

/** 견본 시험(sample-all-types)의 현재 문항에 정답을 입력한다. 문항은 본문 글자로 구분한다. */
export async function answerSampleCorrectly(page: Page): Promise<void> {
  const article = page.locator('article');
  const stem = (await article.locator('.q-text').innerText()).trim();
  const line = (text: string) => article.locator('.line', { hasText: text });

  if (stem.startsWith('Git에서 새 브랜치')) {
    await article.getByRole('radio', { name: 'git switch -c feature' }).check();
  } else if (stem.startsWith('다음 중 소수를')) {
    await article.getByRole('checkbox', { name: '2', exact: true }).check();
    await article.getByRole('checkbox', { name: '3', exact: true }).check();
  } else if (stem.startsWith('GitHub Actions 워크플로')) {
    const order = ['이벤트 발생', '러너 할당', '스텝 실행'];
    for (const [i, label] of order.entries())
      await article
        .getByRole('combobox', { name: String(i + 1), exact: true })
        .selectOption({ label });
  } else if (stem.startsWith('단계를 순서대로')) {
    const target = ['1단계 계획', '2단계 구현', '3단계 배포'];
    for (let pos = 0; pos < target.length; pos++) {
      // target[pos]를 위로 올려 pos 자리에 놓는다.
      for (;;) {
        const texts = await article.locator('.line .t').allInnerTexts();
        const at = texts.findIndex((t) => t.trim() === target[pos]);
        if (at === pos) break;
        await article.getByRole('button', { name: `${at + 1}번 항목을 위로` }).click();
      }
    }
  } else if (stem.startsWith('각 파일의 용도')) {
    await article
      .getByRole('combobox', { name: 'CODEOWNERS' })
      .selectOption({ label: '리뷰어 자동 지정' });
    await article
      .getByRole('combobox', { name: 'dependabot.yml' })
      .selectOption({ label: '의존성 업데이트' });
  } else if (stem.startsWith('다음 문장이 맞는지')) {
    await line('Pull request는').getByRole('radio', { name: '예' }).check();
    await line('Fork는').getByRole('radio', { name: '아니요' }).check();
  } else if (stem.startsWith('가장 적합한 기능은')) {
    await expect(article.locator('.scenario')).toContainText('사례 연구');
    await article.getByRole('radio', { name: '브랜치 보호 규칙' }).check();
  } else if (stem.startsWith('다음 설정이 요구 사항을')) {
    await line('필수 리뷰 수').getByRole('radio', { name: '예' }).check();
  } else if (stem.startsWith('해결책이 목표를')) {
    const meets = (await article.innerText()).includes('GitHub Secrets');
    await article.getByRole('radio', { name: meets ? '예' : '아니요' }).check();
  } else {
    throw new Error(`모르는 문항: ${stem}`);
  }
}

export async function openExam(page: Page, code: string): Promise<void> {
  await page.goto('/');
  await page.getByRole('link', { name: new RegExp(code) }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

export function modeCard(page: Page, name: string) {
  return page.locator('.mode', { has: page.getByRole('heading', { name, exact: true }) });
}
