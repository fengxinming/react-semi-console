import { Button, Card, Typography, Space } from '@douyinfe/semi-ui';
import { IconArrowRight, IconStop, IconSync, IconPriceTag } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';

export default function QuickOperation() {
  const { t } = useTranslation();

  return (
    <Card bordered={false}>
      <Typography.Title heading={5}>{t('monitor.title.quickOperation')}</Typography.Title>
      <Space vertical className="w-full" spacing={10} style={{ alignItems: 'stretch' }}>
        <Button block icon={<IconPriceTag />}>
          {t('monitor.quickOperation.changeClarity')}
        </Button>
        <Button block icon={<IconSync />}>
          {t('monitor.quickOperation.switchStream')}
        </Button>
        <Button block icon={<IconStop />}>
          {t('monitor.quickOperation.removeClarity')}
        </Button>
        <Button block icon={<IconArrowRight />}>
          {t('monitor.quickOperation.pushFlowGasket')}
        </Button>
      </Space>
    </Card>
  );
}
