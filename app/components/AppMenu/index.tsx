import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useLayoutStore } from '~/store';
import type { MenuBranch, MenuLeaf, MenuRoute } from '~/config/types';
import type { AppMenuProps, MenuMode } from './types';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

// 只做渲染：可见性（visible）与权限已在菜单生成阶段（filterMenuByPerm）过滤完毕。
// / Rendering only: visibility (`visible`) and permissions are already filtered
// during menu generation (filterMenuByPerm).
function buildItems(list: MenuRoute[], mode: MenuMode, t: TFunction): MenuProps['items'] {
  return list.map((item) => {
    const { children } = item as MenuBranch;
    if (children) {
      return {
        key: item.name,
        icon: item.icon,
        label: <span>{t(item.name)}</span>,
        children: buildItems(children, mode, t) ?? [],
      };
    }
    const { path } = item as MenuLeaf;
    return {
      key: path,
      icon: item.icon,
      label: <span>{t(item.name)}</span>,
    };
  });
}

/**
 * 公共菜单组件，SiderNav（inline）和 HeaderBar/Logo（horizontal）共用。
 * 统一递归渲染 + i18n + icon，避免两处逻辑漂移。
 * / Shared menu component used by SiderNav (inline) and HeaderBar/Logo (horizontal);
 * unified recursive rendering + i18n + icons to keep both call sites in sync.
 */
export default function AppMenu({
  mode = 'inline',
  collapse,
  openKeys,
  onOpenKeysChange,
  className,
  menus: externalMenus,
}: AppMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const permissionMenus = useLayoutStore((s) => s.permissionMenu);
  const menus = externalMenus ?? permissionMenus;
  const { t } = useTranslation();

  return (
    <Menu
      className={className}
      mode={mode}
      inlineCollapsed={collapse}
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onClick={({ key }) => navigate(key)}
      onOpenChange={(keys) => onOpenKeysChange?.(keys)}
      items={buildItems(menus, mode, t)}
    />
  );
}
