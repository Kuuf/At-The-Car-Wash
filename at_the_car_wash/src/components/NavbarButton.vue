<template>
  <v-btn
    :class="[
      'text-none text-subtitle-1 navbar-button',
      isSelected
        ? 'secondary-left-border gray-background'
        : ' blank-left-border',
    ]"
    flat
    :prepend-icon="icon"
    @click="click"
  >
    {{ label }}</v-btn
  >
</template>

<script>
import functions from "@/helpers/functions";
// import store from "@/store";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
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
    click() {
      this.$emit("click");
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
