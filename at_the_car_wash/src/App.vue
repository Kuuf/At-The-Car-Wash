<template>
  <v-app>
    <AppBar />
    <div class="app">
      <router-view />
    </div>
  </v-app>
</template>

<script setup>
import AppBar from "./components/AppBar.vue";
</script>

<style scoped>
.app {
  padding-top: 60px;
  background: #f5f5f5;
}
</style>
