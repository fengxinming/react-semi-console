import i18n from '~/i18n';
import type { Language, Theme } from '~/store/types';

/**
 * 切换主题：给 body 加 theme-mode 属性。
 * 组件配色已由 antd ConfigProvider 的 darkAlgorithm 驱动，但 @ant-design/charts 的 tooltip
 * 等样式仍靠 DOM 标记判断明暗（见 app.styl）。
 * / Switch theme: set body[theme-mode]. Component colors come from antd ConfigProvider's
 * darkAlgorithm, but DOM-driven styles such as @ant-design/charts tooltips still read this
 * marker (see app.styl).
 */
export function setTheme(theme: Theme) {
  document.body.setAttribute('theme-mode', theme);
}

/**
 * 主题色：把当前主色写入 body 上的 CSS 自定义属性 --app-color-primary。
 * antd 的 --ant-* 变量只注册在 cssVar 作用域内（见 app.styl 开头注释），
 * 挂在 body 下的元素（如 #nprogress）解析不到，故在此同步一份供其使用，避免硬编码色值。
 * / Theme color: mirror the primary color onto the --app-color-primary custom property on body.
 * antd's --ant-* vars only exist inside the cssVar scope (see the header comment in app.styl),
 * so elements under body (e.g. #nprogress) cannot resolve them; this keeps those styles
 * token-driven instead of hardcoded.
 */
export function setThemeColor(themeColor: string) {
  document.body.style.setProperty('--app-color-primary', themeColor);
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
