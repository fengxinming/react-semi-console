import { useEffect } from 'react';
import { useNavigation } from 'react-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 只保留顶部细线，去掉右下角转圈
NProgress.configure({ showSpinner: false });

/**
 * 路由导航进度条：路由模块加载 / loader 执行（useNavigation 非 idle）期间显示，
 * 导航完成时收尾。挂在 root，登录页与后台全路由生效。
 * 颜色随主题色（--primary-6 链路），覆盖样式在 app.styl。
 */
export default function NavigationProgress() {
  const { state } = useNavigation();

  useEffect(() => {
    if (state !== 'idle') {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [state]);

  // 导航抛错时 state 不会回到 idle，错误边界接管又会把本组件卸载。
  // nprogress 的 trickle 是挂在全局 DOM 上的递归定时器，不显式收尾会一直涨。
  useEffect(() => {
    return () => {
      NProgress.done();
    };
  }, []);

  return null;
}
