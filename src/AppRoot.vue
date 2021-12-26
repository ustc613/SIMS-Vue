<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NLoadingBarProvider>
      <App/>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<script setup>
import App from "./App.vue"
import { NLoadingBarProvider, NConfigProvider } from "naive-ui"

const themeOverrides = {
  common: {
    primaryColor: "rgb(22,93,255)"
  }
}
</script>

<style scoped lang="less">

</style>