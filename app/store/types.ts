import type { PermMap } from '~/commons/types';
import type { MenuRoute } from '~/config/types';

export interface LayoutUiState {
  currentURL: URL;
  collapsed: boolean;
  settingOpen: boolean;
  menuTrail: MenuRoute[];
  /** 按当前权限过滤后的可用菜单，由 rebuildMenu 重算（不再每渲染 useMemo） */
  permissionMenu: MenuRoute[];
  tabs: TabItem[];
  activeKey: string;
  openKeys: string[];

  setCurrentHref: (v: string) => void;
  toggleCollapsed: () => void;
  openSetting: () => void;
  closeSetting: () => void;
  updateMenuTrail: (pathname: string, menus: MenuRoute[]) => void;
  /** 获取/变更权限后调用，用最新 permissions 重算 available 菜单 */
  rebuildMenu: (permissions: PermMap) => void;
  setActive: (key: string, title?: string) => boolean;
  addTab: (key: string, title: string) => void;
  removeTab: (key: string) => string;
}

export type Language = 'zh-CN' | 'en-US';
export type NavMode = 'inline' | 'horizontal';
export type Theme = 'light' | 'dark';

export interface SettingsState {
  themeColor: string;
  colorWeak: boolean;
  navbar: boolean;
  menuWidth: number;
  footer: boolean;
  menu: boolean;
  navMode: NavMode;
  theme: Theme;
  lang: Language;
  setSettings: (partial: Partial<SettingsState>) => void;
  toggleDark: () => void;
}

export interface TabItem {
  key: string;
  title: string;
  closable?: boolean;
}

/** 纯用户资料（不含身份/权限），与 role/permissions 严格分离 */
export interface UserInfo {
  name?: string;
  avatar?: string;
  email?: string;
  jobName?: string;
  organizationName?: string;
  locationName?: string;
  accountId?: string;
  phoneNumber?: string;
  registrationTime?: string;
  verified?: boolean;
}

export type UserRole = 'admin' | 'user';

/** 用户全量数据：资料 + 身份（role/permissions），由 /user/info 单一来源提供 */
export interface UserFullData {
  user: UserInfo;
  role: UserRole;
  permissions: PermMap;
}

export interface UserState {
  /** 唯一持久化项（localStorage），用户信息不落地，靠 token 重新拉取 */
  token: string;
  /** 当前登录用户资料（从 store 读取，不持久化） */
  user: UserInfo | null;
  /** 当前角色（仅 'admin' / 'user'） */
  role: UserRole;
  /** 当前权限表 */
  permissions: PermMap;
  setToken: (token: string) => void;
  /** 登录/刷新后写入用户全量数据，并触发菜单重算 */
  setUser: (full: UserFullData) => void;
  /** 角色切换：更新 role/permissions，并触发菜单重算 */
  setRole: (role: UserRole, permissions: PermMap) => void;
  logout: () => void;
}
