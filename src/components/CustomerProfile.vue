<template>
  <div
    :class="profilePageGoMobile && !isMobile ? 'overflow-scroll-medium' : ''"
  >
    <!-- mobile toolbar -->
    <v-row v-if="isMobile" class="pa-5 pb-0">
      <v-btn
        v-show="customerSelected"
        flat
        icon="mdi-chevron-left"
        @click="goBack()"
      />
    </v-row>
    <!-- toolbar -->
    <v-row
      align="center"
      :class="['overflow-scroll pb-0 pa-6', isMobile ? 'pt-0' : '']"
    >
      <div class="pa-3">
        <div class="text-h5">
          {{ customerSelected && customerInfo ? customerInfo.info.name : "" }}
        </div>
        <div class="text-caption">
          Customer ID:
          {{ customerSelected && customerInfo ? customerInfo.info.id : "" }}
        </div>
      </div>
      <div class="mb-5">
        <div v-if="customerInfo && customerInfo.status == 'Overdue'">
          <v-chip color="orange" text-color="white" class="mr-2">
            Overdue
          </v-chip>
        </div>
        <div v-else-if="customerInfo && customerInfo.status == 'Canceled'">
          <v-chip color="red" text-color="white" class="mr-2">
            Canceled
          </v-chip>
        </div>
        <div v-else>
          <v-chip color="green" text-color="white" class="mr-2">
            Active
          </v-chip>
        </div>
      </div>
      <v-spacer />
      <v-tooltip text="Save Profile" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn
            v-if="profilePageGoMobile"
            color="primary"
            flat
            icon="mdi-content-save"
            v-bind="props"
            class="mr-2"
            @click="updateProfile"
            :disabled="!canSaveProfile"
          />
          <v-btn
            v-else
            color="primary"
            flat
            v-bind="props"
            class="mr-2"
            @click="updateProfile"
            :disabled="!canSaveProfile"
            >Save Profile</v-btn
          >
        </template>
      </v-tooltip>

      <v-tooltip
        :text="fullscreen ? 'Exit Fullscreen' : 'Fullscreen'"
        location="bottom"
        v-if="customerSelected && !isMobile"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            flat
            :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
            @click="toggleFullScreen()"
          >
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip
        text="Close Profile"
        location="bottom"
        v-show="customerSelected && !isMobile && !fullscreen"
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" flat icon="mdi-close" @click="goBack()">
          </v-btn>
        </template>
      </v-tooltip>
    </v-row>
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
    <v-col sm="12" md="4" v-if="profilePageGoMobile">
      <Navbar @select-header="navigateToProfileHeader" isMobile />
    </v-col>
    <v-row class="pa-3 mt-0">
      <!-- navbar -->
      <v-col sm="12" md="4" v-if="!profilePageGoMobile">
        <Navbar ref="navbar" @select-header="navigateToProfileHeader" />
      </v-col>
      <!-- info -->
      <v-col sm="12" md="8">
        <div
          :class="[
            'info-scroll-window',
            !profilePageGoMobile ? 'overflow-scroll' : '',
          ]"
        >
          <CustomerInfo
            ref="customerInfo"
            :customerSelected="customerSelected"
            :customerID="customerID"
            @setCanSaveCustomerProfile="updateProfileCanSave"
            @accountCanceled="customerInfo.status = 'Canceled'"
            @accountReactivated="customerInfo.status = 'Active'"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import functions from "@/helpers/functions";
import { mapGetters } from "vuex";
import CustomerInfo from "./CustomerInfo.vue";
import Navbar from "./ProfileNavbar.vue";
// import store from "@/store";

