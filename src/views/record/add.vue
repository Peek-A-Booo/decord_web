<template>
  <n-drawer v-model:show="active" :width="502">
    <n-drawer-content title="新建记事"
      >《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。</n-drawer-content
    >
  </n-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const active = ref(false);

  const init = () => {
    active.value = true;
  };

  defineExpose({ init });
</script>

<style lang="scss" scoped></style>
