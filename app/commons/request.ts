import axios, { type AxiosRequestConfig } from 'axios';
import { message as staticMessage } from 'antd';
import { createMockAdapter } from 'vite-plugin-mock-data/axios-adapter';
import i18n from '~/i18n';
import { useUserStore } from '~/store';
import { getAntdApp } from '~/commons/antdApp';

/** 优先取 App.useApp 实例（带动态主题）；App 未挂载前（挂载前初始化 / 路由 loader 阶段）退回静态方法 */
const msg = () => getAntdApp()?.message ?? staticMessage;

const service = axios.create({
  baseURL: __BASE_URL__ + 'api',
  timeout: 10000,
  adapter: createMockAdapter(),
});

service.interceptors.request.use((config) => {
  const { token } = useUserStore.getState();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  ({ data: res = {} }) => {
    const { code, data, message } = res;
    if (code !== 0 && code !== 200) {
      msg().error(i18n.t(message) || message || i18n.t('Request Error'));
      if (code == null || [1003, 1004, 1005].includes(code)) {
        useUserStore.getState().logout();
      }
      return Promise.reject(res);
    }
    return data ?? res;
  },
  (err = {}) => {
    const { message } = err;
    msg().error(i18n.t(message) || message || i18n.t('Request Error'));
    return Promise.reject(err);
  },
);

export default function request<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return service(url, config).then((response) => response as unknown as T);
}
