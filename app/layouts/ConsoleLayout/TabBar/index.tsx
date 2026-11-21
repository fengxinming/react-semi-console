import { TabPane, Tabs } from '@douyinfe/semi-ui';
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

  const tabList = tabs.map((tab) => ({
    itemKey: tab.key,
    tab: t(tab.title) ?? tab.title,
    closable: tab.closable !== false,
  }));

  return (
    <div className={styles.tabbar}>
      <Tabs
        type="card"
        size="small"
        collapsible="auto"
        tabList={tabList}
        activeKey={activeKey}
        onChange={(key) => {
          setActive(key);
          navigate(key);
        }}
        onTabClose={(key) => {
          const nextKey = removeTab(key);
          if (nextKey) {
            navigate(nextKey);
          }
        }}
      >
        {tabs.map((tab) => (
          <TabPane key={tab.key} itemKey={tab.key} tab={t(tab.title) ?? tab.title} />
        ))}
      </Tabs>
    </div>
  );
}

export default memo(TabBar);
