import { Dropdown, Toast } from '@douyinfe/semi-ui';
import type { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown';
import { IconGlobe } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import IconButton from './IconButton';
import type { Language } from '~/store/types';

export default function LangSelect() {
  const { t } = useTranslation();
  const language = useSettingsStore((s) => s.lang);
  const setSettings = useSettingsStore((s) => s.setSettings);

  const select = (lang: Language) => {
    setSettings({ lang });
    Toast.info({ content: t('settings.language.tip') });
  };

  const menu: DropDownMenuItem[] = [
    { node: 'item', name: '中文', selected: language === 'zh-CN', onClick: () => select('zh-CN') },
    {
      node: 'item',
      name: 'English',
      selected: language === 'en-US',
      onClick: () => select('en-US'),
    },
  ];

  return (
    <Dropdown trigger="hover" showTick menu={menu}>
      <IconButton icon={<IconGlobe />} />
    </Dropdown>
  );
}
