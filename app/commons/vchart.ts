import { VChartCore } from '@visactor/react-vchart';
import type { ITheme, ISpec } from '@visactor/react-vchart';

/**
 * VChart 主题注册。项目 store 的 theme 值就是 'light' / 'dark'，与 VChart 内置主题名一致。
 * 内置 map 默认只注册了 light，dark 需手动注册；这里补上 dark 的色板（文字/网格自动跟随明暗），
 * 并把默认 light 的背景设为透明，让图表融入卡片底色。
 */
let registered = false;

const darkPalette = {
  backgroundColor: 'transparent',
  primaryFontColor: '#fdfdfd',
  secondaryFontColor: '#bbbdc3',
  tertiaryFontColor: '#888c93',
  axisLabelFontColor: '#888c93',
  axisGridColor: '#404349',
  axisDomainColor: '#4b4f54',
  popupBackgroundColor: '#404349',
};

export function registerChartThemes() {
  if (registered) {
    return;
  }
  registered = true;
  const darkTheme: ITheme = {
    name: 'dark',
    type: 'dark',
    background: 'transparent',
    colorScheme: { default: { palette: darkPalette } },
  } as unknown as ITheme;
  VChartCore.ThemeManager.registerTheme('dark', darkTheme);
  const light = VChartCore.ThemeManager.getTheme('light', true);
  VChartCore.ThemeManager.registerTheme('light', { ...light, background: 'transparent' });
}

/**
 * 把普通对象 spec 断言为 VChart 的 ISpec，并注入当前主题。
 * VChart 运行时接受普通对象作为 data/config，但 TS 类型要求严格（IData/DataView 等），
 * 故集中在这里收口断言；主题放在 spec.theme 而非组件 prop（React 组件无 theme prop）。
 */
export function makeSpec(spec: Record<string, unknown>, theme: 'light' | 'dark'): ISpec {
  return { ...spec, theme } as unknown as ISpec;
}

/** 半透明颜色：给图表系列色加透明度，输入 #rrggbb。 */
export function withAlpha(hex: string, alpha: number) {
  const raw = hex.replace('#', '');
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
