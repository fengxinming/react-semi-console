import type { AntdApp } from './types';

/**
 * antd App.useApp() 全局单例。
 * AppProviders 内部挂载，供 request.ts 等非组件环境
 * 拿到带动态主题/语境的 message / notification / modal。
 * 类型定义见 ./types.ts（AntdApp）
 * / Global singleton for antd App.useApp(); mounted inside AppProviders so that
 * non-component code (request.ts, ...) can access theme-aware message/notification/modal.
 * Type definition lives in ./types.ts (AntdApp).
 */
let instance: AntdApp | null = null;

export const setAntdApp = (app: AntdApp) => {
  instance = app;
};

export const getAntdApp = (): AntdApp | null => instance;
