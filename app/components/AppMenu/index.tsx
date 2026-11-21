import { Nav } from '@douyinfe/semi-ui';
import type { NavItems } from '@douyinfe/semi-ui/lib/es/navigation';
import { useLocation, useNavigate } from 'react-router';
import { useLayoutStore } from '~/store';
import type { MenuBranch, MenuLeaf, MenuRoute } from '~/config/types';
import type { AppMenuProps, MenuMode } from './types';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

// 只做渲染：可见性（visible）与权限已在菜单生成阶段（filterMenuByPerm）过滤完毕。
// / Rendering only: visibility (`visible`) and permissions are already filtered
// during menu generation (filterMenuByPerm).
function buildItems(list: MenuRoute[], mode: MenuMode, t: TFunction): NavItems {
  return list.map((item) => {
    const { children } = item as MenuBranch;
    if (children) {
      return {
        itemKey: item.name,
        icon: item.icon,
        text: <span>{t(item.name)}</span>,
        items: buildItems(children, mode, t) ?? [],
      };
    }
    const { path } = item as MenuLeaf;
    return {
      itemKey: path,
      icon: item.icon,
      text: <span>{t(item.name)}</span>,
    };
  });
}

/**
 * 公共菜单组件，SiderNav（vertical）和 HeaderBar/Logo（horizontal）共用。
 * 统一递归渲染 + i18n + icon，避免两处逻辑漂移。
 * / Shared menu component used by SiderNav (vertical) and HeaderBar/Logo (horizontal);
 * unified recursive rendering + i18n + icons to keep both call sites in sync.
 */
export default function AppMenu({
  mode = 'vertical',
  collapse,
  openKeys,
  onOpenKeysChange,
  className,
  menus: externalMenus,
}: AppMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const permissionMenus = useLayoutStore((s) => s.permissionMenu);
  const toggleCollapsed = useLayoutStore((s) => s.toggleCollapsed);
  const menus = externalMenus ?? permissionMenus;
  const { t } = useTranslation();

  return (
    <Nav
      className={className}
      mode={mode}
      isCollapsed={collapse}
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onSelect={(data) => navigate(String(data.itemKey))}
      onOpenChange={(data) => onOpenKeysChange?.(data.openKeys?.map(String) ?? [])}
      items={buildItems(menus, mode, t)}
      footer={{
        collapseButton: true,
        onClick: toggleCollapsed,
      }}
    />
  );
}
