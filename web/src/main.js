import Vue from "vue";
import App from "./App.vue";
import "./assets/css/style.scss";
import router from "./router";

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default global options } */ );

import "./assets/iconfont/iconfont.css";

import Card from "./components/Card";
Vue.component("m-card", Card);
import ListCard from "./components/ListCard";
Vue.component("m-list-card", ListCard);

import axios from "axios";
Vue.prototype.$http = axios.create({
  // baseURL: "http://localhost:3000/web/api"
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");