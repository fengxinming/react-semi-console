import { ConfigProvider } from '@douyinfe/semi-ui';
import zhCN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import enUS from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import { QueryClientProvider } from '@tanstack/react-query';
import { useSettingsStore } from '~/store';
import queryClient from '~/commons/queryClient';
import type { AppProvidersProps } from './types';

const LOCALES = {
  'zh-CN': zhCN,
  'en-US': enUS,
} as const;

/**
 * Semi 的 ConfigProvider 只承载 locale（组件内置文案 / 日期等）。
 * 主题（主色、明暗）不在这里配置：Semi 走 CSS 变量，由 main.tsx 挂载前的
 * rehydrate + commons/html.ts 写到 body 上（见 store/layout.ts 的订阅）。
 */
export default function AppProviders({ children }: AppProvidersProps) {
  const language = useSettingsStore((s) => s.lang);

  return (
    <ConfigProvider locale={LOCALES[language] ?? zhCN}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConfigProvider>
  );
}
