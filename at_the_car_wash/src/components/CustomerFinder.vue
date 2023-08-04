<template>
  <v-container class="table">
    <div class="pl-3">Customer Search</div>
    <v-row class="pl-3 mt-1">
      <v-col sm="6" md="3">
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          class="mt-2"
          @keyup="searchCustomers"
        ></v-text-field>
      </v-col>
      <v-col sm="6" md="3">
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
    <v-table>
      <thead>
        <th
          v-for="header in headers"
          :key="header"
          class="text-left table-header pt-2 pb-2"
        >
          {{ header.text }}
        </th>
      </thead>

      <tbody>
        <tr
          v-for="customer in customers"
          :key="customer.id"
          class="customer-row"
          @click="selectCustomer(customer.id)"
        >
          <td
            v-for="header in headers"
            :key="header"
            class="text-left table-data pt-6 pb-6"
          >
            {{ customer[header.value] }}
          </td>
          <td>
            <v-btn
              flat
              icon="mdi-pencil"
              @click="selectCustomer((editButtonPressed = true))"
            >
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import functions from "@/helpers/functions";
import { mapGetters } from "vuex";

export default {
  props: {},
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

  watch: {},
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
.table {
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
