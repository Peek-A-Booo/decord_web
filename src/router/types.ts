import { defineComponent, VNode } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface Meta {
  // 在左侧菜单中展示的标题文本
  title: string;
  // 鉴权key
  authKey?: string;
  // 是否展示在左侧菜单里
  menu?: boolean;
  // 显示在左侧菜单对应的icon
  icon?: string | (() => VNode);
}

export interface RouteProps {
  path: string;
  name: string;
  redirect?: string;
  component?: Component | string;
  meta: Meta;
  children?: RouteProps[];
}
