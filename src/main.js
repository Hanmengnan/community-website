import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAxios from "vue-axios";
import axios from "axios";
import functions from "./assets/js/GlobalFunction.js";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.use(functions);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
