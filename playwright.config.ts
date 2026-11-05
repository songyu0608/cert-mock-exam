import { defineConfig, devices } from '@playwright/test';

// 이 컨테이너처럼 브라우저가 미리 설치된 환경은 PW_CHROMIUM_PATH로 경로를 넘긴다(CI는 비워 둔다).
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    launchOptions: { executablePath },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // 견본 시험이 들어간 e2e 빌드를 띄운다.
    command: 'pnpm build:e2e && pnpm exec vite preview --outDir dist-e2e --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
