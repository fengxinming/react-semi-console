import { Button, Card, Typography, Space } from 'antd';
import { ArrowRightOutlined, StopOutlined, SwapOutlined, TagsOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function QuickOperation() {
  const { t } = useTranslation();

  return (
    <Card variant="borderless">
      <Typography.Title level={5}>{t('monitor.title.quickOperation')}</Typography.Title>
      <Space orientation="vertical" className="w-full" size={10}>
        <Button block icon={<TagsOutlined />}>
          {t('monitor.quickOperation.changeClarity')}
        </Button>
        <Button block icon={<SwapOutlined />}>
          {t('monitor.quickOperation.switchStream')}
        </Button>
        <Button block icon={<StopOutlined />}>
          {t('monitor.quickOperation.removeClarity')}
        </Button>
        <Button block icon={<ArrowRightOutlined />}>
          {t('monitor.quickOperation.pushFlowGasket')}
        </Button>
      </Space>
    </Card>
  );
}
