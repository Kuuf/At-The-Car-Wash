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

// Create a new store instance.
const store = createStore({
  state() {
    return {
      mobileThreshold: 600,
      count: 0,
      customers: [
        // John Doe
        {
          info: {
            id: 4723819056,
            name: "John Doe",
            email: "john@gmail.com",
            phone: "123-456-7890",
            address: "1234 Main St",
            city: "Anytown",
            state: "CA",
          },
          vehicles: [
            {
              id: 1,
              make: "Honda",
              model: "Civic",
              year: 2015,
              color: "Black",
              licensePlate: "ABC123",
            },
            {
              id: 2,
              make: "Volkswagen",
              model: "Jetta",
              year: 2024,
              color: "Brown",
              licensePlate: "RTF6738",
            },
          ],
          subscriptions: [
            {
              id: 1,
              name: "Gold Membership",
              price: 12.99,
              vehicle: 1,
            },
          ],
          purchaseHistory: [
            {
              id: 1,
              name: "Wash",
              price: 19.99,
            },
            {
              id: 2,
              name: "Wax & Wash",
              price: 29.99,
            },
            {
              id: 1,
              name: "Wax",
              price: 19.99,
            },
          ],
        },
        {
          info: {
            id: 957389267,
            name: "Jane Doe",
            email: "jane@gmail.com",
            phone: "123-456-7890",
            address: "1234 Main St",
            city: "Anytown",
            state: "CA",
          },
          vehicles: [
            {
              id: 1,
              make: "Honda",
              model: "Civic",
              year: 2015,
              color: "Black",
              licensePlate: "ABC123",
            },
          ],
          subscriptions: [
            {
              id: 1,
              name: "Gold Membership",
              price: 12.99,
              vehicle: 1,
            },
          ],
          purchaseHistory: [
            {
              id: 1,
              name: "Wash",
              price: 19.99,
            },
            {
              id: 2,
              name: "Wax & Wash",
              price: 29.99,
            },
            {
              id: 1,
              name: "Wax",
              price: 19.99,
            },
          ],
        },
        {
          info: {
            id: 5672946578,
            name: "George Doe",
            email: "george@gmail.com",
            phone: "123-456-7890",
            address: "1234 Main St",
            city: "Anytown",
            state: "CA",
          },
          vehicles: [
            {
              id: 1,
              make: "Honda",
              model: "Civic",
              year: 2015,
              color: "Black",
              licensePlate: "ABC123",
            },
          ],
          subscriptions: [
            {
              id: 1,
              name: "Gold Membership",
              price: 12.99,
              vehicle: 1,
            },
          ],
          purchaseHistory: [
            {
              id: 1,
              name: "Wash",
              price: 19.99,
            },
            {
              id: 2,
              name: "Wax & Wash",
              price: 29.99,
            },
            {
              id: 1,
              name: "Wax",
              price: 19.99,
            },
          ],
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
      console.log(updatedCustomer);
      const customer = state.customers.find(
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
    addCustomerSubscription(state, id, subscription) {
      const customer = state.customers.find(
        (customer) => customer.info.id === id
      );
      if (customer) {
        customer.subscriptions.push(subscription);
      }
    },
    removeCustomerSubscription(state, id, subscription) {
      const customer = state.customers.find(
        (customer) => customer.info.id === id
      );
      if (customer) {
        customer.subscriptions = customer.subscriptions.filter(
          (sub) => sub.id !== subscription.id
        );
      }
    },
    transferCustomerSubscription(state, id, subscription) {
      const customer = state.customers.find(
        (customer) => customer.info.id === id
      );
      if (customer) {
        customer.subscriptions.push(subscription);
      }
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },
    getCustomersAllInfo(state) {
      return state.customers;
    },
    getCustomersBasicInfo(state) {
      return state.customers.map((customer) => customer.info);
    },
    getCustomerObject: (state) => (id) => {
      return state.customers.find((customer) => customer.info.id === id);
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
  },
});

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);
app.use(store);

registerPlugins(app);

app.mount("#app");
