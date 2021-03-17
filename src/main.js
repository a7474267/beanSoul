import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  ValidationProvider, ValidationObserver, extend, configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import 'bootstrap';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import App from './App.vue';
import router from './router';
import './bus';
import { userLoginCheck } from './api';
import store from './store';

Vue.use(Vuex);
Vue.use(VueLodash, { name: 'custom', lodash });
// add all rules of Vee Validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper);
Vue.component('Loading', Loading);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
swiper.use([Navigation, Pagination, Autoplay]);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    userLoginCheck().then((res) => {
      if (res.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
