/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#ef233c",
          secondary: "#fbd8da",
          red: "#EC4339",
          green: "#7CB82F",
          orange: "#F47B16",
          gray: "#86898C",
          lightGray: "#F5F5F5",
        },
      },
    },
  },
  customProperties: true,
});
