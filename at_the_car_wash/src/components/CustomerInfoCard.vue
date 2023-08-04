<template>
  <div class="simple-border-container">
    <v-row justify="start" no-gutters>
      <v-col v-for="(header, index) in headers" :key="header" sm="6" lg="6">
        <div class="text-left text-caption">{{ header.text }}</div>
        <div class="text-left text-body-1 overflow-ellipsis">
          {{ customerInfo[header.value] }}
        </div>
        <v-responsive width="100%" v-if="index % 2 == 0"></v-responsive>
      </v-col>
    </v-row>
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
