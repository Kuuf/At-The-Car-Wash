<template>
  <div>
    <!-- mobile toolbar -->
    <v-row v-if="isMobile" class="pa-5 pb-0">
      <v-btn
        v-show="customerSelected"
        flat
        icon="mdi-chevron-left"
        @click="goBack()"
      />
    </v-row>
    <!-- toolbar -->
    <v-row align="center" class="overflow-scroll pa-6">
      <div class="pa-3">
        <div class="text-h5">
          {{ customerSelected && customerInfo ? customerInfo.info.name : "" }}
        </div>
        <div class="text-caption">
          Customer ID:
          {{ customerSelected && customerInfo ? customerInfo.info.id : "" }}
        </div>
      </div>

      <v-spacer />
      <v-btn flat color="primary" class="mr-2">Update Profile</v-btn>
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
    <v-col sm="12" md="4" v-if="isMobile">
      <Navbar />
    </v-col>
    <v-row class="pa-3">
      <!-- navbar -->
      <v-col sm="12" md="4" v-if="!isMobile">
        <Navbar />
      </v-col>
      <!-- info -->
      <v-col sm="12" md="8">
        <div :class="!isMobile ? 'overflow-scroll' : ''">
          <CustomerInfo
            :customerSelected="customerSelected"
            :customerID="customerID"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import functions from "@/helpers/functions";
import { mapGetters } from "vuex";
import CustomerInfo from "./CustomerInfo.vue";
import Navbar from "./ProfileNavbar.vue";
// import store from "@/store";

export default {
  components: {
    CustomerInfo,
    Navbar,
  },
  props: {
    customerID: {
      type: Number,
      required: false,
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
      this.$emit("closeCustomerProfile");
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
  max-height: calc(100vh - 230px);
}
</style>
