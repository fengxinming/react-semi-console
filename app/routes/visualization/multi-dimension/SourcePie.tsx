import { Pie } from '@ant-design/charts';
// import type { PieConfig } from '@ant-design/charts';
import { Typography, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router';
import { useSettingsStore } from '~/store';
import type { ContentSourceItem } from '~/api/types';
import type { MultiDimensionLoaderData } from './types';
import styles from './style.module.styl';

const { Title } = Typography;

// 5 种 type 的固定配色(手写图例与各环饼共用,保证颜色一致)
const SOURCE_COLORS = ['#249eff', '#846BCE', '#21CCFF', '#86DF6C', '#0E42D2'];

/** 内容发布来源:分面多环饼(参考 FactMultiPie,每类一个环饼 + 中心类目名 + 百分比标签)。数据由路由 loader 提供。 */
export default function SourcePie() {
  const { t } = useTranslation();
  const theme = useSettingsStore((s) => s.theme);
  const { multiPie: data } = useLoaderData<MultiDimensionLoaderData>();
  const types = Array.from(new Set(data.map((d) => d.type)));
  const categories = Array.from(new Set(data.map((d) => d.category)));

  return (
    <Card variant="borderless" className="w-full">
      <Title level={5}>{t('multiDAnalysis.card.title.contentSource')}</Title>
      <div className="min-h-[240px]">
        <div className="flex">
          {categories.map((cat) => (
            <div key={cat} className="flex-1 min-w-0">
              <div className="w-full h-[260px]">
                <Pie
                  data={data.filter((d) => d.category === cat)}
                  angleField="value"
                  colorField="type"
                  radius={0.8}
                  innerRadius={0.6}
                  scale={{ color: { domain: types, range: SOURCE_COLORS } }}
                  legend={false}
                  label={{
                    text: (d: ContentSourceItem) => `${(d.value * 100).toFixed(2)}%`,
                    position: 'outside',
                    style: { fontSize: 10 },
                  }}
                  annotations={[
                    {
                      type: 'text',
                      style: {
                        text: cat,
                        x: '50%',
                        y: '50%',
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: 500,
                      },
                    },
                  ]}
                  theme={theme}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles['content-source-legend']}>
          {types.map((type, i) => (
            <span key={type} className={styles['content-source-legend-item']}>
              <span
                className={styles['content-source-legend-dot']}
                style={{ background: SOURCE_COLORS[i % SOURCE_COLORS.length] }}
              />
              {type}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
