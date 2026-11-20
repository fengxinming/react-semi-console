import type { MenuProps } from 'antd';
import type { MenuRoute } from '~/config/types';

/** 菜单排列模式：直接复用 antd Menu 的 mode（inline=侧边内联展开，horizontal=顶部）
 *  / Menu mode: reuse antd `Menu`'s own mode (inline = sider with inline submenus,
 *  horizontal = top bar) */
export type MenuMode = NonNullable<MenuProps['mode']>;

export interface AppMenuProps {
  /** 排列模式，直接透传给 antd Menu / Passed straight through to antd Menu */
  mode?: MenuMode;
  /** 折叠状态（inline 模式）/ Collapsed state (inline mode) */
  collapse?: boolean;
  /** 展开的子菜单 key（inline 模式）/ Expanded submenu keys (inline mode) */
  openKeys?: string[];
  /** 展开子菜单回调 / Callback when submenu open state changes */
  onOpenKeysChange?: (keys: string[]) => void;
  className?: string;
  /** 菜单数据源，缺省用 layout store 的 permissionMenu（已按权限与 visible 过滤）
   *  / Menu data source; defaults to the layout store's permissionMenu
   *  (already filtered by permission and `visible`) */
  menus?: MenuRoute[];
}
