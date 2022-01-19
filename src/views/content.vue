<template>
  <router-view />
</template>

<script setup lang="ts">
  import { useMessage } from 'naive-ui';

  const _window: any = window;
  _window.$message = useMessage();
</script>
