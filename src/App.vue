<template>
  <router-view/>
</template>

<script setup>
import { useLoadingBar } from "naive-ui"
import { onMounted } from "vue"
import { loadingBarRef } from "./router"

onMounted(() => {
  const loadingBar = useLoadingBar()
  loadingBarRef.value = loadingBar
  loadingBar.finish()
})
</script>