import type { App } from 'vue';
import {
  create,
  NSpace,
  NButton,
  NSwitch,
  NLayout,
  NLayoutSider,
  NMenu,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NAvatar,
  NDropdown,
  NDialogProvider,
  NCard,
  NDataTable,
  NForm,
  NInput,
  NFormItem,
  NDrawer,
  NDrawerContent,
  NSpin,
  NMessageProvider,
  NIcon,
  NGradientText,
  NResult,
  NConfigProvider,
  NPopover,
} from 'naive-ui';

const naive = create({
  components: [
    NSpace,
    NButton,
    NSwitch,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
    NAvatar,
    NDropdown,
    NDialogProvider,
    NCard,
    NDataTable,
    NForm,
    NFormItem,
    NInput,
    NDrawer,
    NDrawerContent,
    NSpin,
    NMessageProvider,
    NIcon,
    NGradientText,
    NResult,
    NConfigProvider,
    NPopover,
  ],
});

export const setNaive = (app: App) => {
  app.use(naive);

  // 设定兼容naive UI和tailwindcss的兼容样式
  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);
};
