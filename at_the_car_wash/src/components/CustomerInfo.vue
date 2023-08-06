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
      <v-layout row align="center">
        <v-icon class="mt-1 mr-2">mdi-account</v-icon>
        <div class="text-h5 profile-section">Account Info</div>
      </v-layout>
      <v-divider class="mb-4 mt-1" />
      <div v-for="(value, key) in customerInfo.info" :key="key">
        <v-text-field
          :value="value"
          v-model="customerInfo.info[key]"
          :readonly="fieldDisabled(key)"
          ><template v-slot:label>
            <div class="info-label">{{ key }}</div>
          </template>
        </v-text-field>
      </div>
      <v-layout row align="center">
        <v-icon class="mt-5 mr-1">mdi-car</v-icon>

        <div class="text-h5 account-info-header profile-section">Vehicles</div>
        <v-spacer />
        <v-btn color="primary mt-3" @click="addVehicle" elevation="0"
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
            v-if="key != 'subscription'"
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
      <v-layout row align="center">
        <v-icon class="mt-5 mr-1">mdi-license</v-icon>
        <div class="text-h5 account-info-header profile-section">
          Subscriptions
        </div>
      </v-layout>
      <v-divider class="mb-4 mt-1" />
      <div v-for="(vehicle, index) in customerInfo.vehicles" :key="vehicle.id">
        <div>
          <div class="text-caption">Vehicle {{ vehicle.id }}</div>
          <div class="text-body1">
            {{ concatVehicleInfo(vehicle) }}
          </div>
        </div>
        <v-spacer />

        <v-layout row align="center" style="text-align: left" class="mt-2 mb-4">
          <v-select
            v-model="vehicle.subscription"
            :items="subscriptions"
            item-title="name"
            item-value="id"
          />
          <v-btn
            flat
            class="mt-1"
            icon="mdi-delete"
            v-show="vehicle.subscription != null"
            @click="removeSubscription(index)"
          />
        </v-layout>
      </div>
      <v-layout row align="center">
        <v-icon class="mt-5 mr-1">mdi-history</v-icon>
        <div class="text-h5 account-info-header profile-section">
          Purchase History
        </div>
      </v-layout>
      <v-divider class="mb-4 mt-1" />
      <div v-for="purchase in customerInfo.purchaseHistory" :key="purchase">
        <v-layout row align="center" sm="6">
          <div class="text-body-3 mr-1">{{ purchase.name }}</div>
          <div class="text-body-2">{{ purchase.price }}</div>
        </v-layout>
        <div class="text-caption">
          {{ purchase.date }}
        </div>
      </div>
      <v-layout row align="center">
        <v-icon class="mt-5 mr-1">mdi-airballoon</v-icon>
        <div class="text-h5 account-info-header profile-section">
          Lorem Ipsum
        </div>
      </v-layout>
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
      subscriptions: [],
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
    load() {
      this.loadCustomerInfo();
      this.loadSubscriptions();
    },
    loadCustomerInfo() {
      this.customerInfo = JSON.parse(
        JSON.stringify(this.getCustomerInfo(this.customerID))
      );
    },
    loadSubscriptions() {
      this.subscriptions = this.$store.getters.getSubscriptions;
    },
    fieldDisabled(key) {
      return key === "id" || key === "subscription";
    },
    updateCustomerInfo() {
      console.log(this.customerInfo);
      this.$store.commit("editCustomer", JSON.stringify(this.customerInfo));
    },
    concatVehicleInfo(vehicle) {
      return `${vehicle.year} ${vehicle.color} ${vehicle.make} ${vehicle.model}`;
    },
    getVehicleFromSubscription(subscription) {
      return this.customerInfo.vehicles.find(
        (vehicle) => vehicle.id === subscription.vehicle
      );
    },
    addVehicle() {
      console.log("add vehicle");
    },
    removeSubscription(index) {
      this.customerInfo.vehicles[index].subscription = null;
    },
  },

  watch: {
    customerSelected() {
      this.load();
    },
    customerID() {
      this.load();
    },
  },
};
</script>
<style scoped>
.info-label {
  text-transform: capitalize;
}
</style>
