import { useQuery } from '@tanstack/react-query';
import { Card, Skeleton, Tag, Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';
import { fetchAnnouncement, dashboardKeys } from '~/api/dashboard';

function getTagColor(type: string) {
  switch (type) {
    case 'activity':
      return 'orange';
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
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title heading={5}>{t('workplace.announcement')}</Typography.Title>
        <Typography.Text link>{t('workplace.seeMore')}</Typography.Text>
      </div>
      <Skeleton
        loading={loading}
        active
        placeholder={<Skeleton.Paragraph rows={5} style={{ width: '100%' }} />}
      >
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
