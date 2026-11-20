import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from './routes';
import { useSettingsStore } from './store';
import '~/i18n';

// 挂载前完成一次性初始化：主题设置还原、登录态恢复、菜单权限重算。
// 等这些都就绪再 render，避免刷新时出现「空态 -> 填充态」的二次渲染跳变。
function bootstrap() {
  useSettingsStore.persist.rehydrate();

  const router = createBrowserRouter(routes, {
    basename: __BASE_URL__,
  });
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('[bootstrap] 缺少 #root 挂载节点');
  }
  createRoot(container).render(<RouterProvider router={router} />);
}

void bootstrap();
