<template>
  <div :class="[isMobile ? '' : 'simple-padding-container', 'pb-6', 'pt-5']">
    <!-- mobile toolbar -->
    <v-row v-if="isMobile">
      <v-btn
        v-show="customerSelected"
        flat
        icon="mdi-chevron-left"
        @click="goBack()"
      />
    </v-row>
    <!-- toolbar -->
    <v-row align="center" class="overflow-scroll">
      <div
        :class="['text-h7 pl-3', !customerSelected && !isMobile ? 'pt-3' : '']"
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
    <!-- info bOIII -->
    <!--
      id: 3,
      name: "George Doe",
      email: "george@gmail.com",
      phone: "123-456-7890",
      address: "1234 Main St",
      city: "Anytown",
      state: "CA",
    -->
    <v-row>
      <!-- navbar -->
      <v-col sm="3"></v-col>
      <!-- info -->
      <v-col sm="9">
        <div class="mt-4 overflow-scroll">
          <div
            v-show="customerSelected"
            v-for="item in [1, 2, 3, 4, 5, 6, 7]"
            :key="item"
          >
            {{ customerInfo }}
          </div>
          <div v-show="!customerSelected">
            <v-img src="@/assets/no_customer_selected.png"> </v-img>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
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
      if (this.fullscreen) {
        this.$emit("toggleFullScreen");
      }
      this.fullscreen = false;
      1;
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
<style scoped>
.overflow-scroll {
  overflow-y: auto;
  max-height: calc(100vh - 176px);
}
</style>
