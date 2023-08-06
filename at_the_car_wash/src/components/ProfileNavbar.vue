<template>
  <div>
    <NavbarButton
      label="Account Info"
      :isSelected="selectedSection === 0"
      icon="mdi-account"
      @click="goToComponent(0)"
    />
    <NavbarButton
      label="Vehicles"
      :isSelected="selectedSection === 1"
      icon="mdi-car"
      @click="goToComponent(1)"
    />
    <NavbarButton
      label="Subscriptions"
      :isSelected="selectedSection === 2"
      icon="mdi-license"
      @click="goToComponent(2)"
    />
    <NavbarButton
      label="Purchase History"
      :isSelected="selectedSection === 3"
      icon="mdi-history"
      @click="goToComponent(3)"
    />
    <NavbarButton
      label="Lorem Ipsum"
      :isSelected="selectedSection === 4"
      icon="mdi-airballoon"
      @click="goToComponent(4)"
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
      selectedSection: 0,
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
    goToComponent(id) {
      this.selectedSection = id;
      this.$emit("select-header", id);
    },
    changeActiveHeader(index) {
      this.selectedSection = index;
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
