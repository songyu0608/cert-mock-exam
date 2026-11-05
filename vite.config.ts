import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // react-dom, 마크다운, zod(형식 검사)를 합친 기본 번들이 500kB를 조금 넘는다(gzip 약 160kB).
  build: { chunkSizeWarningLimit: 600 },
  test: {
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
});
