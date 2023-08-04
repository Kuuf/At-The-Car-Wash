<template>
  <div :class="[isMobile ? '' : 'simple-border-container']">
    <div class="text-h7">Customer Search</div>
    <v-row>
      <v-col sm="6">
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          class="mt-2"
          @keyup="searchCustomers"
          @change="searchCustomers"
        ></v-text-field>
      </v-col>
      <v-col sm="6">
        <v-select
          v-model="searchBy"
          label="Search By"
          variant="outlined"
          class="mt-2"
          :items="headers"
          item-title="text"
          item-value="value"
        ></v-select>
      </v-col>
    </v-row>
    <v-table class="overflow-scroll">
      <tbody>
        <div
          v-for="customer in customers"
          :key="customer.id"
          class="customer-row"
          @click="selectCustomer(customer.id)"
        >
          <CustomerInfoCard :customerInfo="customer" :headers="headers" />
        </div>
      </tbody>
    </v-table>
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
      searchBy: "id",
    };
  },
  computed: {
    ...mapGetters(["getCustomersBasicInfo"]),
  },
  created() {
    this.customers = this.getCustomersBasicInfo;
    this.buildHeaders();
  },
  mounted() {},
  methods: {
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
  background-color: #f8f8f8;
  cursor: pointer;
}
.overflow-scroll {
  overflow-y: auto;
  max-height: calc(100vh - 240px);
}
</style>
