# react-antd-console

基于 React 19 + React Router 8（Library 模式，纯客户端 SPA）+ Ant Design 6 的中后台管理模板。界面与功能参考 [Arco Design Pro](https://react-pro.arco.design/)。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 19 + React Router 8（Library 模式 / createBrowserRouter，纯 SPA，无 SSR、无服务端产物） |
| 构建 | Vite 8（`@vitejs/plugin-react`），产物 `dist/` 仅静态文件；`base` 默认为 `/${pkg.name}/`（即 `/react-antd-console/`），可用 `BASE_URL` 环境变量覆盖 |
| UI | `antd` 6（ConfigProvider + cssVar 主题，暗色走 `darkAlgorithm`）+ `@ant-design/icons`；样式 Stylus module + Tailwind v4 |
| 图表 / 配色 | `@ant-design/charts` + `@ant-design/colors` |
| 状态 | Zustand（persist）+ `@tanstack/react-query` |
| 请求 | axios（`app/commons/request.ts` 统一封装拦截） |
| i18n | i18next + react-i18next |
| Mock | `vite-plugin-mock-data`（`mock/` 目录） |
| 开发插件 | `vite-plugin-devtools-json`（生成 devtools.json） |
| 质量 | TypeScript、oxlint、oxfmt |

## 快速开始

```bash
pnpm install
pnpm dev        # 默认端口 5173；因 base 默认带 /react-antd-console/，访问路径以终端输出为准（BASE_URL 可覆盖）
```

登录密码统一为 `admin`：账号填 `user` 登录为普通权限，其他任意账号为 admin 全量权限（mock `user.ts`）。

## 脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | Vite 开发服务器（HMR） |
| `pnpm build` | 生产构建（`dist/`，纯静态文件） |
| `pnpm preview` | 本地预览生产构建（vite preview，默认 4173 端口；base 前缀以终端输出为准） |
| `pnpm typecheck` | tsc 类型检查（不再需要路由类型生成） |
| `pnpm lint` / `pnpm format` | oxlint / oxfmt |
| `pnpm deps` | 清空 node_modules 重装 |

## 目录结构

```
index.html              # SPA 文档壳：head 外链 + #root + 入口 script
app/
├── api/                # 纯请求函数（不含 hooks）
├── commons/            # request(axios封装) / auth(权限判断) / layout(菜单过滤·trail) / html(主题落DOM) / antdApp(App.useApp 单例) / queryClient / types
├── components/         # 全局组件：AppProviders / AppMenu / NavigationProgress / PermissionWrapper
├── config/             # menu.tsx（菜单+权限单一数据源）/ settings.ts / types.ts
├── hooks/api/          # react-query hooks（useAuth / useUser / useSearchTable / useNotice / useMonitor）
├── layouts/ConsoleLayout/   # 后台布局：HeaderBar / SiderNav / TabBar / BreadcrumbNav / Footer / SettingDrawer
├── locales/            # i18n 文案（zh / en）
├── routes/             # 页面，目录命名与菜单 path 对齐（如 list/search-table/）
├── store/              # Zustand：user(登录态·权限) / layout(菜单·tabs·布局 UI，useSettingsStore 主题与设置也在此) / types；index.ts 集中跨 store 订阅
├── settings.json       # 默认布局配置，抽屉里「复制配置」的 JSON 可直接粘回
├── styles/             # app.styl（全局主题样式：antd cssVar 作用域说明、nprogress 主题色）/ global.css / _vars.styl
├── main.tsx            # SPA 入口：挂载前初始化 + createBrowserRouter + createRoot
├── App.tsx             # 根路由组件（Providers / 进度条 / ScrollRestoration / Outlet）；错误边界与首屏占位在 routes.ts 上配置
└── routes.ts           # 由 menu 配置生成的显式 RouteObject 路由表
mock/                   # vite-plugin-mock-data 接口模拟
```

## 核心机制

**启动链路**：`app/main.tsx` 在 `createRoot` 之前只做两件事——调用 `useSettingsStore.persist.rehydrate()` 还原持久化设置，然后创建带 `basename` 的 `createBrowserRouter` 并渲染。跨 store 订阅在 `app/store/index.ts`（权限变化重建菜单），登录态恢复在 `app/routes.ts` 中 ConsoleLayout 路由的 `loader`，主题/语言的 DOM 副作用由 rehydrate 时的 `onRehydrateStorage` 完成——都在首屏渲染前就绪，不会出现空态到填充态的跳变。

**菜单驱动路由**：`app/config/menu.tsx` 是唯一数据源——菜单项含 `path / name(i18n key) / icon / view(页面文件) / visible(是否进左侧导航) / per(所需权限)`。`app/routes.ts` 遍历该配置生成 `RouteObject[]`，并用 Vite 的模块表把 `view` 字符串映射成按需加载的页面（连同页面导出的 `loader`），侧边栏 / 顶部菜单 / 面包屑 / TabBar 全部由它派生。**加页面不需要手写路由。**

**数据加载**：页面级的无操作查询走路由 `loader`，组件用 `useLoaderData` / `useNavigation` 读取；带筛选/分页的查询走 react-query（`api/` 写纯函数，`hooks/api/` 写 hook）。

**权限链路**：登录接口（mock `/api/login`）下发 `permissions` → Zustand user store → `commons/layout.ts` 按菜单 `per` 字段过滤可见菜单 → 布局守卫按 `menuTrail` 拦截越权路径（为空即渲染 403）；组件级用 `<PermissionWrapper per={[...]} backup={...}>` 控制。权限判断在 `commons/auth.ts`。

**状态分层**：跨页面共享态（用户 / 主题 / 菜单 / tabs）进 Zustand；页面级服务端数据用 react-query（`api/` 写纯函数，`hooks/api/` 写 hook），不塞 Zustand。跨 store 的副作用（权限变更重建菜单、设置变更落 DOM）统一收在 `store/index.ts` 的 `subscribe` 里，不在组件里写 `useEffect`。

**路由副作用**：`app/routes.ts` 中 ConsoleLayout 路由的 `middleware` 在 `next()` 之后调 `setCurrentHref(request.url)`，由 store 内部完成 `menuTrail` 计算与 tab 写入。同路由的 `loader` 只负责登录态恢复；middleware 在导航提交阶段执行，首屏不会先闪一次空菜单。

**主题与 DOM 副作用**：主题 token 集中在 `components/AppProviders`（`colorPrimary` 等），暗色用 `darkAlgorithm` 派生；`body` 级的 `theme-mode` / `--app-color-primary` / 色弱滤镜由 `commons/html.ts` 经 store 订阅下发——antd 的 `--ant-*` 只注册在 cssVar 作用域（组件根节点）内，`html`/`body` 上解析不到。

**导航进度条**：`components/NavigationProgress` 基于 nprogress + `useNavigation()`，颜色取 body 上的 `--app-color-primary`（`app.styl` 覆盖）。

## antd v6 迁移注意

以下 API 在 antd 6 已废弃，项目内已全部替换（新增代码请沿用右列写法）：

| 废弃 | 平替 |
|------|------|
| `Space direction` | `Space orientation` |
| `Card bordered`（裸写= true） | `Card variant="outlined"` / `variant="borderless"` |
| `Divider type` | `Divider orientation` |
| `Descriptions labelStyle` / `contentStyle` | `styles.label` / `styles.content` |
| `Steps items[].description` | `items[].content` |
| `Input addonAfter` / `addonBefore` | `Space.Compact` + `Space.Addon` |
| `Select.Option` / `Select.OptGroup` | `Select` 的 `options` 属性 |
| `List` 组件 | antd 自带的 `Listy`（须给 `rowKey`，无 `footer` 插槽） |

## 部署

项目自带两阶段 `Dockerfile`：Node 24 构建 → nginx 静态托管，并配置 history fallback（未匹配路径回退 `index.html`）：

```bash
docker build -t react-antd-console .
docker run -p 3000:3000 react-antd-console
```

本地不用 Docker 时，`pnpm build` 后 `pnpm preview` 直接预览生产构建。换成任意静态服务器时，都需要把深链接回退到 `index.html`。

## 新增页面 SOP

1. `app/config/menu.tsx` 加菜单项（`path / name / icon / view / per`）
2. `app/routes/<path>/index.tsx` 写页面；样式用同目录 `style.module.styl`，类型抽 `types.ts`
3. `app/locales/zh.ts` + `en.ts` 补文案（禁止硬编码中英文）
4. `mock/` 加接口 → `app/api/` 加请求函数 → `app/hooks/api/` 加 query hook
5. `pnpm typecheck`，浏览器验证布局 / i18n / 控制台无报错
