import { Skeleton, Statistic, Typography } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { Column, Line, Pie } from '@ant-design/charts';
import { useSettingsStore } from '~/store';
import type { OverviewItem, ChartPoint } from '~/api/types';
import type { MiniChartProps } from './types';
import styles from './style.module.styl';

const { Text } = Typography;

function pieSpec(data: ChartPoint[]) {
  return {
    data,
    angleField: 'count',
    colorField: 'name',
    radius: 0.9,
    innerRadius: 0.6,
    scale: {
      color: {
        range: ['#8D4EDA', '#00B2FF', '#165DFF'],
      },
    },
    legend: {
      color: {
        position: 'right',
        // rowPadding: 5,
        layout: {
          justifyContent: 'center',
        },
      },
    },
    tooltip: {
      title: 'name', // 标题
      items: ['count'], // 数据项
    },
  };
}

function lineSpec(data: ChartPoint[]) {
  return {
    data,
    xField: 'x',
    yField: 'y',
    colorField: 'name',
    scale: { color: { range: ['#165DFF', 'rgba(106,161,255,0.3)'] } },
    shapeField: 'smooth',
    style: {
      lineWidth: 3,
      lineDash: (d: ChartPoint[]) => {
        return d[0].name === '类目2' ? [8, 10] : [0, 0];
      },
    },
    axis: { x: false, y: false },
    legend: false,
    tooltip: false,
    padding: [10, 10, 0, 10],
  };
}

function columnSpec(data: ChartPoint[]) {
  return {
    data,
    xField: 'x',
    yField: 'y',
    style: {
      fill: (d: ChartPoint) => (Number(d.x) % 2 === 0 ? '#2CAB40' : '#86DF6C'),
      radius: 6,
      maxWidth: 6,
    },
    axis: { x: false, y: false },
    legend: false,
    tooltip: false,
    padding: [10, 10, 0, 10],
  };
}

function MiniChart({ chartType, chartData, theme }: MiniChartProps) {
  if (chartType === 'pie') {
    return (
      <div className="w-full h-[100px]">
        <div className="w-full h-[140px] my-[-20px]">
          <Pie {...pieSpec(chartData)} theme={theme} />
        </div>
      </div>
    );
  }
  if (chartType === 'line') {
    return (
      <div className="w-full h-[100px]">
        <Line {...lineSpec(chartData)} theme={theme} />
      </div>
    );
  }
  return (
    <div className="w-full h-[100px]">
      <Column {...columnSpec(chartData)} theme={theme} />
    </div>
  );
}

export default function PublicOpinionCard(props: OverviewItem) {
  const { chartType, title, count, increment, diff, chartData, loading, compareTime } = props;
  const theme = useSettingsStore((s) => s.theme);
  const className = `${styles.card} ${styles[`card-${chartType}`]}`;

  return (
    <div className={className}>
      <div className="whitespace-nowrap w-[100px]">
        <Statistic
          title={
            <Typography.Title level={5} className="m-0">
              {title}
            </Typography.Title>
          }
          loading={loading}
          value={count}
          groupSeparator=","
        />
        <div className="flex">
          <Text type="secondary" className={styles['compare-yesterday-text']}>
            {compareTime}
          </Text>
          <span className={`${styles.diff} ${increment ? styles['diff-increment'] : ''}`}>
            <Skeleton loading={loading} paragraph={{ rows: 1 }} active>
              {diff}
              {increment ? <RiseOutlined /> : <FallOutlined />}
            </Skeleton>
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col-reverse">
        <Skeleton loading={loading} paragraph={{ rows: 3, width: Array(3).fill('100%') }} active>
          <MiniChart
            chartType={chartType}
            chartData={(chartData as ChartPoint[]) ?? []}
            theme={theme}
          />
        </Skeleton>
      </div>
    </div>
  );
}
