<template>
  <v-app>
    <AppBar />

    <div class="app">
      <router-view />
    </div>
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
  created() {
    this.$store.commit("generateCustomers");
  },
};
</script>

<style scoped>
.app {
  padding-top: 60px;
  background: #f5f5f5;
}
</style>
