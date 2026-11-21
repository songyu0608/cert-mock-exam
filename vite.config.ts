import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';

// 설명은 번들에, SVG 본체는 별도 정적 파일에 둬서 화면에 보일 때만 내려받는다.
function theoryDiagrams(): Plugin {
  const query = '?theory-diagram';
  return {
    name: 'theory-diagrams',
    enforce: 'pre',
    async load(id) {
      if (!id.endsWith('.svg' + query)) return;
      const file = id.slice(0, -query.length);
      const svg = await readFile(file, 'utf8');
      const desc = /<desc\b[^>]*>([^<]+)<\/desc>/.exec(svg)?.[1]?.trim();
      if (!desc) this.error(`${file}: 그림 내용을 한 문장으로 쓴 <desc>가 필요합니다`);
      const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
      const description = desc
        .replace(/&(amp|lt|gt|quot|apos);/g, (_, key: string) => entities[key]!)
        .replace(/\s+/g, ' ');
      const asset = './' + basename(file) + '?url&no-inline';
      return `import url from ${JSON.stringify(asset)}; export default { url, description: ${JSON.stringify(description)} };`;
    },
  };
}

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
  plugins: [react(), theoryDiagrams(), dropFixtureAssets(mode)],
  // react-dom, 마크다운, zod(형식 검사)를 합친 기본 번들이 500kB를 조금 넘는다(gzip 약 160kB).
  build: {
    chunkSizeWarningLimit: 600,
    // 이론 노트(.md)는 작은 파일도 data: URL로 코드에 넣지 않고 따로 내보낸다.
    assetsInlineLimit: (file: string) => (file.endsWith('.md') ? false : undefined),
  },
  test: {
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
}));
