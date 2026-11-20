import { Radar } from '@ant-design/charts';
import type { RadarConfig } from '@ant-design/charts';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import { useSettingsStore } from '~/store';
import type { MultiDimensionLoaderData } from './types';

const { Title } = Typography;

/** 内容题材分布:雷达/极坐标面积(参考 AreaPolar,按 category 分色)。数据由路由 loader 提供。 */
export default function ThemeRadar() {
  const theme = useSettingsStore((s) => s.theme);
  const { t } = useTranslation();
  const { polar } = useLoaderData<MultiDimensionLoaderData>();

  // 把宽格式转成长格式:每行 { item, category, value }
  const longData = polar.list.flatMap((row) =>
    polar.fields.map((field) => ({
      item: row.item,
      category: field,
      value: row[field] as number,
    })),
  );

  const lineSpec: RadarConfig = {
    data: longData,
    xField: 'item',
    yField: 'value',
    colorField: 'category',
    area: {
      style: { fillOpacity: 0.1 },
    },
    scale: {
      y: { domainMin: 0 },
      color: {
        range: ['#313CA9', '#21CCFF', '#249EFF'],
      },
    },
    axis: {
      y: { labelFormatter: () => '' },
    },
    legend: {
      color: {
        position: 'right',
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  return (
    <Card variant="borderless">
      <Title level={5}>{t('multiDAnalysis.card.title.contentTheme')}</Title>
      <div className="w-full h-[215px]">
        <div className="h-[235px] my-[15px]">
          <Radar {...lineSpec} theme={theme} />
        </div>
      </div>
    </Card>
  );
}
