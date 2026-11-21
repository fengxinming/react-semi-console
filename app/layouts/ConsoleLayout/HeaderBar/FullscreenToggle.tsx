import { useState } from 'react';
import { IconMaximize, IconMinimize } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import screenfull from 'screenfull';
import IconButton from './IconButton';

export default function FullscreenToggle() {
  const { t } = useTranslation();
  const [isFull, setIsFull] = useState(false);

  const toggle = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFull((v) => !v);
    }
  };

  return (
    <IconButton
      icon={isFull ? <IconMinimize /> : <IconMaximize />}
      tooltip={t('common.fullscreen')}
      onClick={toggle}
    />
  );
}
