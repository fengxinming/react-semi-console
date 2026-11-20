import { App, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import IconButton from './IconButton';
import type { Language } from '~/store/types';

export default function LangSelect() {
  const { t } = useTranslation();
  const language = useSettingsStore((s) => s.lang);
  const setSettings = useSettingsStore((s) => s.setSettings);
  const { message } = App.useApp();

  const items = [
    {
      key: 'zh-CN',
      label: '中文',
    },
    {
      key: 'en-US',
      label: 'English',
    },
  ];

  return (
    <Dropdown
      trigger={['hover']}
      menu={{
        items,
        selectable: true,
        selectedKeys: [language],
        onClick: ({ key }) => {
          setSettings({ lang: key as Language });
          message.info(t('settings.language.tip'));
        },
      }}
    >
      <IconButton icon={<GlobalOutlined />} />
    </Dropdown>
  );
}
