<template>
  <div>
    <NavbarButton
      label="Account Info"
      component="account_info"
      :isSelected="selectedSection === 1"
      icon="mdi-account"
      @click="goToComponent('account_info', 1)"
    />
    <NavbarButton
      label="Vehicles"
      component="vehicles"
      :isSelected="selectedSection === 2"
      icon="mdi-car"
      @click="goToComponent('vehicles', 2)"
    />
    <NavbarButton
      label="Subscriptions"
      component="subscriptions"
      :isSelected="selectedSection === 3"
      icon="mdi-license"
      @click="goToComponent('subscriptions', 3)"
    />
    <NavbarButton
      label="Purchase History"
      component="purchase_history"
      :isSelected="selectedSection === 4"
      icon="mdi-account"
      @click="goToComponent('purchase_history', 4)"
    />
    <NavbarButton
      label="Lorem Ipsum"
      component="lorem_ipsum"
      :isSelected="selectedSection === 5"
      icon="mdi-account"
      @click="goToComponent('lorem_ipsum', 5)"
    />
  </div>
</template>

<script>
import functions from "@/helpers/functions";
import NavbarButton from "./NavbarButton.vue";
// import store from "@/store";

export default {
  components: {
    NavbarButton,
  },
  props: {},
  mixins: [functions],
  data() {
    return {
      selectedSection: 1,
    };
  },
  computed: {
    // Define your computed properties here
  },
  created() {},
  mounted() {
    // Execute code after the component is mounted
  },
  methods: {
    goToComponent(component, id) {
      this.selectedSection = id;
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
