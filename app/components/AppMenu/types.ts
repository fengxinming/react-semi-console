import type { NavProps } from '@douyinfe/semi-ui/lib/es/navigation';
import type { MenuRoute } from '~/config/types';

/** 菜单排列模式：直接复用 Semi Nav 的 mode（vertical=侧边展开，horizontal=顶部）
 *  / Menu mode: reuse Semi `Nav`'s own mode (vertical = sider, horizontal = top bar) */
export type MenuMode = NonNullable<NavProps['mode']>;

export interface AppMenuProps {
  /** 排列模式，直接透传给 Semi Nav / Passed straight through to Semi Nav */
  mode?: MenuMode;
  /** 折叠状态（vertical 模式）/ Collapsed state (vertical mode) */
  collapse?: boolean;
  /** 展开的子菜单 key（vertical 模式）/ Expanded submenu keys (vertical mode) */
  openKeys?: string[];
  /** 展开子菜单回调 / Callback when submenu open state changes */
  onOpenKeysChange?: (keys: string[]) => void;
  className?: string;
  /** 菜单数据源，缺省用 layout store 的 permissionMenu（已按权限与 visible 过滤）
   *  / Menu data source; defaults to the layout store's permissionMenu
   *  (already filtered by permission and `visible`) */
  menus?: MenuRoute[];
}
