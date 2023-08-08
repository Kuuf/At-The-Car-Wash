<template>
  <div class="white-container" style="min-height: 90vh">
    <div class="pa-3 primary-background">
      <v-row no-gutters>
        <v-col sm="6">
          <v-text-field
            v-model="search"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            class="mt-2 pr-1"
            @keyup="searchCustomers"
            @change="searchCustomers"
            bg-color="white"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col sm="6">
          <v-select
            v-model="searchBy"
            variant="outlined"
            class="mt-2 pl-1"
            :items="headers"
            item-title="text"
            item-value="value"
            bg-color="white"
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <v-divider />
    <div class="overflow-scroll">
      <div
        v-for="customer in customers"
        :key="customer.id"
        class="customer-row"
        @click="selectCustomer(customer.id)"
      >
        <CustomerInfoCard
          :customerInfo="customer"
          :headers="headers"
          :isSelected="customer.id === selectedCustomerID"
        />
        <v-divider />
      </div>
      <div v-if="customers.length === 0" class="text-body-2 pa-3">
        No customers found
      </div>
    </div>
  </div>
</template>

<script>
import functions from "@/helpers/functions";
import CustomerInfoCard from "./CustomerInfoCard.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    CustomerInfoCard,
  },
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
  mixins: [functions],
  data() {
    return {
      customers: [],
      headers: [],
      search: "",
      searchBy: "name",
      selectedCustomerID: null,
    };
  },
  computed: {
    ...mapGetters(["getCustomersBasicInfo"]),
  },
  created() {
    this.loadTable();
    this.buildHeaders();
  },
  mounted() {},
  methods: {
    loadTable() {
      this.customers = this.getCustomersBasicInfo;
    },
    buildHeaders() {
      const headers = [];
      for (const key in this.customers[0]) {
        // set text to captialize first letter
        const text = key.charAt(0).toUpperCase() + key.slice(1);
        headers.push({
          text: text,
          value: key,
        });
      }
      this.headers = headers;
    },
    selectCustomer(id) {
      this.selectedCustomerID = id;
      this.$emit("customer-selected", id);
    },

    searchCustomers() {
      // if search is empty, set customers to all customers
      if (this.search === "") {
        this.customers = this.getCustomersBasicInfo;
      } else {
        // get customers from search
        const customers = this.getCustomersBasicInfo.filter((customer) => {
          let customerData = customer[this.searchBy].toString().toLowerCase();
          return customerData.indexOf(this.search.toLowerCase()) > -1;
        });
        this.customers = customers;
      }
    },
  },

  watch: {
    searchBy() {
      this.searchCustomers();
    },
  },
};
</script>
<style scoped>
.table-header {
  padding-left: 16px;
}
.customer-row:hover {
  background-color: var(--v-red-base);
  cursor: pointer;
}
.overflow-scroll {
  overflow-y: auto;
  max-height: calc(100vh - 155px);
}
</style>
