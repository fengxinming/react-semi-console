import type { ReactNode } from 'react';
import type { BasicProfileData, AdjustmentItem } from '~/api/types';

/** profile/basic 路由 loader 返回的数据结构（data 当前配置 / preData 原始配置 / tableData 调整记录）。 */
export interface ProfileLoaderData {
  data: BasicProfileData;
  preData: BasicProfileData;
  tableData: AdjustmentItem[];
}

export interface ProfileItemProps {
  data: BasicProfileData;
  type: 'origin' | 'current';
  loading?: boolean;
}

export interface ProfileBlockItem {
  title: string;
  data: { label: string; value: string | ReactNode }[];
}
