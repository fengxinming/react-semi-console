import { Card, Typography, Tag, Space, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';

export default function StudioStatus() {
  const { t } = useTranslation();

  const dataStatus = [
    {
      label: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.mainstream')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      children: '6 Mbps',
    },
    {
      label: t('monitor.studioStatus.frameRate'),
      children: '60',
    },
    {
      label: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.hotStandby')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      children: '6 Mbps',
    },
    {
      label: t('monitor.studioStatus.frameRate'),
      children: '60',
    },
    {
      label: (
        <span>
          <Typography.Text className="pr-[8px]">
            {t('monitor.studioStatus.coldStandby')}
          </Typography.Text>
          {t('monitor.studioStatus.bitRate')}
        </span>
      ),
      children: '6 Mbps',
    },
    {
      label: t('monitor.studioStatus.frameRate'),
      children: '60',
    },
  ];

  const dataPicture = [
    { label: t('monitor.studioStatus.line'), children: '热备' },
    { label: 'CDN', children: 'KS' },
    { label: t('monitor.studioStatus.play'), children: 'FLV' },
    { label: t('monitor.studioStatus.pictureQuality'), children: '原画' },
  ];

  return (
    <Card variant="borderless">
      <Space align="start">
        <Typography.Title level={5}>
          {t('monitor.studioStatus.title.studioStatus')}
        </Typography.Title>
        <Tag color="green">{t('monitor.studioStatus.smooth')}</Tag>
      </Space>
      <Descriptions layout="horizontal" items={dataStatus} column={2} />
      <Typography.Title className="!mt-[24px]" level={5}>
        {t('monitor.studioStatus.title.pictureInfo')}
      </Typography.Title>
      <Descriptions layout="horizontal" items={dataPicture} column={2} />
    </Card>
  );
}
