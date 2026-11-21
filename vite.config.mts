import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { semiTheming } from '@douyinfe/semi-vite-plugin';
import mockData from 'vite-plugin-mock-data';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import pkg from './package.json' with { type: 'json' };

const __BASE_URL__ = process.env.BASE_URL || `/${pkg.name}/`;

export default defineConfig({
  base: __BASE_URL__,
  define: {
    __BASE_URL__: JSON.stringify(__BASE_URL__),
  },
  plugins: [
    mockData({ routes: './mock', buildMock: true }),
    tailwindcss(),
    react(),
    // cssLayer 把 Semi 样式包进 @layer semi，配合 index.html 的层顺序声明，
    // 解决 Tailwind v4 Preflight 覆盖 Semi 组件样式 / 原子类优先级失效的问题。
    semiTheming({ cssLayer: true }),
    devtoolsJson(),
  ],
  // 产物落 dist/；buildMock 会保留在生产构建中，供 GitHub Pages 静态演示直接使用。
  resolve: {
    tsconfigPaths: true,
  },
});
