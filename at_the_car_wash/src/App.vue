<template>
  <v-app>
    <AppBar />
    <v-content class="app">
      <router-view />
    </v-content>
  </v-app>
</template>

<script setup>
import AppBar from "./components/AppBar.vue";
</script>

<style scoped>
.app {
  padding-top: 60px;
  background: white;
}
</style>
