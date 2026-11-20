import { Breadcrumb } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLayoutStore } from '~/store';

function BreadcrumbNav() {
  const { t } = useTranslation();
  const menuTrail = useLayoutStore((s) => s.menuTrail);
  const icon = menuTrail[0]?.icon;

  // antd v6 已废弃 Breadcrumb.Item / Breadcrumb.Separator（控制台会报 deprecated），
  // 统一改用 items 数据驱动 API；首项仍是「图标」面包屑，分隔符交给 antd 默认渲染。
  // / antd v6 deprecates Breadcrumb.Item / Breadcrumb.Separator (logs a deprecation warning);
  // switch to the `items` API. The first crumb stays the icon-only entry.
  const items = [
    ...(icon ? [{ key: menuTrail[0]?.name, title: icon }] : []),
    ...menuTrail.map(({ name, path }) => ({ key: path, title: t(name) || name })),
  ];

  return (
    <div className="py-[16px]">
      <Breadcrumb items={items} />
    </div>
  );
}

export default memo(BreadcrumbNav);
