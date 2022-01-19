<template>
  <n-card class="rounded-xl flex h-full">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </router-view>
  </n-card>
</template>
