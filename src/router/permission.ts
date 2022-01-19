import { App } from 'vue';
import router from './index';
import { useAsyncRoute } from '@/store/route';
import { RouteRecordRaw } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { useCookie } from '@hooks/useCookie';
import { AuthEunm } from '@/enums/http';
import { PageEnum } from '@/enums/page';
import { excepitionRoutes } from './exception';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 路由鉴权白名单
const whiteList: string[] = [PageEnum.LOGIN];

export const setAsyncRoutes = (app: App) => {
  // 设置路由模块
  app.use(router);

  const asyncRoute = useAsyncRoute();
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    // 白名单的路由可以直接跳转
    if (whiteList.includes(to.path)) {
      next();
      return;
    }

    const cookies = useCookie();
    const token = cookies.get(AuthEunm.TOKEN);
    if (!token) {
      next({ path: PageEnum.LOGIN, replace: true });
      return;
    }

    // 获取当前账户的路由权限
    const asyncRoutes = asyncRoute.routers;
    if (!asyncRoutes?.length) {
      const routes = await asyncRoute.generateRoutes();
      routes.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw);
      });
    }

    // 添加错误页面
    const nowRouter = router.getRoutes();
    const find404 = nowRouter.find((page) => page.name === 'NotFound');
    if (!find404) {
      excepitionRoutes.forEach((p: any) => {
        router.addRoute(p);
      });
    }

    if (!to.matched?.length) {
      next({ ...to, replace: true });
    } else {
      next();
    }
  });

  router.afterEach((to) => {
    const title: any = useTitle();
    title.value = `Record - ${to.meta.title}`;

    NProgress.done();
  });

  router.onError((error) => {
    console.log(error, 'error');
  });
};
