import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';

type RouteTypes =
  | 'fullPath'
  | 'hash'
  | 'matched'
  | 'meta'
  | 'name'
  | 'params'
  | 'path'
  | 'query'
  | 'redirectedFrom';

/**
 * 获取当前页面的route信息
 * @param routeAttr 路由的属性，默认取“name”
 * @returns
 */
export const useActiveRoute = (routeAttr: RouteTypes = 'name') => {
  const route = useRoute();
  const activeRouteName = ref<string>('');

  watch(
    () => route.fullPath,
    () => {
      activeRouteName.value = route[routeAttr] as string;
    },
    { immediate: true }
  );

  return { activeRouteName };
};
