import { toRaw } from 'vue';
import { defineStore } from 'pinia';
import { $sleep } from '@/utils/util';
import { constantRoutes, authRoutes } from '@/router';

// 将获得的权限树列表转换为一维数组方便后续筛选
const flatAuthKeys = (keys: any[], resultArr?: string[]) => {
  const arr: string[] = resultArr || [];
  keys.forEach((item: any) => {
    arr.push(item.key);
    if (item.children?.length) flatAuthKeys(item.children, arr);
  });
  return arr;
};

// 过滤出有权限的路由列表
const filterAuthRoutes = (routes: any[], authKeys: string[]) => {
  const filter = routes.filter((item) => {
    if (!authKeys.includes(item.meta.authKey)) return false;
    if (item.children?.length) {
      item.children = filterAuthRoutes(item.children, authKeys);
    }
    return item;
  });
  return filter;
};

// 过滤出有权限的菜单列表
const filterAuthMenus = (routes: any[]) => {
  const filter = routes.filter((item) => {
    if (!item.meta.menu) return false;
    if (item.children?.length) {
      item.children.forEach((e: any) => {
        const parentPath: any[] = item.parentPath?.length
          ? [...item.parentPath, ...[e.path]]
          : [item.path];
        e.parentPath = parentPath;
      });
      item.children = filterAuthMenus(item.children);
    }
    return item;
  });

  return filter;
};

export const useAsyncRoute = defineStore({
  id: 'asyncRoute',
  state: () => {
    return {
      routers: [] as any[],
      menus: [] as any[],
    };
  },
  getters: {},
  actions: {
    async generateRoutes() {
      await $sleep(1000);
      const authKeys = [
        {
          key: 'record',
          children: [
            {
              key: 'record_index',
            },
          ],
        },
        {
          key: 'setting',
          children: [
            {
              key: 'setting_account',
            },
            {
              key: 'setting_system',
            },
          ],
        },
      ];
      // 1. 先把权限列表抹平成一个数组
      const formatAuthKeys = flatAuthKeys(authKeys);
      // 2. 遍历需要筛选权限的列表进行筛选
      const authedRoutes = filterAuthRoutes(authRoutes, formatAuthKeys);
      // 3. 整合固有路由以及计算过后的权限路由，并存储到pinia中
      const routers = [...constantRoutes, ...authedRoutes];
      const menus = filterAuthMenus([...routers]);
      this.routers = [...routers];
      this.menus = menus;
      return toRaw(authedRoutes);
    },
  },
});
