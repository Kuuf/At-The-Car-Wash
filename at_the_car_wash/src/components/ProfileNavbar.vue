<template>
  <div>
    <v-btn
      class="text-body-1 navbar-button"
      flat
      prepend-icon="mdi-account-outline"
      @click="goToComponent('AccountInfo')"
      >Account Info</v-btn
    >
    <v-btn
      class="text-body-1 navbar-button"
      flat
      prepend-icon="mdi-account-outline"
      @click="goToComponent('Vehicles')"
      >Vehicles</v-btn
    >
    <v-btn
      class="text-body-1 navbar-button"
      flat
      prepend-icon="mdi-account-outline"
      @click="goToComponent('Subscriptions')"
      >Subscriptions</v-btn
    >
    <v-btn
      class="text-body-1 navbar-button"
      flat
      prepend-icon="mdi-account-outline"
      @click="goToComponent('PurchaseHistory')"
      >Purchase History</v-btn
    >
    <v-btn
      class="text-body-1 navbar-button"
      flat
      prepend-icon="mdi-account-outline"
      @click="goToComponent('Lorem Ipsum')"
      >Lorem Ipsum</v-btn
    >
  </div>
</template>

<script>
import functions from "@/helpers/functions";
// import store from "@/store";

export default {
  props: {},
  mixins: [functions],
  data() {
    return {};
  },
  computed: {
    // Define your computed properties here
  },
  created() {},
  mounted() {
    // Execute code after the component is mounted
  },
  methods: {
    goToComponent(component) {
      this.$emit("goToComponent", component);
    },
  },

  watch: {},
};
</script>
<style scoped>
.overflow-scroll {
  overflow-y: auto;
  max-height: calc(100vh - 176px);
}
</style>
