<template>
  <n-config-provider>
    <n-message-provider :max="3">
      <n-dialog-provider>
        <Content />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import Content from './views/content.vue';
</script>

<style lang="scss">
  @import './styles/index.scss';
</style>
