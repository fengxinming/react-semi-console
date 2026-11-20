import { useState } from 'react';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
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
      icon={isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      tooltip={t('common.fullscreen')}
      onClick={toggle}
    />
  );
}
