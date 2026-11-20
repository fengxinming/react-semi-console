import { useMemo } from 'react';
import { Statistic, Typography, Row, Col, Card, Skeleton } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { Column, Line } from '@ant-design/charts';
import { useSettingsStore } from '~/store';
import cs from 'classnames';
import type { CardBlockData } from '~/api/types';
import type { MultiDimensionLoaderData } from './types';
import styles from './style.module.styl';

const { Title } = Typography;

function CardBlock(props: CardBlockData) {
  const { chartType, title, count, increment, diff, chartData, loading } = props;
  const theme = useSettingsStore((s) => s.theme);

  const data = chartData ?? [];
  const lineSpec = {
    data,
    xField: 'x',
    yField: 'y',
    scale: { color: { range: ['#165DFF', 'rgba(106,161,255,0.3)'] } },
    colorField: 'name',
    shapeField: 'smooth',
    style: {
      lineWidth: 2,
      lineDash: (d: { name?: string }) => (d.name === '类目2' ? [8, 10] : [0, 0]),
    },
    axis: { x: false, y: false },
    legend: false,
    tooltip: false,
    padding: [0, 10, 0, 10],
  };
  const columnSpec = {
    data,
    xField: 'x',
    yField: 'y',
    style: {
      fill: (d: { x: number }) => (Number(d.x) % 2 === 0 ? '#86DF6C' : '#468DFF'),
      maxWidth: 10,
    },
    axis: { x: false, y: false },
    legend: false,
    tooltip: false,
    padding: [0, 10, 0, 10],
  };

  return (
    <Card variant="borderless" className={styles['card-block']}>
      <div className="flex">
        <Statistic
          title={
            <Title level={5} className="!m-0">
              {title}
            </Title>
          }
          loading={loading}
          value={count}
          prefix={
            <Skeleton loading={loading} paragraph={{ rows: 1 }} className="w-[100px]" active>
              <span
                className={cs(styles['diff'], {
                  [styles['diff-increment']]: increment,
                })}
              >
                {diff}
                {increment ? <RiseOutlined /> : <FallOutlined />}
              </span>
            </Skeleton>
          }
          groupSeparator=","
        />
      </div>
      <div className="w-full h-[80px]">
        {chartType === 'interval' ? (
          <Column {...columnSpec} theme={theme} />
        ) : (
          <Line {...lineSpec} theme={theme} />
        )}
      </div>
    </Card>
  );
}

/** 内容消费趋势四卡:条目卡 CardBlock 走 props,数据由路由 loader 提供。 */
export default function CardList() {
  const { t } = useTranslation();
  const { cardList: data } = useLoaderData<MultiDimensionLoaderData>();
  const loading = useNavigation().state !== 'idle';

  const formatData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        title: t(`multiDAnalysis.cardList.${item.name}`),
      })),
    [t, data],
  );

  return (
    <Row gutter={16}>
      {formatData.map((item) => (
        <Col span={6} key={item.name}>
          <CardBlock key={item.name} {...item} loading={loading} />
        </Col>
      ))}
    </Row>
  );
}
