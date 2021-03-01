import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import App from './App.vue';
import router from './router';

Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper);
Vue.component('Loading', Loading);
swiper.use([Navigation, Pagination, Autoplay]);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
