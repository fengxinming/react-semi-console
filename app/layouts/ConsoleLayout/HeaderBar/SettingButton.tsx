import { SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useLayoutStore } from '~/store';
import IconButton from './IconButton';

export default function SettingButton() {
  const { t } = useTranslation();
  const openSetting = useLayoutStore((s) => s.openSetting);

  return <IconButton icon={<SettingOutlined />} tooltip={t('settings.title')} onClick={openSetting} />;
}
