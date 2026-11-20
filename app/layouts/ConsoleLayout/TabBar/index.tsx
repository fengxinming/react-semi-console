import { Tabs } from 'antd';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLayoutStore } from '~/store';
import styles from './style.module.styl';
import { memo } from 'react';

function TabBar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const tabs = useLayoutStore((s) => s.tabs);
  const activeKey = useLayoutStore((s) => s.activeKey);
  const removeTab = useLayoutStore((s) => s.removeTab);
  const setActive = useLayoutStore((s) => s.setActive);

  const items = tabs.map((tab) => ({
    key: tab.key,
    label: t(tab.title) ?? tab.title,
    closable: tab.closable !== false,
  }));

  return (
    <div className={styles.tabbar}>
      <Tabs
        type="editable-card"
        hideAdd
        size="small"
        items={items}
        activeKey={activeKey}
        onChange={(key) => {
          setActive(key);
          navigate(key);
        }}
        onEdit={(key, action) => {
          if (action === 'remove') {
            const nextKey = removeTab(key as string);
            if (nextKey) {
              navigate(nextKey);
            }
          }
        }}
      />
    </div>
  );
}

export default memo(TabBar);
