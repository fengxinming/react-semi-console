import { Card, Divider, Typography, Toast } from '@douyinfe/semi-ui';
import {
  IconFile,
  IconServer,
  IconSetting,
  IconSmartphoneStroked,
  IconBolt,
} from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Shortcuts() {
  const { t } = useTranslation();

  const shortcuts = [
    { title: t('workplace.contentMgmt'), key: 'Content Management', icon: <IconFile /> },
    { title: t('workplace.contentStatistic'), key: 'Content Statistic', icon: <IconServer /> },
    { title: t('workplace.advancedMgmt'), key: 'Advanced Management', icon: <IconSetting /> },
    { title: t('workplace.onlinePromotion'), key: 'Online Promotion', icon: <IconSmartphoneStroked /> },
    { title: t('workplace.marketing'), key: 'Marketing', icon: <IconBolt /> },
  ];

  const recentShortcuts = [
    { title: t('workplace.contentStatistic'), key: 'Content Statistic', icon: <IconServer /> },
    { title: t('workplace.contentMgmt'), key: 'Content Management', icon: <IconFile /> },
    { title: t('workplace.advancedMgmt'), key: 'Advanced Management', icon: <IconSetting /> },
  ];

  function onClickShortcut(key: string) {
    Toast.info({ content: `You clicked ${key}` });
  }

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title heading={5}>{t('workplace.shortcuts')}</Typography.Title>
        <Typography.Text link>{t('workplace.seeMore')}</Typography.Text>
      </div>
      <div className={styles['shortcut-list']}>
        {shortcuts.map((s) => (
          <div
            key={s.key}
            className={styles['shortcut-item']}
            onClick={() => onClickShortcut(s.key)}
          >
            <div className={styles['shortcut-icon']}>{s.icon}</div>
            <div className={styles['shortcut-title']}>{s.title}</div>
          </div>
        ))}
      </div>
      <Divider />
      <Typography.Title heading={5}>{t('workplace.recent')}</Typography.Title>
      <div className={styles['shortcut-list']}>
        {recentShortcuts.map((s) => (
          <div
            key={s.key}
            className={styles['shortcut-item']}
            onClick={() => onClickShortcut(s.key)}
          >
            <div className={styles['shortcut-icon']}>{s.icon}</div>
            <div className={styles['shortcut-title']}>{s.title}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
