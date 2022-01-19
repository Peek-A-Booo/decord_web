import { h } from 'vue';
import type { VNode } from 'vue';
import { RouterLink } from 'vue-router';
import { useAsyncRoute } from '@/store/route';

interface MenuProps {
  label: string | (() => VNode);
  key: string;
  icon?: any;
  children?: any[];
  path?: string;
}

export const useMenuOptions = () => {
  // 这里不需要响应式，因此直接解构即可
  const { menus } = useAsyncRoute();

  let menuOptions: any[] = [];

  const renderLabel = (path: string, name: string) =>
    h(RouterLink, { to: { path } }, { default: () => name });

  const filterMenuOptions = (array: any[] = menus) => {
    const filter = array.map((item) => {
      const obj: MenuProps = {
        label: item.meta.title,
        key: item.name,
      };
      if (item.parentPath?.length) {
        let path = '';
        item.parentPath.forEach((p: string) => {
          path += `/${p.replaceAll('/', '')}`;
        });
        path += `/${item.path.replaceAll('/', '')}`;
        obj.path = path;
      } else {
        obj.path = item.path;
      }
      if (item.meta.icon) obj.icon = item.meta.icon;
      if (item.children?.length) {
        if (item.children.length === 1) {
          const child = item.children[0];
          let childPath = '';
          child.parentPath.forEach((p: string) => {
            childPath += `/${p.replaceAll('/', '')}`;
          });
          childPath += `/${child.path.replaceAll('/', '')}`;
          obj.label = () => renderLabel(childPath, item.meta.title);
          obj.key = child.name;
        } else {
          obj.children = filterMenuOptions(item.children);
        }
      } else {
        let path = '';
        if (item.parentPath?.length) {
          item.parentPath.forEach((p: string) => {
            path += `/${p.replaceAll('/', '')}`;
          });
          path += `/${item.path.replaceAll('/', '')}`;
        } else {
          path = item.path;
        }
        obj.label = () => renderLabel(path, item.meta.title);
      }
      return obj;
    });

    return filter;
  };

  menuOptions = filterMenuOptions(menus);

  return { menuOptions };
};
