<template>
  <div class="flex h-screen items-center justify-center not-found">
    <n-result status="404" title="抱歉，你访问的页面不存在" description="生活总归带点荒谬">
      <template #footer>
        <n-button type="primary" @click="backToIndex">返回首页</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const $router = useRouter();

  const backToIndex = () => $router.replace('/');
</script>

<style lang="scss" scoped>
  .not-found {
    background-color: #f5f7f9;
  }
</style>
