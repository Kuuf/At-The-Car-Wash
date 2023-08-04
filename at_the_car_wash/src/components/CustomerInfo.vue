<template>
  <v-container class="simple-border-container pb-6 pa-5">
    <v-row v-if="isMobile">
      <v-btn
        v-show="customerSelected"
        flat
        icon="mdi-chevron-left"
        @click="goBack()"
      />
    </v-row>
    <v-row align="center">
      <div
        :class="['text-h5 pl-3', !customerSelected && !isMobile ? 'pt-2' : '']"
      >
        Customer Info
      </div>
      <v-spacer />
      <v-btn
        v-show="customerSelected && !isMobile"
        flat
        :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
        @click="toggleFullScreen()"
      >
      </v-btn>
      <v-btn
        v-show="customerSelected && !isMobile && !fullscreen"
        flat
        icon="mdi-close"
        @click="goBack()"
      >
      </v-btn>
    </v-row>

    <div class="mt-4" v-show="customerSelected">
      {{ customerInfo }}
    </div>
  </v-container>
</template>

<script>
import functions from "@/helpers/functions";
import { mapGetters } from "vuex";
// import store from "@/store";

export default {
  props: {
    customerID: {
      type: Number,
      required: true,
    },
    customerSelected: {
      type: Boolean,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
  mixins: [functions],
  data() {
    return {
      customerInfo: [],
      fullscreen: false,
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
  methods: {
    loadCustomerInfo() {
      this.customerInfo = this.getCustomerInfo(this.customerID);
    },
    goBack() {
      this.$emit("closeCustomerInfo");
    },
    toggleFullScreen() {
      this.fullscreen = !this.fullscreen;
      this.$emit("toggleFullScreen");
    },
  },

  watch: {
    customerSelected() {
      this.loadCustomerInfo();
    },
    customerID() {
      this.loadCustomerInfo();
    },
  },
};
</script>
<style scoped></style>
