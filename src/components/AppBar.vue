<template>
  <v-app-bar class="grey-bottom-border" flat>
    <template v-slot:prepend>
      <v-img src="@/assets/sunny_cup.png" height="40" width="40"> </v-img>
    </template>
    <v-app-bar-title> {{ currentModule }}</v-app-bar-title>
    <v-spacer />
    <v-btn icon="mdi-account-search-outline" color="primary"> </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      currentModule: "Customer Dashboard",
    };
  },
  methods: {},
};
</script>
