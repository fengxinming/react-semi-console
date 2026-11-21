import { IconMoon, IconSun } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import IconButton from './IconButton';

export default function ThemeToggle() {
  const { t } = useTranslation();
  const isDark = useSettingsStore((s) => s.theme === 'dark');
  const toggleDark = useSettingsStore((s) => s.toggleDark);

  return (
    <IconButton
      icon={isDark ? <IconSun /> : <IconMoon />}
      tooltip={t(isDark ? 'settings.navbar.theme.toLight' : 'settings.navbar.theme.toDark')}
      onClick={toggleDark}
    />
  );
}
