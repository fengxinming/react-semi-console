import type { ReactNode } from 'react';
import type { Per } from '~/commons/types';

interface MenuNode {
  name: string;
  path: string;
  icon?: ReactNode;
  visible?: boolean;
  // 访问该菜单所需权限，缺省表示无需权限（所有人可见）
  per?: Per[];
  // 为 true 时 per 满足其一即可，否则需全部满足
  perAny?: boolean;
}

export interface MenuLeaf extends MenuNode {
  view?: string | ReactNode;
}

export interface MenuBranch extends MenuNode {
  icon: ReactNode;
  children: MenuRoute[];
}

export type MenuRoute = MenuLeaf | MenuBranch;
