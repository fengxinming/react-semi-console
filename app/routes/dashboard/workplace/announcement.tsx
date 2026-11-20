import { useQuery } from '@tanstack/react-query';
import { Card, Skeleton, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';
import { fetchAnnouncement, dashboardKeys } from '~/api/dashboard';

function getTagColor(type: string) {
  switch (type) {
    case 'activity':
      return 'volcano';
    case 'info':
      return 'cyan';
    case 'notice':
      return 'blue';
    default:
      return 'blue';
  }
}

/** 公告：10s 轮询拉取 announcement */
export default function Announcement() {
  const { t } = useTranslation();
  const { data = [], isLoading: loading } = useQuery({
    queryKey: dashboardKeys.announcement,
    queryFn: fetchAnnouncement,
    refetchInterval: 10000,
  });

  return (
    <Card variant="borderless">
      <div className="flex justify-between">
        <Typography.Title level={5}>{t('workplace.announcement')}</Typography.Title>
        <Typography.Link>{t('workplace.seeMore')}</Typography.Link>
      </div>
      <Skeleton loading={loading} paragraph={{ rows: 5, width: '100%' }} title={false} active>
        <div>
          {data.map((d) => (
            <div key={d.key} className={styles['announcement-item']}>
              <Tag color={getTagColor(d.type)}>
                {t(`workplace.${d.type}`)}
              </Tag>
              <span className={styles['announcement-text']}>{d.content}</span>
            </div>
          ))}
        </div>
      </Skeleton>
    </Card>
  );
}
