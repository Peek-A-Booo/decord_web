import type { RouteProps } from './types';

const Page404 = () => import('../views/exception/404.vue');

export const excepitionRoutes: RouteProps[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '页面不存在',
    },
    component: Page404,
  },
];
