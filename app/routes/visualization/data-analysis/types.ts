import type {
  OverviewItem,
  ChartPoint,
  ContentPublishingItem,
  AuthorItem,
} from '~/api/types';

export interface TooltipItem {
  color?: string;
  name?: string;
  label?: string;
  title?: string;
  value?: string | number;
}

export interface MiniChartProps {
  chartType: OverviewItem['chartType'];
  chartData: ChartPoint[];
  theme: 'dark' | 'light';
}

/** 舆情 4 张卡的标识与图表类型映射，api 与组件共享同一来源（避免重复定义）。 */
export const CARD_KEYS = ['visitor', 'content', 'comment', 'share'] as const;
export const CARD_TYPES = ['line', 'interval', 'line', 'pie'] as const;

/** data-analysis 路由 loader 返回的数据结构，子组件用 useLoaderData 取用。 */
export interface DataAnalysisLoaderData {
  publicOpinion: OverviewItem[];
  contentPublishing: ContentPublishingItem[];
  authorList: AuthorItem[];
}
