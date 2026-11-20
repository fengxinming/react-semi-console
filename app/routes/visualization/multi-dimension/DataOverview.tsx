import { useMemo } from 'react';
import { Card, Typography, Row, Col, Statistic, Skeleton } from 'antd';
import { UserOutlined, EditOutlined, HeartOutlined, LikeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { Line } from '@ant-design/charts';
import type { LineConfig } from '@ant-design/charts';
import { useSettingsStore } from '~/store';
import type { MultiDimensionLoaderData } from './types';
import styles from './style.module.styl';

const { Title } = Typography;

const lineColors = ['#722ED1', '#33D1C9', '#F77234', '#165DFF'];

/** 数据概览：四项指标卡 + 折线图，数据由路由 loader 提供。 */
export default function DataOverview() {
  const { t } = useTranslation();
  const theme = useSettingsStore((s) => s.theme);
  const { overview } = useLoaderData<MultiDimensionLoaderData>();
  const loading = useNavigation().state !== 'idle';
  const overviewValues = overview.overviewData;
  const lineData = overview.chartData;

  const formattedData = useMemo(() => {
    return [
      {
        title: 'multiDAnalysis.dataOverview.contentProduction',
        icon: <EditOutlined />,
        value: overviewValues[0],
        // antd 预设色板 CSS 变量为完整色值（如 #ffe7ba），无需再包 rgb()
        // / antd preset palette CSS vars hold full color values (e.g. #ffe7ba), no rgb() wrapper
        background: 'var(--ant-orange-2)',
        color: 'var(--ant-orange-6)',
      },
      {
        title: 'multiDAnalysis.dataOverview.contentClicks',
        icon: <LikeOutlined />,
        value: overviewValues[1],
        background: 'var(--ant-cyan-2)',
        color: 'var(--ant-cyan-6)',
      },
      {
        title: 'multiDAnalysis.dataOverview.contextExposure',
        icon: <HeartOutlined />,
        value: overviewValues[2],
        background: 'var(--ant-color-primary-bg)',
        color: 'var(--ant-color-primary)',
      },
      {
        title: 'multiDAnalysis.dataOverview.activeUsers',
        icon: <UserOutlined />,
        value: overviewValues[3],
        background: 'var(--ant-purple-1)',
        color: 'var(--ant-purple-6)',
      },
    ];
  }, [overviewValues]);

  const lineSpec: LineConfig = {
    data: lineData,
    xField: 'time',
    yField: 'count',
    colorField: 'name',
    shapeField: 'smooth',
    stack: false,
    scale: {
      color: {
        range: lineColors,
      },
    },
    area: {
      style: {
        fillOpacity: 0.04,
        // fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
      },
    },
    style: {
      lineWidth: 2,
    },
    axis: {
      y: {
        labelFormatter: (v: number) => `${Number(v) / 100} k`,
        // gridStroke: '#cccccc',
        // gridLineWidth: 1,
        // gridStrokeOpacity: 1,
      },
      x: {
        labelAutoRotate: false,
      },
    },
    legend: false,
    // children: lineColors.map((n) => {
    //   return {
    //     type: 'area',
    //     style: {
    //       fill: 'linear-gradient(-90deg, white 0%, ' + n + ' 100%)',
    //     },
    //   };
    // }),
  };

  return (
    <Card variant="borderless" className="w-full">
      <Title level={5}>{t('multiDAnalysis.card.title.dataOverview')}</Title>
      <Row justify="space-between">
        {formattedData.map((item) => (
          <Col span={24 / formattedData.length} key={item.title}>
            <Card variant="borderless" className={styles['stat-item']}>
              <Title level={5}>{t(item.title)}</Title>
              <div className={styles.content}>
                <div
                  style={{ backgroundColor: item.background, color: item.color }}
                  className={styles['content-icon']}
                >
                  {item.icon}
                </div>
                <Skeleton
                  loading={loading}
                  active
                  paragraph={{ rows: 1, className: styles.skeleton }}
                  className="w-[120px]"
                >
                  <Statistic value={item.value ?? 0} groupSeparator="," />
                </Skeleton>
              </div>
            </Card>
          </Col>
        ))}
        <Col span={24}>
          <div className="h-[360px] chart-wrapper">
            <Line {...lineSpec} theme={theme} />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
