import type { ReactNode } from 'react';
import type { PopularItem, PercentageItem, OverviewData } from '~/api/types';

export interface WorkplaceUser {
  name: string;
  role: string;
  description: string;
}

export interface WorkplaceTrend {
  x: string[];
  visit: number[];
  active: number[];
}

export interface WorkplaceSource {
  name: string;
  value: number;
}

export interface WorkplaceProject {
  name: string;
  group: string;
  desc: string;
  progress: number;
  status: string;
}

export interface WorkplaceRanking {
  name: string;
  count: number;
}

export interface WorkplaceActivity {
  title: string;
  time: string;
}

export interface WorkplaceTodo {
  title: string;
  done: boolean;
}

/** workplace 路由 loader 返回的数据结构（不含 Announcement，其走 10s 轮询）。 */
export interface WorkplaceLoaderData {
  popularContents: PopularItem[];
  contentPercentage: PercentageItem[];
  overview: OverviewData;
}

/** Overview 页统计项（图标/标题/数值/单位，loading 控制骨架屏）
 *  / Statistic item on the Overview page (icon/title/count/unit; loading drives the skeleton) */
export interface StatisticItemProps {
  icon?: ReactNode;
  title?: ReactNode;
  count?: ReactNode;
  loading?: boolean;
  unit?: ReactNode;
}
