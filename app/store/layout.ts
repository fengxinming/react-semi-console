import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LayoutUiState, NavMode, SettingsState } from './types';
import type { PermMap } from '~/commons/types';
import { menuRoutes } from '~/config/menu';
import { filterMenuByPerm, findMenuTrail } from '~/commons/layout';
import { setColorWeak, setLang, setTheme, setThemeColor } from '~/commons/html';
// 默认配置来自 settings.json，与 react-pro.arco.design 一致：
// 抽屉里"复制配置"得到的 JSON 可直接粘回本文件，从而真正作用于项目。
import defaultSettings from '../settings.json';
import type { MenuLeaf } from '~/config/types';

const HOME = '/dashboard/workplace';

export const useLayoutStore = create<LayoutUiState>((set, get) => {
  const currentURL = new URL('https://xxx.xxx');

  return {
    currentURL,
    collapsed: false,
    settingOpen: false,
    menuTrail: [],
    // 初始为空：菜单仅由 rebuildMenu 在「获取/变更权限」后填充，不在无权限时预先计算
    permissionMenu: [],
    tabs: [{ key: HOME, title: 'menu.dashboard.workplace', closable: false }],
    activeKey: HOME,

    setCurrentHref(v) {
      const prev = get();
      if (v === prev.currentURL.href) {
        return;
      }

      const newURL = new URL(v);
      set({ currentURL: newURL });
      prev.updateMenuTrail(newURL.pathname, prev.permissionMenu);
    },
    toggleCollapsed() {
      set((s) => ({ collapsed: !s.collapsed }));
    },
    openSetting() {
      set({ settingOpen: true });
    },
    closeSetting() {
      set({ settingOpen: false });
    },
    updateMenuTrail(pathname, menus) {
      const newMenuTrail = findMenuTrail(pathname, menus);
      const len = newMenuTrail.length;
      const prev = get();
      if (prev.menuTrail.length === len && len === 0) {
        return;
      }
      set({ menuTrail: newMenuTrail });
      if (len > 0) {
        const last = newMenuTrail[len - 1] as MenuLeaf;
        prev.addTab(last.path, last.name);
      }
    },
    // 获取/变更权限后重算可用菜单，避免每渲染 useMemo
    rebuildMenu(permissions: PermMap) {
      set({ permissionMenu: filterMenuByPerm(menuRoutes, permissions) });
      const prev = get();
      prev.updateMenuTrail(prev.currentURL.pathname, prev.permissionMenu);
    },

    // 设置活跃 tab:不在列表就加进去,返回 key
    setActive: (key) => {
      const s = get();
      if (key === s.activeKey) {
        return false;
      }
      set({ activeKey: key });
      return true;
    },

    addTab: (key: string, title: string) => {
      const s = get();
      const exists = s.tabs.some((t) => t.key === key);
      const tabs = exists ? s.tabs : s.tabs.concat({ key, title });
      set({ tabs, activeKey: key });
    },

    // 删除 tab:删的是当前页就直接算下一个活跃(右边补上/否则左边/否则 HOME),返回新 activeKey
    removeTab: (key) => {
      const s = get();
      const idx = s.tabs.findIndex((t) => t.key === key);
      if (idx === -1) {
        return s.activeKey;
      }
      const tabs = s.tabs.filter((t) => t.key !== key);
      const activeKey =
        s.activeKey === key ? (tabs[idx]?.key ?? tabs[idx - 1]?.key ?? HOME) : s.activeKey;
      set({ tabs, activeKey });
      return activeKey;
    },
  };
});

let subscribeSettings: () => void;
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeColor: defaultSettings.themeColor,
      colorWeak: defaultSettings.colorWeak,
      navbar: defaultSettings.navbar,
      menuWidth: defaultSettings.menuWidth,
      footer: defaultSettings.footer,
      menu: defaultSettings.menu,
      navMode: defaultSettings.navMode as NavMode,
      theme: 'light',
      lang: 'zh-CN',
      setSettings: (partial) => set(partial),
      toggleDark: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'react-antd-console-settings',
      // 持久化不在模块加载时自动还原，统一由 app/main.tsx 在挂载前一次性 rehydrate，
      // 保证主题/语言等 DOM 副作用在首屏渲染前就绪。
      skipHydration: true,
      onRehydrateStorage({ colorWeak, lang, theme, themeColor }) {
        setColorWeak(colorWeak);
        setLang(lang);
        setTheme(theme);
        setThemeColor(themeColor);

        if (typeof subscribeSettings === 'function') {
          subscribeSettings();
        }
        subscribeSettings = useSettingsStore.subscribe(
          ({ theme, colorWeak, themeColor, lang }, prevState) => {
            // 明暗模式：组件配色由 ConfigProvider 的 algorithm 驱动，这里只补 body[theme-mode] 标记，
            // 供 antd cssVar 作用域外的样式（charts tooltip 等）判断明暗。
            if (theme !== prevState.theme) {
              setTheme(theme);
            }

            // 主题色：同步到 body 上的 --app-color-primary，供 #nprogress 等 body 级样式使用
            if (themeColor !== prevState.themeColor) {
              setThemeColor(themeColor);
            }

            if (colorWeak !== prevState.colorWeak) {
              setColorWeak(colorWeak);
            }

            if (lang !== prevState.lang) {
              setLang(lang);
            }
          },
        );
      },
    },
  ),
);
