import { Row, Col, Card, Typography, Divider, Skeleton } from 'antd';
import { CalendarOutlined, FileOutlined, MessageOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { useSettingsStore, useUserStore } from '~/store';
import { Line } from '@ant-design/charts';
import styles from './style.module.styl';
import type { OverviewData } from '~/api/types';
import type { WorkplaceLoaderData, StatisticItemProps } from './types';

const { Title, Paragraph, Link } = Typography;

function StatisticItem({ icon, title, count, loading, unit }: StatisticItemProps) {
  return (
    <div className={styles['stat-item']}>
      <div className={styles['stat-icon']}>{icon}</div>
      <div>
        <Skeleton
          loading={loading}
          paragraph={{ rows: 2, width: ['54px', '54px'] }}
          title={false}
          active
        >
          <div className={styles['stat-title']}>{title}</div>
          <div className={styles['stat-count']}>
            {count}
            <span className={styles['stat-unit']}>{unit}</span>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

export default function Overview() {
  const { t } = useTranslation();
  const { overview = {} as OverviewData } = useLoaderData<WorkplaceLoaderData>();
  const loading = useNavigation().state !== 'idle';
  const user = useUserStore((s) => s.user);
  const userName = user?.name;

  const theme = useSettingsStore((s) => s.theme);
  const chartSpec = {
    data: overview.chartData ?? [],
    xField: 'date',
    yField: 'count',
    shapeField: 'smooth',
    axis: {
      y: {
        title: false,
        labelFormatter(text: string) {
          return `${Number(text) / 1000}k`;
        },
        grid: true, // 是否显示网格线
        gridLineWidth: 2, // 网格线宽度
        gridLineDash: [4, 4],
      },
      x: {
        labelAutoRotate: false,
        grid: true, // 是否显示网格线
        gridLineWidth: 2, // 网格线宽度
        gridLineDash: [4, 4],
      },
    },
    area: {
      style: {
        fill: 'linear-gradient(-90deg, white 0%, rgb(0, 112, 204) 100%)',
      },
    },
  };

  return (
    <Card variant="borderless">
      <Title level={5}>
        {t('workplace.welcomeBack')}, {userName}
      </Title>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem
            icon={<CalendarOutlined />}
            title={t('workplace.totalOnlyData')}
            count={overview.allContents}
            loading={loading}
            unit={t('workplace.pecs')}
          />
        </Col>
        <Divider orientation="vertical" />
        <Col flex={1}>
          <StatisticItem
            icon={<FileOutlined />}
            title={t('workplace.contentInMarket')}
            count={overview.liveContents}
            loading={loading}
            unit={t('workplace.pecs')}
          />
        </Col>
        <Divider orientation="vertical" />
        <Col flex={1}>
          <StatisticItem
            icon={<MessageOutlined />}
            title={t('workplace.comments')}
            count={overview.increaseComments}
            loading={loading}
            unit={t('workplace.pecs')}
          />
        </Col>
        <Divider orientation="vertical" />
        <Col flex={1}>
          <StatisticItem
            icon={<CaretUpOutlined />}
            title={t('workplace.growth')}
            count={
              <span>
                {overview.growthRate}{' '}
                <CaretUpOutlined className={styles['growth-icon']} />
              </span>
            }
            loading={loading}
          />
        </Col>
      </Row>
      <Divider />
      <div>
        <div className={styles['chart-header']}>
          <Paragraph className="text-[16px] font-medium">
            {t('workplace.contentData')}
            <span className={styles['chart-sub-title']}>({t('workplace.1year')})</span>
          </Paragraph>
          <Link>{t('workplace.seeMore')}</Link>
        </div>
        <div className="h-[300px] chart-wrapper">
          <Line {...chartSpec} theme={theme} />
        </div>
      </div>
    </Card>
  );
}
