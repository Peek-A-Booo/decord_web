import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { setAsyncRoutes } from './router/permission';
import App from './App.vue';
import { setNaive } from '@/plugins';
import './styles/tailwind.css';

async function load() {
  const app = createApp(App);

  // 设置naive tree-shaking组件
  setNaive(app);

  // 设置状态库pinia
  app.use(createPinia());

  // 挂载路由，设置路由拦截权限
  setAsyncRoutes(app);

  // 路由准备就绪后挂载APP实例
  await router.isReady();

  app.mount('#app');
}

load();
