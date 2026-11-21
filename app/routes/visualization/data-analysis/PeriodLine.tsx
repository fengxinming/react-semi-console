import { Card, Typography, Spin } from '@douyinfe/semi-ui';
import { VChart } from '@visactor/react-vchart';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import { useLoaderData, useNavigation } from 'react-router';
import { makeSpec } from '~/commons/vchart';
import type { DataAnalysisLoaderData } from './types';

const { Title } = Typography;

export default function PeriodLine() {
  const { t } = useTranslation();
  const theme = useSettingsStore((s) => s.theme);
  const { contentPublishing } = useLoaderData<DataAnalysisLoaderData>();
  const loading = useNavigation().state !== 'idle';

  const config = makeSpec({
    type: 'line',
    data: [{ id: 'publishing', values: contentPublishing }],
    xField: 'time',
    yField: 'rate',
    seriesField: 'name',
    line: { style: { curveType: 'monotone' } },
    color: ['#21CCFF', '#313CA9', '#249EFF'],
    axes: [
      { orient: 'bottom', type: 'band' },
      {
        orient: 'left',
        type: 'linear',
        label: { formatMethod: (text: string) => `${Number(text)} %` },
      },
    ],
    legends: { visible: true, orient: 'bottom' },
    dataZoom: [{ type: 'slider', brushSelect: false }],
  }, theme);

  return (
    <Card bordered={false}>
      <Title heading={5}>{t('dataAnalysis.title.publishingTiming')}</Title>
      <Spin spinning={loading} className="w-full">
        <div className="w-full h-[370px]">
          <VChart spec={config} />
        </div>
      </Spin>
    </Card>
  );
}
