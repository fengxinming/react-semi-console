import type {
  MultiDimensionOverview,
  ActivityItem,
  PolarData,
  ContentSourceItem,
  CardBlockData,
} from '~/api/types';

export const MULTI_CARD_KEYS = [
  'userRetentionTrend',
  'userRetention',
  'contentConsumptionTrend',
  'contentConsumption',
] as const;
export const MULTI_CARD_TYPES = ['line', 'interval', 'line', 'interval'] as const;

/** multi-dimension 路由 loader 返回的数据结构，区块子组件用 useLoaderData 取用。 */
export interface MultiDimensionLoaderData {
  overview: MultiDimensionOverview;
  interval: ActivityItem[];
  polar: PolarData;
  multiPie: ContentSourceItem[];
  cardList: CardBlockData[];
}
