import { Breadcrumb } from '@douyinfe/semi-ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLayoutStore } from '~/store';

function BreadcrumbNav() {
  const { t } = useTranslation();
  const menuTrail = useLayoutStore((s) => s.menuTrail);
  const icon = menuTrail[0]?.icon;

  // Semi Breadcrumb 用 routes 数据驱动；首项仍是「图标」面包屑，分隔符交给 Semi 默认渲染。
  // / Semi Breadcrumb uses the `routes` data-driven API; the first crumb stays the
  // icon-only entry, separators are rendered by Semi by default.
  const routes = [
    ...(icon ? [{ name: '', path: menuTrail[0]?.name, icon }] : []),
    ...menuTrail.map(({ name, path }) => ({ name: t(name) || name, path })),
  ];

  return (
    <div className="py-[8px]">
      <Breadcrumb routes={routes} />
    </div>
  );
}

export default memo(BreadcrumbNav);
