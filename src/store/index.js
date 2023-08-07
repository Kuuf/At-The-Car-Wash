// store.js

import Vue from "./node_modules/vue/dist/vue";
import Vuex from "./node_modules/vuex/types/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    customers: {
      getters: {
        getCustomersAllInfo(state) {
          return state.list;
        },
        getCustomersBasicInfo(state) {
          return state.list.map((customer) => customer.info);
        },
        getCustomerObject: (state) => (id) => {
          return state.list.find((customer) => customer.info.id === id);
        },
        getCustomerInfo: (state, getters) => (id) => {
          return getters.getCustomerObject(id).info;
        },
        getCustomerSubscriptionsInfo: (state, getters) => (id) => {
          return getters.getCustomerObject(id).subscriptions;
        },
        getCustomerCarWashPurchaseHistory: (state, getters) => (id) => {
          return getters.getCustomerObject(id).purchaseHistory;
        },
      },
      mutations: {
        editCustomerInfo(state, { id, info }) {
          const customer = state.list.find(
            (customer) => customer.info.id === id
          );
          if (customer) {
            customer.info = { ...customer.info, ...info };
          }
        },
        addCustomerSubscription(state, { id, subscription }) {
          const customer = state.list.find(
            (customer) => customer.info.id === id
          );
          if (customer) {
            customer.subscriptions.push(subscription);
          }
        },
        removeCustomerSubscription(state, { id, subscription }) {
          const customer = state.list.find(
            (customer) => customer.info.id === id
          );
          if (customer) {
            customer.subscriptions = customer.subscriptions.filter(
              (sub) => sub.id !== subscription.id
            );
          }
        },
        transferCustomerSubscription(state, { id, subscription }) {
          const customer = state.list.find(
            (customer) => customer.info.id === id
          );
          if (customer) {
            customer.subscriptions.push(subscription);
          }
        },
      },
      state: {
        customers: [
          // John Doe
          {
            info: {
              id: 1,
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
      },
    },
  },
});

export default store;
