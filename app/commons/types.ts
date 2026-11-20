/** commons 层共享类型定义（权限、antd App 实例等）
 *  / Shared type definitions for the commons layer (permissions, antd App instance, etc.) */

import type { App } from 'antd';

/** 资源权限表：键为资源名（如 'menu.dashboard.monitor'），值为允许的动作列表
 *  / Resource permission map: resource name -> allowed action list */
export type PermMap = Record<string, string[]>;

/** antd App.useApp() 全局实例类型：由 AppProviders 挂载（commons/antdApp），
 *  供 request.ts 等非组件环境取到带动态主题的 message / notification / modal。
 *  / Type of the antd App.useApp() singleton mounted by AppProviders (commons/antdApp),
 *  so non-component code such as request.ts can use theme-aware message/notification/modal. */
export type AntdApp = ReturnType<typeof App.useApp>;

/** 单条权限要求：指定资源 + 所需动作 */
export interface Per {
  resource: string | RegExp;
  actions?: string[];
}

/** 权限校验参数 */
export interface PerCheck {
  /** 需要满足的权限列表 */
  per?: Per[];
  /** 为 true 时 per 满足其一即可，否则需全部满足 */
  perAny?: boolean;
}
