<template>
  <div>
    <!-- mobile toolbar -->

    <!-- info bOIII -->
    <!--
      id: 3,
      name: "George Doe",
      email: "george@gmail.com",
      phone: "123-456-7890",
      address: "1234 Main St",
      city: "Anytown",
      state: "CA",
    -->

    <div>
      <div class="text-h5 profile-section">Account Info</div>
      <v-divider class="mb-4 mt-1" />
      <v-text-field
        v-for="(value, key) in customerInfo.info"
        :key="key"
        :value="value"
        v-model="customerInfo.info[key]"
      >
        <template v-slot:label>
          <div class="info-label">{{ key }}</div>
        </template>
      </v-text-field>
      <div class="text-h5 account-info-header profile-section">Vehicles</div>
      <v-divider class="mb-4 mt-1" />
      <div class="text-body-3">{{ lorem }}</div>
      <div class="text-h5 account-info-header profile-section">
        Subscriptions
      </div>
      <v-divider class="mb-4 mt-1" />
      <div class="text-body-3">{{ lorem }}</div>
      <div class="text-h5 account-info-header profile-section">
        Purchase History
      </div>
      <v-divider class="mb-4 mt-1" />
      <div class="text-body-3">{{ lorem }}</div>
      <div class="text-h5 account-info-header profile-section">Lorem Ipsum</div>
      <v-divider class="mb-4 mt-1" />
      <div class="text-body-3">{{ lorem }}</div>
    </div>
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
      customerInfo: [],
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipi sicing elit. Quisquam, quod.",
    };
  },
  computed: {
    ...mapGetters(["getCustomerInfo"]),
    // Define your computed properties here
  },
  created() {},
  mounted() {
    // Execute code after the component is mounted
  },
  methods: {
    loadCustomerInfo() {
      this.customerInfo = this.getCustomerInfo(this.customerID);
    },
  },

  watch: {
    customerSelected() {
      this.loadCustomerInfo();
    },
    customerID() {
      this.loadCustomerInfo();
    },
  },
};
</script>
<style scoped>
.info-label {
  text-transform: capitalize;
}
</style>
