<template>
  <div class="flex p-2 items-center justify-center">
    <img src="@/assets/logo.png" class="h-10 w-10" :class="{ 'mr-5': !collapse }" />
    <h1 v-if="!collapse" class="text-lg">Decord</h1>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue';

  interface Props {
    collapse?: boolean;
  }

  const props = defineProps<Props>();

  const { collapse } = toRefs(props);
</script>

<style lang="scss" scoped></style>
