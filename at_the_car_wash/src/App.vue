<template>
  <v-app>
    <AppBar />

    <div class="app">
      <router-view />
    </div>
    <snackbar />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";

export default {
  components: {
    AppBar,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped>
.app {
  padding-top: 60px;
  background: #f5f5f5;
}
</style>