export default {
  components: {
    CustomerInfo,
    Navbar,
  },
  props: {
    customerID: {
      type: Number,
      required: false,
    },
    customerSelected: {
      type: Boolean,
      required: true,
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
  },
  mixins: [functions],
  data() {
    return {
      customerInfo: [],
      fullscreen: false,
      autoScrolling: false,
      canSaveProfile: true,
      profilePageGoMobile: false,
      profilePageMobileThreshold: 960,
    };
  },
  computed: {
    ...mapGetters(["getCustomerInfo"]),
    // Define your computed properties here
  },
  created() {},
  mounted() {
    document
      .getElementsByClassName("info-scroll-window")[0]
      .addEventListener("scroll", this.handleScroll);
    this.profilePageGoMobile =
      window.innerWidth < this.profilePageMobileThreshold;
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    document
      .getElementsByClassName("info-scroll-window")[0]
      .removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    loadCustomerInfo() {
      this.customerInfo = this.getCustomerInfo(this.customerID);
      this.navigateToTopOfProfile();
    },
    updateProfile() {
      this.$refs["customerInfo"].updateCustomerInfo();
      //send updatedCustomerInfo to store to the editCustomerInfo mutation
      //console.log(updatedCustomerInfo);
      //this.$store.commit("editCustomerInfo", updatedCustomerInfo);
      this.$emit("updatedCustomerInfo");
    },
    goBack() {
      if (this.fullscreen) {
        this.$emit("toggleFullScreen");
      }
      this.fullscreen = false;
      1;
      this.$emit("closeCustomerProfile");
    },
    toggleFullScreen() {
      this.fullscreen = !this.fullscreen;
      this.$emit("toggleFullScreen");
    },
    updateProfileCanSave(canSave) {
      this.canSaveProfile = canSave;
    },
    handleResize() {
      this.profilePageGoMobile =
        window.innerWidth < this.profilePageMobileThreshold;
    },
    navigateToTopOfProfile() {
      let customerInfoWindow =
        document.getElementsByClassName("info-scroll-window")[0];
      let profileSections = document.getElementsByClassName("profile-section");
      let element = Array.from(profileSections)[0];
      const yOffset = this.isMobile ? -90 : -160;
      const y =
        element.getBoundingClientRect().top +
        customerInfoWindow.scrollTop +
        yOffset;
      if (!this.isMobile) {
        customerInfoWindow.scrollTo({ top: y, behavior: "instant" });
      } else {
        window.scrollTo({ top: y, behavior: "instant" });
      }
    },

    navigateToProfileHeader(headerIndex) {
      this.autoScrolling = true;
      this.$nextTick(() => {
        console.log(headerIndex);
        let profileSections =
          document.getElementsByClassName("profile-section");
        let customerInfoWindow =
          document.getElementsByClassName("info-scroll-window")[0];

        if (profileSections && profileSections.length > headerIndex) {
          // Convert the HTMLCollection to an array and get the element at the specified index
          var element = Array.from(profileSections)[headerIndex];
          const yOffset = this.isMobile ? -90 : -160;
          const y =
            element.getBoundingClientRect().top +
            customerInfoWindow.scrollTop +
            yOffset;

          if (!this.isMobile) {
            customerInfoWindow.scrollTo({ top: y, behavior: "smooth" });
          } else {
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      });
      this.autoScrolling = false;
    },
    handleScroll() {
      if (!this.autoScrolling) {
        let profileSections =
          document.getElementsByClassName("profile-section");
        let activeHeader = 0;
        for (let i = 0; i < profileSections.length; i++) {
          let inView = this.isScrolledIntoView(profileSections[i]);
          if (inView) {
            activeHeader = i;
          }
        }
        if (!this.isMobile) {
          this.updateNavBar(activeHeader);
        }
      }
    },
    updateNavBar(index) {
      this.$refs["navbar"].changeActiveHeader(index);
    },
    isScrolledIntoView(el) {
      var rect = el.getBoundingClientRect();
      return rect.top < 400;
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
.overflow-scroll {
  overflow-y: auto;
  max-height: 75vh;
}
.overflow-scroll-medium {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 62px);
}
</style>
