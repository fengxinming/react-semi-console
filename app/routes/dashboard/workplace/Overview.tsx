import { Row, Col, Card, Typography, Divider, Skeleton } from '@douyinfe/semi-ui';
import { IconCalendar, IconFile, IconComment, IconCaretup } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { VChart } from '@visactor/react-vchart';
import { useSettingsStore, useUserStore } from '~/store';
import { makeSpec } from '~/commons/vchart';
import styles from './style.module.styl';
import type { OverviewData } from '~/api/types';
import type { WorkplaceLoaderData, StatisticItemProps } from './types';

const { Title, Paragraph, Text } = Typography;

function StatisticItem({ icon, title, count, loading, unit }: StatisticItemProps) {
  return (
    <div className={styles['stat-item']}>
      <div className={styles['stat-icon']}>{icon}</div>
      <div>
        <Skeleton loading={loading} active>
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
  const chartSpec = makeSpec(
    {
      type: 'area',
      data: [{ id: 'workplace', values: overview.chartData ?? [] }],
      xField: 'date',
      yField: 'count',
      line: { style: { curveType: 'monotone' } },
      area: {
        style: {
          fill: {
            gradient: 'linear',
            x0: 0,
            y0: 1,
            x1: 0,
            y1: 0,
            stops: [
              { offset: 0, color: 'rgb(0, 112, 204)' },
              { offset: 1, color: 'white' },
            ],
          },
        },
      },
      axes: [
        {
          orient: 'bottom',
          type: 'band',
          label: { autoRotate: false },
          grid: { visible: true, style: { lineWidth: 2, lineDash: [4, 4] } },
        },
        {
          orient: 'left',
          type: 'linear',
          title: { visible: false },
          label: { formatMethod: (text: string) => `${Number(text) / 1000}k` },
          grid: { visible: true, style: { lineWidth: 2, lineDash: [4, 4] } },
        },
      ],
    },
    theme,
  );

  return (
    <Card bordered={false}>
      <Title heading={5}>
        {t('workplace.welcomeBack')}, {userName}
      </Title>
      <Divider />
      <Row>
        <Col span={6} className={styles['stat-col']}>
          <StatisticItem
            icon={<IconCalendar />}
            title={t('workplace.totalOnlyData')}
            count={overview.allContents}
            loading={loading}
            unit={t('workplace.pecs')}
          />
        </Col>
        <Col span={6} className={styles['stat-col']}>
          <StatisticItem
            icon={<IconFile />}
            title={t('workplace.contentInMarket')}
            count={overview.liveContents}
            loading={loading}
            unit={t('workplace.pecs')}
          />
        </Col>
        <Col span={6} className={styles['stat-col']}>
          <StatisticItem
            icon={<IconComment />}
            title={t('workplace.comments')}
            count={overview.increaseComments}
            loading={loading}
            unit={t('workplace.pecs')}
          />
        </Col>
        <Col span={6} className={styles['stat-col']}>
          <StatisticItem
            icon={<IconCaretup />}
            title={t('workplace.growth')}
            count={
              <span>
                {overview.growthRate} <IconCaretup className={styles['growth-icon']} />
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
          <Text link>{t('workplace.seeMore')}</Text>
        </div>
        <div className="h-[300px] chart-wrapper">
          <VChart spec={chartSpec} />
        </div>
      </div>
    </Card>
  );
}
