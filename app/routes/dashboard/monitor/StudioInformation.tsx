import { Card, Typography, Form, Button } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';

export default function StudioInformation() {
  const { t } = useTranslation();
  const user = useUserStore((s) => s.user);

  return (
    <Card bordered={false}>
      <Typography.Title heading={5}>{t('monitor.title.studioInfo')}</Typography.Title>
      <Form layout="vertical">
        <Form.Input
          field="studioTitle"
          label={t('monitor.studioInfo.label.studioTitle')}
          placeholder={`${user?.name ?? 'admin'}${t('monitor.studioInfo.placeholder.studioTitle')}`}
          rules={[{ required: true }]}
        />
        <Form.TextArea
          field="onlineNotification"
          label={t('monitor.studioInfo.label.onlineNotification')}
          rules={[{ required: true }]}
        />
        <Form.Input
          field="studioCategory"
          label={t('monitor.studioInfo.label.studioCategory')}
          suffix={<IconSearch />}
          rules={[{ required: true }]}
        />
        <Form.Input
          field="studioCategory2"
          label={t('monitor.studioInfo.label.studioCategory')}
          suffix={<IconSearch />}
          rules={[{ required: true }]}
        />
      </Form>
      <Button type="primary" theme="solid">{t('monitor.chat.update')}</Button>
    </Card>
  );
}
