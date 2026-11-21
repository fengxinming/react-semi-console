import { generate } from '@ant-design/colors';
import i18n from '~/i18n';
import type { Language, Theme } from '~/store/types';

/**
 * 切换明暗：给 body 增删 theme-mode="dark"。
 * Semi 在 body 下同时挂载亮/暗两套色盘，靠这个属性切换（官方机制）。
 * 浮层（Toast/Tooltip/Popover 等 portal 到 body）因此自动跟随明暗。
 */
export function setTheme(theme: Theme) {
  if (theme === 'dark') {
    document.body.setAttribute('theme-mode', 'dark');
  } else {
    document.body.removeAttribute('theme-mode');
  }
}

/**
 * 主题色：把主色及其色阶写入 body 的 --semi-color-primary 系列变量。
 * Semi 组件从这些 CSS 变量取色，运行时覆盖即可换肤，无需重编译主题包。
 * 色阶由 @ant-design/colors 的 generate 生成 10 档，取其中几档映射到 Semi 的 hover/active/light。
 */
export function setThemeColor(themeColor: string, theme: Theme) {
  const palette = generate(themeColor, { theme: theme === 'dark' ? 'dark' : 'default' });
  const body = document.body.style;
  body.setProperty('--semi-color-primary', themeColor);
  // palette[5] 略深、palette[6] 更深；hover/active 取相邻档，保证交互态可辨识
  body.setProperty('--semi-color-primary-hover', palette[5] ?? themeColor);
  body.setProperty('--semi-color-primary-active', palette[6] ?? themeColor);
  // light 系列取浅色档，用于浅色填充背景/文字
  body.setProperty('--semi-color-primary-light-default', palette[0] ?? themeColor);
  body.setProperty('--semi-color-primary-light-hover', palette[1] ?? themeColor);
  body.setProperty('--semi-color-primary-light-active', palette[2] ?? themeColor);
}

/**
 * 色弱模式：给 body 加反色滤镜。
 */
export function setColorWeak(colorWeak: boolean) {
  document.body.style.filter = colorWeak ? 'invert(80%)' : 'none';
}

/**
 * 切换语言：i18n 实例 changeLanguage + html lang 属性。
 */
export function setLang(lang: Language) {
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang === 'zh-CN' ? 'zh' : 'en';
}
