<template>
  <div
    :class="[
      'pa-4 hover-secondary customer-info-card',
      isSelected ? 'secondary-left-border' : '',
    ]"
  >
    <!--
        id: 3,
        name: "George Doe",
        email: "george@gmail.com",
        phone: "123-456-7890",
        address: "1234 Main St",
        city: "Anytown",
        state: "CA",
      -->
    <v-layout row align="center" justify="left" class="text-left">
      <div class="text-h7 bold text-primary">{{ customerInfo.name }}</div>
      <v-spacer />
      <div class="text-caption-1 font-weight-light">
        ID: {{ customerInfo.id }}
      </div>
    </v-layout>

    <div class="text-body-2 font-weight-light">{{ customerInfo.email }}</div>
    <div class="text-caption font-weight-light">{{ customerInfo.phone }}</div>
    <div class="text-caption font-weight-light">
      {{ customerInfo.address }}, {{ customerInfo.city }},
      {{ customerInfo.state }}
    </div>
    <div v-if="customerInfo.status == 'Canceled'">
      <v-chip color="red" text-color="white" class="mr-2 mt-3">
        Canceled
      </v-chip>
    </div>
    <div v-else-if="customerInfo.status == 'Overdue'">
      <v-chip color="orange" text-color="white" class="mr-2 mt-3">
        Overdue
      </v-chip>
    </div>
  </div>
</template>

<script>
import functions from "@/helpers/functions";
export default {
  props: {
    customerInfo: {
      type: Object,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  mixins: [functions],
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    click() {
      this.$emit("click");
    },
  },

  watch: {},
};
</script>
<style scoped></style>
