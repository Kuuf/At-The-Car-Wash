<template>
  <v-container>
    <v-row>
      <v-col v-show="showCustomerList">
        <CustomerFinder />
      </v-col>
      <v-col>
        <CustomerInfo />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomerFinder from "@/components/CustomerFinder.vue";
import CustomerInfo from "@/components/CustomerInfo.vue";
import functions from "@/helpers/functions";
import { mapGetters } from "vuex";
export default {
  components: {
    CustomerFinder,
    CustomerInfo,
  },
  props: {},
  mixins: [functions],
  computed: {
    ...mapGetters(["getCustomersBasicInfo"]),
    showCustomerList() {
      if (this.isMobile) {
        if (this.customerSelected) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
  },
  data() {
    return {
      customerSelected: false,
      isMobile: false,
    };
  },
  created() {
    // Execute code after the component is created
  },
  mounted() {
    // Check if the viewport width is below the threshold (e.g., 768px)
    this.isMobile = window.innerWidth < 768;

    // Listen for window resize to update the isMobile flag if needed
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    // Clean up the event listener when the component is destroyed
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      // Update the isMobile flag on window resize
      this.isMobile = window.innerWidth < 768;
      console.log(this.isMobile);
    },
  },
};
</script>
