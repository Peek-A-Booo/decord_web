<template>
  <div class="flex flex-1 pr-6 pl-3 items-center justify-between">
    <n-button quaternary circle @click="collapseMenu">
      <n-icon size="18">
        <MenuFoldOutlined v-if="!collapse" />
        <MenuUnfoldOutlined v-else />
      </n-icon>
    </n-button>

    <div class="flex h-full justify-center items-center">
      <n-popover trigger="hover">
        <template #trigger>
          <div
            class="cursor-pointer flex h-full mr-5 justify-center items-center"
            @click="toGithub"
          >
            <n-button text style="font-size: 24px">
              <n-icon>
                <LogoGithub />
              </n-icon>
            </n-button>
          </div>
        </template>
        <span>Github</span>
      </n-popover>
      <n-dropdown :options="options" @select="handleSelect">
        <n-avatar
          class="cursor-pointer"
          round
          size="small"
          src="https://pinia.vuejs.org/logo.svg"
        />
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import { useDialog } from 'naive-ui';
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd';
  import { useCookie } from '@/hooks/useCookie';
  import { AuthEunm } from '@/enums/http';
  import { $sleep } from '@/utils/util';
  import { useIcon } from '@hooks/useIcon';
  import { PersonCircleOutline, LogOutOutline, SettingsSharp, LogoGithub } from '@vicons/ionicons5';

  interface Props {
    collapse: boolean;
  }

  interface Emit {
    (e: 'update:collapse', val: boolean): void;
  }

  const $router = useRouter();
  const dialog = useDialog();
  const cookie = useCookie();

  const options = [
    {
      label: '用户设置',
      key: 'account',
      icon: useIcon(PersonCircleOutline),
    },
    {
      label: '系统设置',
      key: 'system',
      icon: useIcon(SettingsSharp),
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: useIcon(LogOutOutline),
    },
  ];

  const props = defineProps<Props>();
  const emit = defineEmits<Emit>();

  const { collapse } = toRefs(props);

  const collapseMenu = () => emit('update:collapse', !props.collapse);

  const toGithub = () => {
    window.open('https://github.com/Peek-A-Booo/decord_web');
  };

  const handleSelect = (key: string | number) => {
    if (key === 'account' || key === 'system') {
      $router.push(`/setting/${key}`);
    } else if (key === 'logout') {
      const d = dialog.warning({
        title: '警告',
        content: '确定退出登录？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          d.loading = true;
          return new Promise(async (resolve) => {
            await $sleep();
            cookie.remove(AuthEunm.TOKEN);
            $router.replace('/login');
            resolve(true);
          });
        },
        onNegativeClick: () => {},
      });
    }
  };
</script>

<style lang="scss" scoped></style>
