import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#5693BB", // funfact: this is the hexcode from a VW Group paint color called "Miami Blue"
        secondary: "#0F1C1D",
      },
    },
  },
});

export default vuetify;
