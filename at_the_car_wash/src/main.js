/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { createStore } from "vuex";
import "./style.css";

import { faker } from "@faker-js/faker";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      generatedCustomers: {},
      mobileThreshold: 600,
      count: 0,
      subscriptions: [
        {
          id: null,
          name: "No Subscription",
        },
        {
          id: 1,
          name: "Gold Membership",
          price: 12.99,
        },
        {
          id: 2,
          name: "Silver Membership",
          price: 9.99,
        },
        {
          id: 3,
          name: "Bronze Membership",
          price: 6.99,
        },
      ],
      accountStatuses: [
        {
          id: 1,
          name: "Active",
        },
        {
          id: 2,
          name: "Cancelled",
        },
        {
          id: 3,
          name: "Overdue",
        },
      ],
      purchases: [
        {
          id: 1,
          name: "Wash",
          price: 19.99,
        },
        {
          id: 2,
          name: "Wax & Wash",
          price: 25.99,
        },
        {
          id: 1,
          name: "Wax",
          price: 19.99,
        },
      ],
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    editCustomer(state, updatedCustomer) {
      updatedCustomer = JSON.parse(updatedCustomer);
      const customer = state.generatedCustomers.find(
        (customer) => customer.info.id === updatedCustomer.info.id
      );
      //set the entire customer object in the state to the updatedCustomer
      if (customer) {
        customer.info = updatedCustomer.info;
        customer.vehicles = updatedCustomer.vehicles;
        customer.subscriptions = updatedCustomer.subscriptions;
        customer.purchaseHistory = updatedCustomer.purchaseHistory;
      }
    },
    generateCustomers(state) {
      console.log("generating customers");
      let numCustomers = 100;
      let customers = [];

      for (let i = 0; i < numCustomers; i++) {
        let numPurchases = faker.number.int({ min: 1, max: 10 });
        let numVehicles = faker.number.int({ min: 1, max: 3 });

        // Get customer info
        let info = {
          id: faker.number.int({ min: 1, max: 10000000 }),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
        };

        // Generate vehicles
        let vehicles = Array.from({ length: numVehicles }, () => ({
          id: faker.number.int({ min: 1, max: 10000000 }),
          make: faker.vehicle.manufacturer(),
          model: faker.vehicle.model(),
          color: faker.vehicle.color(),
          licensePlate: faker.vehicle.vrm(),
          subscription: faker.number.int({ min: 1, max: 3 }),
          year: 2015,
        }));

        // Generate purchase history
        let purchaseHistory = [];
        for (let k = 0; k < numPurchases; k++) {
          const randomVehicleIndex = faker.number.int({
            min: 0,
            max: numVehicles - 1,
          });
          const vehicleID = vehicles[randomVehicleIndex].id;

          let purchase = JSON.parse(
            JSON.stringify(
              state.purchases[
                faker.number.int({ min: 0, max: state.purchases.length - 1 })
              ]
            )
          );

          // Create a new object for purchase.vehicle
          purchase.vehicle = vehicleID;
          purchase.date = faker.date.past().toString().substring(0, 10);
          purchaseHistory.push(purchase);
        }

        let status =
          state.accountStatuses[
            faker.number.int({ min: 0, max: state.accountStatuses.length - 1 })
          ];

        let customer = {
          info: info,
          status: status,
          vehicles: vehicles,
          purchaseHistory: purchaseHistory,
        };

        customers.push(customer);
      }
      state.generatedCustomers = customers;
    },
  },

  getters: {
    getCount(state) {
      return state.count;
    },
    getCustomersAllInfo(state) {
      return state.generatedCustomers;
    },
    getCustomersBasicInfo(state) {
      return state.generatedCustomers.map((customer) => customer.info);
    },
    getCustomerObject: (state) => (id) => {
      return state.generatedCustomers.find(
        (customer) => customer.info.id === id
      );
    },
    getCustomerInfo: (state, getters) => (id) => {
      return getters.getCustomerObject(id);
    },
    getCustomerSubscriptionsInfo: (state, getters) => (id) => {
      return getters.getCustomerObject(id).subscriptions;
    },
    getCustomerCarWashPurchaseHistory: (state, getters) => (id) => {
      return getters.getCustomerObject(id).purchaseHistory;
    },
    getMobileThreshold(state) {
      return state.mobileThreshold;
    },
    getSubscription(state, id) {
      return state.subscriptions.find((subscription) => subscription.id === id);
    },
    getSubscriptions(state) {
      return state.subscriptions;
    },
  },
});

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);
app.use(store);

registerPlugins(app);

app.mount("#app");
