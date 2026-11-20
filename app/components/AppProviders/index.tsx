import { useEffect } from 'react';
import { App, ConfigProvider, theme as antdTheme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { QueryClientProvider } from '@tanstack/react-query';
import { useSettingsStore } from '~/store';
import queryClient from '~/commons/queryClient';
import { setAntdApp } from '~/commons/antdApp';
import type { AppProvidersProps } from './types';

const LOCALES = {
  'zh-CN': zhCN,
  'en-US': enUS,
} as const;

/** 把 App.useApp 实例写入全局单例，供非组件环境（request.ts 等）使用 */
function AppBridge() {
  const app = App.useApp();
  useEffect(() => {
    setAntdApp(app);
  }, [app]);
  return null;
}

/**
 * 基础 token（浅色/深色通用）：主色、圆角、控件高度、字体族。
 * 通过 antd ConfigProvider.token 统一注入，避免逐组件样式覆盖。
 */
const BASE_TOKENS = {
  colorPrimary: '#165DFF',
  borderRadius: 2,
  fontSize: 13,
  controlHeight: 32,
  controlHeightLG: 40,
  controlHeightSM: 24,
  colorLink: '#165DFF',
  colorInfo: '#165DFF',
  colorSuccess: '#00B42A',
  colorWarning: '#FF7D00',
  colorError: '#F53F3F',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
};

/**
 * 只在浅色模式注入的表面/填充色：页面底色、容器底色、filled 输入框底色。
 * 关键：ConfigProvider 的 theme.token 覆盖发生在算法「之后」
 * （antd 源码 theme/useToken.ts getComputedToken：`{ ...derivativeToken, override }`），
 * 若在深色模式继续注入这几项浅色值，darkAlgorithm 推导出的深色背景会被强行刷成白色，
 * 白色文字叠在白底上即「白底白字」。故深色交给 darkAlgorithm 推导。
 * / Light-only surface/fill tokens. `theme.token` overrides are applied AFTER the algorithm
 * (see antd theme/useToken.ts → getComputedToken), so injecting these light values in dark mode
 * overwrites darkAlgorithm's dark surfaces and produces white-on-white. Dark mode falls back
 * to the algorithm.
 */
const LIGHT_ONLY_TOKENS = {
  colorBgLayout: '#F7F8FA',
  colorBgContainer: '#FFFFFF',
  // filled 变体输入框底色 / filled input background
  colorFillQuaternary: '#F2F3F5',
};

export default function AppProviders({ children }: AppProvidersProps) {
  const themeColor = useSettingsStore((s) => s.themeColor);
  const mode = useSettingsStore((s) => s.theme);
  const language = useSettingsStore((s) => s.lang);

  return (
    <ConfigProvider
      locale={LOCALES[language] ?? zhCN}
      theme={{
        cssVar: { key: 'app' },
        algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          ...BASE_TOKENS,
          ...(mode === 'light' ? LIGHT_ONLY_TOKENS : {}),
          colorPrimary: themeColor,
        },
      }}
    >
      <App>
        <AppBridge />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </App>
    </ConfigProvider>
  );
}
