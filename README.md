# react-semi-console

基于 React 19 + React Router 8（Library 模式，纯客户端 SPA）+ Semi Design 的中后台管理模板，覆盖常见中后台页面与权限、布局、图表场景。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 19 + React Router 8（Library 模式 / createBrowserRouter，纯 SPA，无 SSR、无服务端产物） |
| 构建 | Vite 8（`@vitejs/plugin-react`），产物 `dist/` 仅静态文件；`base` 默认为 `/${pkg.name}/`（即 `/react-semi-console/`），可用 `BASE_URL` 环境变量覆盖 |
| UI | `@douyinfe/semi-ui` 2（ConfigProvider 仅承载 locale；主题走 CSS 变量，暗色切换 `body[theme-mode]`）+ `@douyinfe/semi-icons`；定制主题用 `@douyinfe/semi-vite-plugin`（`cssLayer` 处理与 Tailwind 的层顺序）；样式 Stylus module + Tailwind v4 |
| 图表 / 配色 | `@visactor/react-vchart`（VChart，spec 统一经 `commons/vchart.ts` 的 `makeSpec` 注入主题；暗色主题在入口注册）；色阶用 `@ant-design/colors` 的色板算法 |
| 状态 | Zustand（persist）+ `@tanstack/react-query` |
| 请求 | axios（`app/commons/request.ts` 统一封装拦截） |
| i18n | i18next + react-i18next |
| Mock | `vite-plugin-mock-data`（`mock/` 目录） |
| 开发插件 | `vite-plugin-devtools-json`（生成 devtools.json） |
| 质量 | TypeScript、oxlint、oxfmt |

## 快速开始

