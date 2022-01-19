import { createRouter, createWebHashHistory } from 'vue-router';
import { Layout } from '@/layout';
import { BookOutline, SettingsOutline } from '@vicons/ionicons5';
import { useIcon } from '@/hooks/useIcon';
import type { RouteProps } from './types';

const Login = () => import('../views/login/index.vue');
const Record = () => import('../views/record/index.vue');
const Account = () => import('../views/setting/account/index.vue');
const System = () => import('../views/setting/system/index.vue');

export const constantRoutes: RouteProps[] = [
  {
    path: '/',
    name: 'Root',
    meta: { title: 'Root' },
    redirect: '/record',
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: Login,
  },
];

export const authRoutes: RouteProps[] = [
  {
    path: '/record',
    name: 'Record',
    redirect: '/record/index',
    component: Layout,
    meta: {
      title: '记事',
      authKey: 'record',
      menu: true,
      icon: useIcon(BookOutline),
    },
    children: [
      {
        path: 'index',
        name: 'Record_index',
        meta: {
          title: '记事',
          authKey: 'record_index',
          menu: true,
        },
        component: Record,
      },
    ],
  },
  {
    path: '/setting',
    name: 'Setting',
    redirect: '/setting/account',
    component: Layout,
    meta: {
      title: '设置',
      authKey: 'setting',
      menu: true,
      icon: useIcon(SettingsOutline),
    },
    children: [
      {
        path: 'account',
        name: 'Setting_account',
        meta: {
          title: '账号与安全',
          authKey: 'setting_account',
          menu: true,
        },
        component: Account,
      },
      {
        path: 'system',
        name: 'Setting_system',
        meta: {
          title: '系统设置',
          authKey: 'setting_system',
          menu: true,
        },
        component: System,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as any[],
});

export default router;
