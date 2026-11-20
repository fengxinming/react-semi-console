import { Bar } from '@ant-design/charts';
import type { BarConfig } from '@ant-design/charts';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import { useSettingsStore } from '~/store';
import type { MultiDimensionLoaderData } from './types';

const { Title } = Typography;

/** 今日转赞评:横向条形(参考 HorizontalInterval,单色圆角条)。数据由路由 loader 提供。 */
export default function ActivityBar() {
  const theme = useSettingsStore((s) => s.theme);
  const { t } = useTranslation();
  const { interval: data } = useLoaderData<MultiDimensionLoaderData>();

  const config: BarConfig = {
    data: [...data].reverse(),
    xField: 'name',
    yField: 'count',
    style: { fill: '#4086FF', radius: 8, maxWidth: 10 },
    axis: {
      x: { title: false },
      y: { title: false, labelFormatter: (v: number) => `${Number(v) / 1000}k` },
    },
    legend: false,
  };

  return (
    <Card variant="borderless" className="w-full">
      <Title level={5}>{t('multiDAnalysis.card.title.todayActivity')}</Title>
      <div className="w-full h-[176px]">
        <Bar {...config} theme={theme} />
      </div>
    </Card>
  );
}
