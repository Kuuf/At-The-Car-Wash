<template>
  <v-container class="simple-border-container"> hi</v-container>
</template>

<script>
import functions from "@/helpers/functions";
import { mapGetters } from "vuex";
// import store from "@/store";

export default {
  props: {
    // Define your props here
  },
  mixins: [functions],
  data() {
    return {
      customerInfo: [],
    };
  },
  computed: {
    ...mapGetters(["getCustomerInfo"]),
    // Define your computed properties here
  },
  created() {},
  mounted() {
    // Execute code after the component is mounted
  },
  methods: {},

  watch: {
    // Define your watchers here
  },
};
</script>
<style scoped></style>
