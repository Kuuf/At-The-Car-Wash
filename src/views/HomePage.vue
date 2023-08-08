<template>
  <v-container class="pa-0 full-height">
    <v-row no-gutters>
      <v-col
        v-show="showCustomerList"
        :sm="isCustomerSelected ? 4 : 6"
        class="simple-border-container white-container"
      >
        <CustomerFinder
          ref="customerFinder"
          @customer-selected="customerSelected"
          :isMobile="isMobile"
        />
      </v-col>
      <v-col
        v-show="showCustomerProfile"
        :sm="customerInfoFullScreen ? 12 : isCustomerSelected ? 8 : 6"
        class="simple-border-container white-container"
      >
        <CustomerProfile
          v-show="isCustomerSelected"
          :customerSelected="isCustomerSelected"
          :customerID="selectedCustomerID"
          :isMobile="isMobile"
          @closeCustomerProfile="closeCustomerProfile"
          @toggleFullScreen="toggleCustomerInfoFullScreen"
          @updatedCustomerInfo="updatedCustomerInfo"
        />
        <v-col v-show="!isCustomerSelected" class="noCustomerDiv">
          <div class="noCustomerContent pb-5">
            <v-img src="@/assets/city_life.svg"> </v-img>
            <v-row class="text-h5 mt-5" style="height: 100%" justify="center">
              <span style="color: #ccc">Your customers are lonely ...</span>
            </v-row>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomerFinder from "@/components/CustomerFinder.vue";
import CustomerProfile from "@/components/CustomerProfile.vue";
import functions from "@/helpers/functions";
import { mapGetters } from "vuex";
export default {
  components: {
    CustomerFinder,
    CustomerProfile,
  },
  props: {},
  mixins: [functions],
  computed: {
    ...mapGetters(["getCustomersBasicInfo", "getMobileThreshold"]),
    showCustomerList() {
      if (this.customerInfoFullScreen) {
        return false;
      }
      if (this.isMobile) {
        if (this.isCustomerSelected) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    showCustomerProfile() {
      if (this.isMobile) {
        if (this.isCustomerSelected) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
  },
  data() {
    return {
      isCustomerSelected: false,
      selectedCustomerID: null,
      isMobile: false,
      customerInfoFullScreen: false,
    };
  },
  created() {
    // Execute code after the component is created
  },
  mounted() {
    this.isMobile = window.innerWidth < this.getMobileThreshold;
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    // Clean up the event listener when the component is destroyed
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      // Update the isMobile flag on window resize
      this.isMobile = window.innerWidth < this.getMobileThreshold;
    },
    customerSelected(customerID) {
      this.selectedCustomerID = customerID;
      this.isCustomerSelected = true;
    },
    closeCustomerProfile() {
      this.isCustomerSelected = false;
      this.$refs.customerFinder.selectedCustomerID = null;
    },
    toggleCustomerInfoFullScreen() {
      this.customerInfoFullScreen = !this.customerInfoFullScreen;
    },
    updatedCustomerInfo() {
      this.$refs.customerFinder.loadTable();
    },
  },
};
</script>

<style>
.full-height {
  height: calc(100vh - 64px);
}
.noCustomerDiv {
  display: flex;
  height: 100%;
}

.noCustomerContent {
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
