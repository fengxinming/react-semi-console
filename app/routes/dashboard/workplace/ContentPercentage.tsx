import { Card, Spin, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import { useLoaderData, useNavigation } from 'react-router';
import type { WorkplaceLoaderData } from './types';
import { Pie } from '@ant-design/charts';
import type { PercentageItem } from '~/api/types';

/** 内容占比：由路由 loader 提供数据，这里直接 useLoaderData 取用。 */
export default function ContentPercentage() {
  const { t } = useTranslation();
  const { contentPercentage } = useLoaderData<WorkplaceLoaderData>();
  const loading = useNavigation().state !== 'idle';
  const theme = useSettingsStore((s) => s.theme);
  const chartSpec = {
    data: contentPercentage,
    angleField: 'count',
    colorField: 'type',
    radius: 0.7,
    innerRadius: 0.5,
    scale: {
      color: {
        range: ['#21CCFF', '#313CA9', '#249EFF'],
      },
    },
    legend: {
      color: {
        position: 'bottom',
        layout: {
          justifyContent: 'center',
        },
      },
    },
    label: {
      text: (d: PercentageItem) => `${(d.percent * 100).toFixed(2)}%`,
      position: 'outside',
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: '内容量',
          x: '50%',
          y: '47%',
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 500,
          color: 'rgb(--var(color-text-1))',
        },
      },
      {
        type: 'text',
        style: {
          text() {
            const sum = contentPercentage.reduce((a, b) => a + b.count, 0);
            return Number(sum).toLocaleString();
          },
          x: '50%',
          y: '53%',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 700,
          color: 'rgb(--var(color-text-1))',
        },
      },
    ],
  };

  return (
    <Card variant="borderless">
      <Typography.Title level={5}>{t('workplace.contentPercentage')}</Typography.Title>
      <Spin spinning={loading} className="w-full">
        <div className="h-[339px]">
          <Pie {...chartSpec} theme={theme} />
        </div>
      </Spin>
    </Card>
  );
}
