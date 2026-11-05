import { defineConfig, devices } from '@playwright/test';

// 이 컨테이너처럼 브라우저가 미리 설치된 환경은 PW_CHROMIUM_PATH로 경로를 넘긴다(CI는 비워 둔다).
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    launchOptions: { executablePath },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // 견본 시험이 들어간 e2e 빌드를 Worker(동기화 API)와 빈 로컬 D1로 띄운다.
    command: 'pnpm e2e:server',
    url: 'http://127.0.0.1:4173',
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
