<template>
  <v-app-bar class="grey-bottom-border" flat>
    <template v-slot:prepend>
      <v-img src="@/assets/AMP.png" width="80" class="ml-1"> </v-img>
    </template>
    <v-app-bar-title> {{ currentModule }}</v-app-bar-title>
    <v-spacer />
    <!--
    <v-btn icon="mdi-account-search-outline" color="primary"> </v-btn>
    -->
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      currentModule: "CSR Dashboard",
    };
  },
  methods: {
    test() {},
  },
};
</script>
