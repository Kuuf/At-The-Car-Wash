<template>
  <div>
    <v-form v-model="canSaveCustomerInfo">
      <!-- Account Info -->
      <div class="customer-info">
        <v-layout row align="center">
          <v-icon class="mt-1 mr-2">mdi-account</v-icon>
          <div class="text-h5 profile-section">Account Info</div>
        </v-layout>
        <v-divider class="mb-4 mt-4" />
        <div v-for="(value, key) in customerInfo.info" :key="key">
          <v-text-field
            :rules="[required]"
            :value="value"
            v-model="customerInfo.info[key]"
            :readonly="fieldDisabled(key)"
            ><template v-slot:label>
              <div class="capitalize">{{ key }}</div>
            </template>
          </v-text-field>
        </div>

        <!-- Vehicles -->

        <v-layout row align="center">
          <v-icon class="mt-9 mr-1">mdi-car</v-icon>

          <div class="text-h5 account-info-header profile-section">
            Vehicles
          </div>
        </v-layout>

        <v-divider class="mb-4 mt-4" />
        <div
          v-for="(vehicle, index) in customerInfo.vehicles"
          :key="vehicle.id"
        >
          <div v-if="!vehicle.is_deleted">
            <!-- Edit Vehicle -->
            <v-form
              ref="editVehicleForm"
              v-model="editVehicleFormValid"
              v-if="editedVehicleIndex == index && editedVehicleIndex != null"
            >
              <div
                sm="12"
                v-for="(value, key, index) in editedVehicle"
                :key="index"
              >
                <v-text-field
                  v-if="key != 'subscription' && key != 'is_deleted'"
                  :value="value"
                  v-model="editedVehicle[key]"
                  :readonly="fieldDisabled(key)"
                  :rules="[required]"
                >
                  <template v-slot:label>
                    <div class="capitalize">{{ key }}</div>
                  </template>
                </v-text-field>
              </div>

              <v-layout row align="center">
                <v-btn
                  @click="cancelEditVehicle"
                  elevation="0"
                  class="mr-2"
                  color="#f5f5f5"
                  >Cancel</v-btn
                >
                <v-btn
                  color="primary"
                  :disabled="!editVehicleFormValid"
                  @click="saveVehicle(index)"
                  elevation="0"
                  >Save</v-btn
                >
              </v-layout>
            </v-form>

            <v-layout row class="text-left" v-else>
              <div>
                <div class="text-h7 capitalize">
                  {{ vehicle.color }} {{ vehicle.make }} {{ vehicle.model }}
                </div>
                <div class="text-caption font-weight-light">
                  {{ vehicle.year }}, {{ vehicle.licensePlate }}, ID:
                  {{ vehicle.id }}
                </div>
              </div>
              <v-spacer />
              <v-btn
                v-if="!showConfirmDeleteVehicle[index]"
                flat
                icon="mdi-pencil"
                @click="editVehicle(index)"
              ></v-btn>
              <v-btn
                v-if="!showConfirmDeleteVehicle[index]"
                flat
                icon="mdi-delete"
                @click="showConfirmDeleteVehicle[index] = true"
              ></v-btn>
              <v-btn
                v-if="showConfirmDeleteVehicle[index]"
                elevation="0"
                color="gray"
                class="mr-2 mt-1 mb-2"
                @click="showConfirmDeleteVehicle[index] = false"
                >Cancel</v-btn
              >
              <v-btn
                v-if="showConfirmDeleteVehicle[index]"
                elevation="0"
                color="red"
                class="mt-1 mb-2"
                @click="deleteVehicle(index)"
                >Delete</v-btn
              >
            </v-layout>

            <v-divider class="mt-4 mb-4" />
          </div>
        </div>

        <!-- Add Vehicle -->

        <div v-show="addingVehicle">
          <v-layout row align="center">
            <v-icon class="mt-9 mr-1">mdi-car-cog</v-icon>

            <div class="text-h5 account-info-header">Add Vehicle</div>
          </v-layout>
          <v-divider class="mb-4 mt-4" />
          <v-form ref="addVehicleForm" v-model="addVehicleFormValid">
            <div v-for="(value, key, index) in addedVehicle" :key="index">
              <v-text-field
                v-if="key != 'subscription'"
                :value="value"
                v-model="addedVehicle[key]"
                :rules="[required]"
                :readonly="fieldDisabled(key)"
              >
                <template v-slot:label>
                  <div class="capitalize">{{ key }}</div>
                </template>
              </v-text-field>
            </div>
          </v-form>
        </div>
        <v-layout row align="baseline">
          <v-btn
            @click="cancelAddVehicle"
            elevation="0"
            class="mr-2"
            color="gray"
            v-show="addingVehicle"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            @click="addVehicle"
            v-show="addingVehicle"
            :disabled="!addVehicleFormValid"
            elevation="0"
            >Save</v-btn
          >
          <v-spacer />
          <v-btn
            color="primary mt-3 mb-4"
            @click="clickAddVehicle"
            elevation="0"
            v-show="!addingVehicle"
            ><v-icon class="mr-2">mdi-plus</v-icon>Add Vehicle</v-btn
          >
        </v-layout>

        <!-- Subscriptions -->

        <v-layout row align="center">
          <v-icon class="mt-9 mr-1">mdi-license</v-icon>
          <div class="text-h5 account-info-header profile-section">
            Subscriptions
          </div>
        </v-layout>

        <v-divider class="mb-4 mt-4" />
        <div
          v-for="(vehicle, index) in customerInfo.vehicles"
          :key="vehicle.id"
        >
          <div v-if="!vehicle.is_deleted">
            <div class="text-h7 capitalize">
              {{ vehicle.color }} {{ vehicle.make }} {{ vehicle.model }}
            </div>
            <div class="text-caption font-weight-light">
              {{ vehicle.year }}, {{ vehicle.licensePlate }}, ID:
              {{ vehicle.id }}
            </div>
          </div>
          <v-spacer />

          <v-layout
            row
            align="center"
            style="text-align: left"
            class="mt-2 mb-4"
            v-if="!vehicle.is_deleted"
          >
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

        <!-- Purchase History -->

        <v-layout row align="center">
          <v-icon class="mt-9 mr-1">mdi-history</v-icon>
          <div class="text-h5 account-info-header profile-section">
            Purchase History
          </div>
        </v-layout>
        <v-divider class="mb-4 mt-4" />
        <div v-for="purchase in customerInfo.purchaseHistory" :key="purchase">
          <div class="text-body-3">
            {{ purchase.name }}: ${{ purchase.price }}
          </div>

          <div class="text-caption">
            {{ purchase.date }}
          </div>
          <div class="text-caption capitalize">
            {{ concatVehicleInfo(getVehicleFromID(purchase.vehicle)) }}
          </div>

          <div class="dotted-divider"></div>
        </div>
        <v-layout row align="center">
          <v-icon class="mt-9 mr-1">mdi-cog</v-icon>
          <div class="text-h5 account-info-header profile-section">
            Account Settings
          </div>
        </v-layout>
        <v-divider class="mb-4 mt-4" />
        <v-btn>Cancel Account</v-btn>
      </div>
      <div style="height: 400px; width: 50px"></div>
    </v-form>
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
      addVehicleFormValid: false,
      editVehicleFormValid: false,
      subscriptions: [],
      editedVehicle: {},
      showConfirmDeleteVehicle: [],
      editedVehicleIndex: null,
      addingVehicle: false,
      addedVehicle: {},
      canSaveCustomerInfo: false,
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
    required(v) {
      return !!v || "Field is required";
    },
    load() {
      this.resetInfo();
      this.loadCustomerInfo();
      this.loadSubscriptions();
    },
    resetInfo() {
      this.editedVehicle = {};
      this.showConfirmDeleteVehicle = [];
      this.editedVehicleIndex = null;
      this.addingVehicle = false;
      this.addedVehicle = {};
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
      return `${vehicle.year} ${vehicle.color} ${vehicle.make} ${vehicle.model} ${vehicle.licensePlate}`;
    },
    getVehicleFromSubscription(subscription) {
      return this.customerInfo.vehicles.find(
        (vehicle) => vehicle.id === subscription.vehicle
      );
    },
    addVehicle() {
      this.addingVehicle = false;
      this.customerInfo.vehicles.push(this.addedVehicle);
      this.addedVehicle = {};
    },
    deleteVehicle(index) {
      console.log(index);
      this.customerInfo.vehicles[index].is_deleted = true;
      this.showConfirmDeleteVehicle[index] = false;
    },
    cancelAddVehicle() {
      this.addingVehicle = false;
      this.addedVehicle = {};
    },
    removeSubscription(index) {
      this.customerInfo.vehicles[index].subscription = null;
    },
    editVehicle(index) {
      this.editedVehicle = { ...this.customerInfo.vehicles[index] };
      this.editedVehicleIndex = index;
    },
    saveVehicle(index) {
      this.customerInfo.vehicles[index] = JSON.parse(
        JSON.stringify(this.editedVehicle)
      );
      this.editedVehicle = null;
      this.editedVehicleIndex = null;
    },
    cancelEditVehicle() {
      this.editedVehicle = null;
      this.editedVehicleIndex = null;
    },
    getVehicleFromID(id) {
      console.log(id);
      console.log(this.customerInfo.vehicles);
      return this.customerInfo.vehicles.find((vehicle) => vehicle.id === id);
    },
    clickAddVehicle() {
      this.addingVehicle = true;
      //set addedVehicle to object with default values
      this.addedVehicle = {
        id: this.customerInfo.vehicles.length + 1,
        year: null,
        make: null,
        model: null,
        color: null,
        licensePlate: null,
        subscription: null,
      };
      this.$refs.addVehicleForm.validate();
    },
  },

  watch: {
    customerSelected() {
      this.load();
    },
    customerID() {
      this.load();
    },
    canSaveCustomerInfo(value) {
      this.$emit("setCanSaveCustomerProfile", value);
    },
  },
};
</script>
<style scoped>
.capitalize {
  text-transform: capitalize !important;
}
</style>
