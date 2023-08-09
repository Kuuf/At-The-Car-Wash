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
            v-if="key != 'id' && key != 'status'"
            :rules="required"
            :type="customerInfo.infoTypes[key]"
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
        <div v-if="!customerHasVisibleVehicles" class="text-body-2">
          Customer has no vehicles
        </div>
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
                  v-if="
                    key != 'subscription' && key != 'is_deleted' && key != 'id'
                  "
                  :value="value"
                  :type="customerInfo.vehicleInfoTypes[key]"
                  v-model="editedVehicle[key]"
                  :rules="required"
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
              <v-tooltip text="Edit Vehicle" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    v-if="!showConfirmDeleteVehicle[index]"
                    flat
                    icon="mdi-pencil"
                    @click="editVehicle(index)"
                  ></v-btn>
                </template>
              </v-tooltip>
              <v-tooltip
                text="Delete Vehicle"
                location="top"
                v-if="!showConfirmDeleteVehicle[index]"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon="mdi-delete"
                    flat
                    @click="showConfirmDeleteVehicle[index] = true"
                  ></v-btn>
                </template>
              </v-tooltip>
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
                variant="outlined"
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
                v-if="key != 'subscription' && key != 'id'"
                :value="value"
                :type="customerInfo.vehicleInfoTypes[key]"
                v-model="addedVehicle[key]"
                :rules="required"
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
            <v-menu v-if="vehicle.subscription != null">
              <template v-slot:activator="{ props: menu }">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                      v-bind="mergeProps(menu, tooltip)"
                      flat
                      icon="mdi-file-move-outline"
                      class="ml-2 mt-1"
                    >
                    </v-btn>
                  </template>
                  <span>Transfer Subscription</span>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title class="text-body" style="color: #b1b1b1"
                    >Transfer subscription to:
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-for="(
                    vehicle, transferToIndex
                  ) in getVehiclesCanTransferSubscriptionTo(index)"
                  :v-show="index != transferToIndex"
                  :key="transferToIndex"
                  @click="transferSubscription(index, vehicle.id)"
                >
                  <v-list-item-title class="capitalize"
                    >{{ vehicle.color }} {{ vehicle.make }} {{ vehicle.model }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-tooltip
              text="Remove Subscription"
              location="top"
              v-if="vehicle.subscription != null"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  flat
                  class="mt-1"
                  icon="mdi-delete"
                  @click="removeSubscription(index)"
                />
              </template>
            </v-tooltip>
          </v-layout>
        </div>
        <div v-if="!customerHasVisibleVehicles" class="text-body-2">
          Customer has no subscriptions
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

        <v-btn
          v-if="showConfirmCancel"
          @click="showConfirmCancel = false"
          variant="outlined"
          class="mr-2"
          >Nevermind</v-btn
        >
        <v-btn
          v-if="showConfirmCancel"
          @click="confirmCancelAccount"
          flat
          variant="outlined"
          color="red"
          :class="['mr-2', isMobile ? 'mt-2' : '']"
          >Confirm Cancel Account</v-btn
        >
        <v-btn
          v-else-if="customerInfo && customerInfo.status == 'Active'"
          variant="outlined"
          color="red"
          @click="showConfirmCancel = true"
          >Cancel Account</v-btn
        >
        <div
          class="text-body-2 mt-3"
          v-if="customerInfo && customerInfo.status == 'Active'"
        >
          Be absolutely sure you want to cancel this account. The customer will
          immediately lose access to their subscription.
        </div>
        <div v-else>
          <v-btn variant="outlined" color="green" @click="reactivateAccount"
            >Reactivate Account</v-btn
          >
          <div class="text-body-2 mt-3">
            Reactivating this account will restore the customer's subscription
          </div>
        </div>
      </div>
      <div style="height: 400px; width: 50px"></div>
    </v-form>
  </div>
</template>

<script>
import functions from "@/helpers/functions";
import { mapGetters } from "vuex";
import { mergeProps } from "vue";
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
    isMobile: {
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
      vehicleMenu: [],
      showConfirmCancel: false,
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod.",
    };
  },
  computed: {
    ...mapGetters(["getCustomerInfo"]),
    required() {
      const rules = [];
      //if v is not a string, just ensure it is not null
      if (typeof v !== "string") {
        rules.push((v) => !!v || "Required");
        return rules;
      }
      //form empty rule
      rules.push((v) => (!!v && v.trim() != "") || "Required");

      return rules;
    },
    customerHasVisibleVehicles() {
      return (
        this.customerInfo &&
        this.customerInfo.vehicles &&
        this.customerInfo.vehicles.filter((vehicle) => !vehicle.is_deleted)
          .length > 0
      );
    },
  },
  created() {},
  mounted() {
    // Execute code after the component is mounted
  },
  methods: {
    mergeProps,
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
      this.showConfirmCancel = false;
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
    transferSubscription(index, vehicleID) {
      let transferToIndex = this.customerInfo.vehicles.findIndex(
        (vehicle) => vehicle.id === vehicleID
      );
      this.customerInfo.vehicles[transferToIndex].subscription = JSON.parse(
        JSON.stringify(this.customerInfo.vehicles[index].subscription)
      );
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
    getVehiclesCanTransferSubscriptionTo(index) {
      return this.customerInfo.vehicles.filter(
        (vehicle) => vehicle.id !== this.customerInfo.vehicles[index].id
      );
    },
    formatPhoneNumber() {
      // Remove any non-digit characters from the input using a regular expression
      let cleanedNumber = this.phoneNumber.replace(/\D/g, "");

      // Check if the number is greater than 10 digits and trim it to the first 10 digits
      if (cleanedNumber.length > 10) {
        cleanedNumber = cleanedNumber.substr(0, 10);
      }

      // Format the number in the "xxx-xxx-xxxx" format
      let formattedNumber = "";
      for (let i = 0; i < cleanedNumber.length; i++) {
        if (i === 3 || i === 6) {
          formattedNumber += "-";
        }
        formattedNumber += cleanedNumber[i];
      }

      // Update the v-model with the formatted phone number
      this.customerInfo.phone = formattedNumber;
    },
    confirmCancelAccount() {
      this.showConfirmCancel = false;
      this.customerInfo.status = "Canceled";
      this.$store.commit(
        "updateAccountStatus",
        JSON.stringify({ id: this.customerInfo.info.id, status: "Canceled" })
      );
      this.$emit("accountStatusChanged", "Canceled");
    },
    reactivateAccount() {
      this.customerInfo.status = "Active";
      this.$store.commit(
        "updateAccountStatus",
        JSON.stringify({ id: this.customerInfo.info.id, status: "Active" })
      );
      this.$emit("accountStatusChanged", "Active");
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
