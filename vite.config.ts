import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';

// e2e 견본 시험의 가이드 HTML(?url 자산)은 코드에서 빠져도 파일은 내보내진다. 일반 빌드에서는 지운다.
function dropFixtureAssets(mode: string): Plugin {
  return {
    name: 'drop-fixture-assets',
    apply: 'build',
    generateBundle(_, bundle) {
      if (mode === 'e2e') return;
      for (const [file, out] of Object.entries(bundle)) {
        if (out.type !== 'asset') continue;
        const from = [...(out.originalFileNames ?? [])];
        if (from.some((f) => f.includes('tests/fixtures/'))) delete bundle[file];
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), dropFixtureAssets(mode)],
  // react-dom, 마크다운, zod(형식 검사)를 합친 기본 번들이 500kB를 조금 넘는다(gzip 약 160kB).
  build: { chunkSizeWarningLimit: 600 },
  test: {
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
}));
