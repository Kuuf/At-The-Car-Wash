<template>
  <div>
    <!-- mobile toolbar -->

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

    <div class="customer-info">
      <div class="text-h5 profile-section">Account Info</div>
      <v-divider class="mb-4 mt-1" />
      <div v-for="(value, key) in customerInfo.info" :key="key">
        <div class="text-caption" style="text-transform: capitalize !important">
          {{ key }}
        </div>
        <v-text-field
          :value="value"
          v-model="customerInfo.info[key]"
          :readonly="fieldDisabled(key)"
        />
      </div>
      <v-layout row align="center">
        <div class="text-h5 account-info-header profile-section">Vehicles</div>
        <v-spacer />
        <v-btn color="primary mt-3" @click="addVehicle"
          ><v-icon class="mr-2">mdi-plus</v-icon>Add Vehicle</v-btn
        >
      </v-layout>

      <v-divider class="mb-4 mt-1" />
      <v-row
        v-for="(vehicle, index) in customerInfo.vehicles"
        :key="vehicle.id"
      >
        <v-col
          sm="12"
          md="6"
          v-for="(value, key, index) in vehicle"
          :key="index"
        >
          <v-text-field
            :value="value"
            v-model="vehicle[key]"
            :readonly="fieldDisabled(key)"
          >
            <template v-slot:label>
              <div class="info-label">{{ key }}</div>
            </template>
          </v-text-field>
        </v-col>
        <v-divider
          v-if="index < customerInfo.vehicles.length - 1"
          class="mb-4"
        />
      </v-row>

      <div class="text-h5 account-info-header profile-section">
        Subscriptions
      </div>
      <v-divider class="mb-4 mt-1" />
      <div class="text-body-3">{{ lorem }}</div>
      <div class="text-h5 account-info-header profile-section">
        Purchase History
      </div>
      <v-divider class="mb-4 mt-1" />
      <div class="text-body-3">{{ lorem }}</div>
      <div class="text-h5 account-info-header profile-section">Lorem Ipsum</div>
      <v-divider class="mb-4 mt-1" />
      <div class="text-body-3">{{ lorem }}</div>
    </div>
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
      required: false,
    },
    customerSelected: {
      type: Boolean,
      required: true,
    },
  },
  mixins: [functions],
  data() {
    return {
      customerInfo: {},
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod.",
    };
  },
  computed: {
    ...mapGetters(["getCustomerInfo"]),
  },
  created() {},
  mounted() {
    // Execute code after the component is mounted
  },
  methods: {
    loadCustomerInfo() {
      this.customerInfo = JSON.parse(
        JSON.stringify(this.getCustomerInfo(this.customerID))
      );
    },
    fieldDisabled(key) {
      return key === "id";
    },
    updateCustomerInfo() {
      console.log(this.customerInfo);
      this.$store.commit("editCustomer", JSON.stringify(this.customerInfo));
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
.info-label {
  text-transform: capitalize;
}
</style>