```bash
pnpm install
pnpm dev        # 默认端口 5173；因 base 默认带 /react-semi-console/，访问路径以终端输出为准（BASE_URL 可覆盖）
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
├── commons/            # request(axios封装, Toast 静态提示) / auth(权限判断) / layout(菜单过滤·trail) / html(主题落DOM) / queryClient / types
├── components/         # 全局组件：AppProviders / AppMenu / NavigationProgress / PermissionWrapper
├── config/             # menu.tsx（菜单+权限单一数据源）/ settings.ts / types.ts
├── hooks/api/          # react-query hooks（useAuth / useUser / useSearchTable / useNotice / useMonitor）
├── layouts/ConsoleLayout/   # 后台布局：HeaderBar / SiderNav / TabBar / BreadcrumbNav / Footer / SettingDrawer
├── locales/            # i18n 文案（zh / en）
├── routes/             # 页面，目录命名与菜单 path 对齐（如 list/search-table/）
├── store/              # Zustand：user(登录态·权限) / layout(菜单·tabs·布局 UI，useSettingsStore 主题与设置也在此) / types；index.ts 集中跨 store 订阅
├── settings.json       # 默认布局配置，抽屉里「复制配置」的 JSON 可直接粘回
├── styles/             # app.styl（全局：body 级 Semi 变量 / nprogress 主题色 / chart tooltip）/ global.css / _vars.styl
├── main.tsx            # SPA 入口：react19-adapter + 挂载前初始化 + createBrowserRouter + createRoot
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

**主题与 DOM 副作用**：Semi 的主题是 CSS 变量体系——`components/AppProviders` 的 `ConfigProvider` 只传 locale；主色 `--semi-color-primary` 系列由 `commons/html.ts` 的 `setThemeColor` 经色板算法生成后写到 body（运行时换肤），暗色靠 `setTheme` 增删 `body[theme-mode='dark']`（Semi 在 body 下挂了亮/暗两套色盘，浮层自动跟随），色弱是 body 反色滤镜。这些 DOM 副作用统一由 `store/layout.ts` 的 persist 订阅在 rehydrate 时下发，首屏前就绪。`@douyinfe/semi-vite-plugin` 开启 `cssLayer`，配合 `index.html` 顶部的 `@layer` 顺序声明解决 Tailwind v4 Preflight 与 Semi 样式的优先级冲突。

**React 19 适配**：`main.tsx` 顶部必须最先导入 `@douyinfe/semi-ui/react19-adapter`，注入 `createRoot`（React 19 移除了 `ReactDOM.render`，Toast/Modal/Tooltip 等依赖它动态挂载）。

**导航进度条**：`components/NavigationProgress` 基于 nprogress + `useNavigation()`，颜色取 body 上的 `--app-color-primary`（`app.styl` 覆盖）。

## 组件库约定（Semi Design）

组件库统一使用 Semi Design。新增/修改页面请沿用 Semi 的 API，常见用法速查：

| 场景 | Semi 写法 |
|------|-----------|
| 图标 | 从 `@douyinfe/semi-icons` 导入 `Icon*`；React 19 入口需先导入 `@douyinfe/semi-ui/react19-adapter` |
| 表单 | `getFormApi` 拿 formApi + `<Form.Input field="x" rules={...}/>`，校验用 `formApi.validate()`，无 `Form.useForm` / `Form.Item name` |
| 输入框 | `onChange(value, e)` 首参即字符串值；`allowClear`→`showClear`、`onPressEnter`→`onEnterPress`、密码框用 `Input mode="password"`、`Input.TextArea`→独立 `TextArea` |
| 选择器 | `options`→`optionList`、`onChange(value)` 单参；多选 `multiple`、tags `allowCreate` |
| 表格 | `dataSource`/`columns` 同名；`onChange` 是单对象 `{pagination,filters,sorter}`；列类型 `ColumnProps` 从 `@douyinfe/semi-ui/lib/es/table/interface` 导入 |
| 布局间距 | `Space size`→`spacing`、`direction="vertical"`→`vertical`；`Divider type`→`layout`、`orientation`→`align` |
| 弹出层 | `placement`→`position`、`title`→`content`（Tooltip）；`Dropdown menu={{items}}`→`menu={[{node:'item',name}]}` |
| 抽屉 / 提示 | `Drawer`→`SideSheet`（`open`→`visible`、`onClose`→`onCancel`）；`message`→`Toast` 静态方法；`Alert`→`Banner`（`type="error"`→`danger`） |
| 无对应组件 | `Result`→`Empty`/`Banner`+Icon 拼装；`Statistic`→`Typography.Numeral`/普通元素；`List` 无 `Item.Meta`（用 `dataSource`+`renderItem`，头像+内容两栏自己排）；`Tabs items`→`tabList`+`TabPane`；`Menu`→`Nav` |
| 主题 / 暗色 | 主色写 body 的 `--semi-color-primary` 系列，暗色切 `body[theme-mode]`；不要在 `ConfigProvider` 上传 `theme`（Semi 无此 prop） |

> 图表已统一迁移到 VChart：spec 经 `commons/vchart.ts` 的 `makeSpec` 注入主题（与 Semi 明暗同步）；G2Plot 的 `angleField`/`colorField`/`shapeField` 等已改写为 VChart 的 `valueField`/`categoryField`/`curveType` 等。数据须包装成 `[{ id, values }]`。

**样式侧统一使用 Semi**：Stylus 里没有其他组件库的类名选择器与变量残留——深色/浅色用 `--semi-color-*`（如 `--semi-color-text-0/1/2`、`--semi-color-bg-0/1`、`--semi-color-fill-0/1`、`--semi-color-border`、`--semi-color-danger`），覆盖组件内部结构用 `:global(.semi-*)`（`semi-card-body` / `semi-card-header` / `semi-tabs-bar` / `semi-tabs-content` / `semi-list-item` / `semi-descriptions-item-th|td` / `semi-skeleton-paragraph` / `semi-form-field-label-left` / `semi-navigation-sub-title` / `semi-layout-sider-children` / `semi-row|col`）。

## 部署

项目自带两阶段 `Dockerfile`：Node 24 构建 → nginx 静态托管，并配置 history fallback（未匹配路径回退 `index.html`）：

```bash
docker build -t react-semi-console .
docker run -p 3000:3000 react-semi-console
```

本地不用 Docker 时，`pnpm build` 后 `pnpm preview` 直接预览生产构建。换成任意静态服务器时，都需要把深链接回退到 `index.html`。

## 新增页面 SOP

1. `app/config/menu.tsx` 加菜单项（`path / name / icon / view / per`）
2. `app/routes/<path>/index.tsx` 写页面；样式用同目录 `style.module.styl`，类型抽 `types.ts`
3. `app/locales/zh.ts` + `en.ts` 补文案（禁止硬编码中英文）
4. `mock/` 加接口 → `app/api/` 加请求函数 → `app/hooks/api/` 加 query hook
5. `pnpm typecheck`，浏览器验证布局 / i18n / 控制台无报错
