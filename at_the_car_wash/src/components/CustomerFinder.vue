<template>
  <v-container>
    <div>Customer Search</div>
  </v-container>
</template>

<script>
import functions from "@/helpers/functions";
// import store from "@/store";

export default {
  props: {
    // Define your props here
  },
  mixins: [functions],
  data() {
    return {
      customers: [],
      headers: [],
    };
  },
  created() {
    this.$store.commit("increment");
    //this.customers = this.$store.increment();
    //this.buildHeaders();
  },
  mounted() {
    // Execute code after the component is mounted
  },
  methods: {
    buildHeaders() {
      const headers = [];
      for (const key in this.customers[0]) {
        headers.push({
          text: key,
          value: key,
        });
      }
      this.headers = headers;
    },
  },
  computed: {
    // Define your computed properties here
  },
  watch: {
    // Define your watchers here
  },
};
</script>
@/helpers/backend
