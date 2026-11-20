import { Card, Typography, Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';

export default function StudioInformation() {
  const { t } = useTranslation();
  const user = useUserStore((s) => s.user);

  return (
    <Card variant="borderless">
      <Typography.Title level={5}>{t('monitor.title.studioInfo')}</Typography.Title>
      <Form layout="vertical">
        <Form.Item label={t('monitor.studioInfo.label.studioTitle')} required>
          <Input
            placeholder={`${user?.name ?? 'admin'}${t('monitor.studioInfo.placeholder.studioTitle')}`}
          />
        </Form.Item>
        <Form.Item label={t('monitor.studioInfo.label.onlineNotification')} required>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={t('monitor.studioInfo.label.studioCategory')} required>
          <Input.Search />
        </Form.Item>
        <Form.Item label={t('monitor.studioInfo.label.studioCategory')} required>
          <Input.Search />
        </Form.Item>
      </Form>
      <Button type="primary">{t('monitor.chat.update')}</Button>
    </Card>
  );
}
