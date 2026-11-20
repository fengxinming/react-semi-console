import { createElement, isValidElement } from 'react';
import type { ComponentType } from 'react';
import type { LoaderFunction, RouteObject } from 'react-router';
import { Navigate } from 'react-router';
import { menuRoutes } from './config/menu';
import type { MenuBranch, MenuLeaf, MenuRoute } from './config/types';
import { useLayoutStore, useUserStore } from '~/store';
import ConsoleLayout from '~/layouts/ConsoleLayout';
import App from './App';
import HydrateFallback from '~/components/HydrateFallback';
import ErrorBoundary from '~/components/ErrorBoundary';
import Exception404 from '~/components/404';
import { fetchUser } from './api/user';

// 菜单里的 view 是相对 app/ 的路径字符串，借 Vite 模块表解析成按需加载的页面模块，
// 免去手写几十条 import；menu.tsx 仍是路由的唯一数据源。
const pageModules = import.meta.glob<{
  default: ComponentType;
  loader?: LoaderFunction;
}>('./routes/**/index.tsx');

function lazyView(view: string) {
  const load = pageModules[`./${view}`];
  if (!load) {
    throw new Error(`[routes] 未找到页面模块: ${view}`);
  }
  return async () => {
    const mod = await load();
    return { Component: mod.default, loader: mod.loader };
  };
}

function buildMenuRoutes(menus: MenuRoute[], routes: RouteObject[]): RouteObject[] {
  for (const menu of menus) {
    const { children } = menu as MenuBranch;
    if (!children) {
      const { path, view } = menu as MenuLeaf;
      if (view) {
        const route: RouteObject = {
          path: path.slice(1),
          hydrateFallbackElement: createElement(HydrateFallback),
        };
        if (typeof view === 'string') {
          route.lazy = lazyView(view);
        } else if (isValidElement(view)) {
          route.element = view;
        }
        routes.push(route);
      }
      continue;
    }
    buildMenuRoutes(children, routes);
  }
  return routes;
}

export const routes: RouteObject[] = [
  {
    Component: App,
    errorElement: createElement(ErrorBoundary),
    hydrateFallbackElement: createElement(HydrateFallback),
    children: [
      {
        path: 'login',
        lazy: lazyView('routes/login/index.tsx'),
        hydrateFallbackElement: createElement(HydrateFallback),
      },
      {
        path: 'register',
        lazy: lazyView('routes/register/index.tsx'),
        hydrateFallbackElement: createElement(HydrateFallback),
      },
      {
        index: true,
        Component: () => createElement(Navigate, { to: '/dashboard/workplace', replace: true }),
        hydrateFallbackElement: createElement(HydrateFallback),
      },
      {
        Component: ConsoleLayout,
        // 导航前写回 URL，
        // 由 store 内部完成 menuTrail 计算与 tab 写入，首屏不会先闪一次空菜单。
        async loader() {
          // 登录态自助：token 存在且 store 尚无用户数据，则拉取一次写回 store；
          // 后续渲染全部从 store 读取，避免刷新/路由切换重复请求 /user/info。
          const { token, user, setUser } = useUserStore.getState();
          if (token && !user) {
            const full = await fetchUser();
            setUser(full);
          }

          return null;
        },
        middleware: [
          async ({ request }, next) => {
            await next();
            useLayoutStore.getState().setCurrentHref(request.url);
          },
        ],
        hydrateFallbackElement: createElement(HydrateFallback),
        children: buildMenuRoutes(menuRoutes, [
          {
            // 显式 id 供 ConsoleLayout 识别「未匹配任何菜单」的路径，
            // 避免权限守卫把 404 误判成 403。
            id: 'not-found',
            path: '*',
            element: createElement(Exception404),
          },
        ]),
      },
    ],
  },
];
