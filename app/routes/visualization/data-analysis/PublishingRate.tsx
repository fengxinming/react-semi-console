import { Column } from '@ant-design/charts';
import type { ColumnConfig } from '@ant-design/charts';
import { Card, Spin, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import { useLoaderData, useNavigation } from 'react-router';
import type { DataAnalysisLoaderData } from './types';

const { Title } = Typography;

/** 内容发布比例:堆叠柱(参考 MultiInterval,按 name 堆叠分色)。 */
export default function PublishingRate() {
  const theme = useSettingsStore((s) => s.theme);
  const { t } = useTranslation();
  const { contentPublishing } = useLoaderData<DataAnalysisLoaderData>();
  const loading = useNavigation().state !== 'idle';

  const config: ColumnConfig = {
    data: contentPublishing,
    xField: 'time',
    yField: 'count',
    colorField: 'name',
    stack: true,
    style: {
      maxWidth: 20,
    },
    scale: {
      color: {
        range: ['#246EFF', '#00B2FF', '#81E2FF'],
      },
    },
    axis: {
      y: {
        labelFormatter: (v: number) => `${Number(v) / 1000}k`,
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
  };

  return (
    <Card variant="borderless" className="w-full">
      <Title level={5}>{t('dataAnalysis.title.publishingRate')}</Title>
      <Spin spinning={loading} className="w-full">
        <div className="w-full h-[378px]">
          <Column {...config} theme={theme} />
        </div>
      </Spin>
    </Card>
  );
}
