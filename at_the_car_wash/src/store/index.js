// store.js

import Vue from "vue";
import Vuex from "vuex";

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
            subscriptions: [
              {
                id: 1,
                name: "Gold Membership",
                price: 12.99,
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
          // Jane Doe
          {
            info: {
              id: 2,
              email: "jane@gmail.com",
              phone: "123-456-7890",
              name: "Jane Doe",
              address: "5678 Apple St",
              city: "Normaltown",
              state: "WY",
            },
            subscriptions: [
              {
                id: 2,
                name: "Bronze Membership",
                price: 6.99,
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
          // George Doe
          {
            info: {
              id: 3,
              email: "george@gmail.com",
              phone: "123-456-7890",
              name: "George Doe",
              address: "9012 Golden Rd",
              city: "Augusta",
              state: "GA",
            },
            subscriptions: [
              {
                id: 3,
                name: "Diamond Membership",
                price: 59.99,
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
