<template>
  <n-layout has-sider class="h-screen">
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="64"
      inverted
      :native-scrollbar="false"
      v-model:collapsed="collapse"
    >
      <Logo :collapse="collapse" />
      <Menu :collapse="collapse" />
    </n-layout-sider>
    <n-layout class="relative">
      <n-layout-header class="bg-white flex h-14 z-10 absolute">
        <Header v-model:collapse="collapse" />
      </n-layout-header>
      <n-layout-content class="content" content-style="padding: 10px;">
        <Main />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Logo } from './components/Logo';
  import { Menu } from './components/Menu';
  import { Header } from './components/Header';
  import { Main } from './components/Main';

  const collapse = ref(false);
</script>

<style lang="scss" scoped>
  .content {
    @apply h-screen bg-gray-200 pt-14;
  }
</style>
