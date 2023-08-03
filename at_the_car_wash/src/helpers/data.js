export default {
  /*
        These methods return stub data for the customer info, purchases, subscriptions, and car wash purchase history.
        They will be used in place of a typical API call to a backend service.
    */
  methods: {
    getCustomerObject(id) {
      return this.data.customers.find((customer) => customer.info.id === id);
    },
    getCustomerInfo(id) {
      return this.getCustomerObject(id).info;
    },
    getCustomerSubscriptionsInfo(id) {
      return this.getCustomerObject(id).subscriptions;
    },
    getCustomerCarWashPurchaseHistory(id) {
      return this.getCustomerObject(id).purchaseHistory;
    },
  },

  data: {
    // list 3 of customers
    /// each has an id, name, address, city, state, zip
    // list of purchases
    /// each has an id, name, price
    // list of subscriptions
    /// each has an id, name, price
    // list of car wash purchase history
    /// each has an id, name, price
    customers: [
      // John Doe
      {
        info: {
          id: 1,
          name: "John Doe",
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
};
