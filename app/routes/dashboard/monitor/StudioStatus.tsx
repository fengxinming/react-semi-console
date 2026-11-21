import { Card, Typography, Tag, Space, Descriptions } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';

export default function StudioStatus() {
  const { t } = useTranslation();

  const dataStatus = [
    {
      key: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.mainstream')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      key: t('monitor.studioStatus.frameRate'),
      value: '60',
    },
    {
      key: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.hotStandby')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      key: t('monitor.studioStatus.frameRate'),
      value: '60',
    },
    {
      key: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.coldStandby')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      value: '6 Mbps',
    },
    {
      key: t('monitor.studioStatus.frameRate'),
      value: '60',
    },
  ];

  const dataPicture = [
    { key: t('monitor.studioStatus.line'), value: '热备' },
    { key: 'CDN', value: 'KS' },
    { key: t('monitor.studioStatus.play'), value: 'FLV' },
    { key: t('monitor.studioStatus.pictureQuality'), value: '原画' },
  ];

  return (
    <Card bordered={false}>
      <Space align="start">
        <Typography.Title heading={5}>
          {t('monitor.studioStatus.title.studioStatus')}
        </Typography.Title>
        <Tag color="green">{t('monitor.studioStatus.smooth')}</Tag>
      </Space>
      <Descriptions layout="horizontal" data={dataStatus} column={2} />
      <Typography.Title className="!mt-[24px]" heading={5}>
        {t('monitor.studioStatus.title.pictureInfo')}
      </Typography.Title>
      <Descriptions layout="horizontal" data={dataPicture} column={2} />
    </Card>
  );
}
