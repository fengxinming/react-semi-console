import { Layout } from '@douyinfe/semi-ui';
import { IconChevronLeft, IconChevronRight } from '@douyinfe/semi-icons';
import { useSettingsStore, useLayoutStore } from '~/store';
import AppMenu from '~/components/AppMenu';

import { memo } from 'react';
import styles from './style.module.styl';
import type { SiderNavProps } from './types';
import classNames from 'classnames';

const { Sider } = Layout;

function handleOpenKeysChange(openKeys: string[]) {
  useLayoutStore.setState({ openKeys });
}

function SiderNav({ className, style }: SiderNavProps = {}) {
  const menuWidth = useSettingsStore((s) => s.menuWidth);
  const collapsed = useLayoutStore((s) => s.collapsed);
  const toggleCollapsed = useLayoutStore((s) => s.toggleCollapsed);
  const openKeys = useLayoutStore((s) => s.openKeys);
  const actualWidth = collapsed ? 48 : menuWidth;

  return (
    // Semi Sider 无 width/collapsed/collapsible/trigger/breakpoint，宽度改由 style 控制。
    // / Semi Sider has no width/collapsed/collapsible/trigger/breakpoint; control width via style.
    <Sider
      className={classNames(styles['layout-sider'], className)}
      style={{ ...style, width: actualWidth }}
    >
      <div className={styles['menu-wrapper']}>
        <AppMenu
          mode="vertical"
          collapse={collapsed}
          openKeys={openKeys}
          onOpenKeysChange={handleOpenKeysChange}
        />
      </div>
      <div className={styles['collapse-btn']} onClick={toggleCollapsed}>
        {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
      </div>
    </Sider>
  );
}

export default memo(SiderNav);
