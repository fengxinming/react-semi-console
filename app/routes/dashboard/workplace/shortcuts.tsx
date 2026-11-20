import { App, Card, Divider, Typography } from 'antd';
import {
  FileOutlined,
  DatabaseOutlined,
  SettingOutlined,
  MobileOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Shortcuts() {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const shortcuts = [
    { title: t('workplace.contentMgmt'), key: 'Content Management', icon: <FileOutlined /> },
    { title: t('workplace.contentStatistic'), key: 'Content Statistic', icon: <DatabaseOutlined /> },
    { title: t('workplace.advancedMgmt'), key: 'Advanced Management', icon: <SettingOutlined /> },
    { title: t('workplace.onlinePromotion'), key: 'Online Promotion', icon: <MobileOutlined /> },
    { title: t('workplace.marketing'), key: 'Marketing', icon: <FireOutlined /> },
  ];

  const recentShortcuts = [
    { title: t('workplace.contentStatistic'), key: 'Content Statistic', icon: <DatabaseOutlined /> },
    { title: t('workplace.contentMgmt'), key: 'Content Management', icon: <FileOutlined /> },
    { title: t('workplace.advancedMgmt'), key: 'Advanced Management', icon: <SettingOutlined /> },
  ];

  function onClickShortcut(key: string) {
    message.info(`You clicked ${key}`);
  }

  return (
    <Card variant="borderless">
      <div className="flex justify-between">
        <Typography.Title level={5}>{t('workplace.shortcuts')}</Typography.Title>
        <Typography.Link>{t('workplace.seeMore')}</Typography.Link>
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
      <Typography.Title level={5}>{t('workplace.recent')}</Typography.Title>
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
