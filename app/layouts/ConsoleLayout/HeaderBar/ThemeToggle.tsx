import { MoonFilled, SunFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import IconButton from './IconButton';

export default function ThemeToggle() {
  const { t } = useTranslation();
  const isDark = useSettingsStore((s) => s.theme === 'dark');
  const toggleDark = useSettingsStore((s) => s.toggleDark);

  return (
    <IconButton
      icon={isDark ? <SunFilled /> : <MoonFilled />}
      tooltip={t(isDark ? 'settings.navbar.theme.toLight' : 'settings.navbar.theme.toDark')}
      onClick={toggleDark}
    />
  );
}
