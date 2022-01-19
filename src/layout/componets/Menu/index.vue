<template>
  <div class>
    <n-menu
      inverted
      :value="activeRouteName"
      :collapsed="collapse"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue';
  import { useActiveRoute } from '@hooks/useActiveRoute';
  import { useMenuOptions } from './useMenuOptions';

  interface Props {
    collapse: boolean;
  }

  const props = defineProps<Props>();
  const { collapse } = toRefs(props);
  const { menuOptions } = useMenuOptions();
  const { activeRouteName } = useActiveRoute();
</script>

<style lang="scss" scoped></style>
