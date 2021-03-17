import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    productLoading: '',
    products: [],
    carts: [],
    categories: [],
  },
  actions: {
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
    },
    productLoading(context, payload) {
      context.commit('PRODUCTLOADING', payload);
    },
    getProducts(context) {
      context.commit('LOADING', true);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(url).then((res) => {
        context.commit('LOADING', false);
        context.commit('PRODUCTS', res.data.products);
        context.commit('CATEGORIES');
      });
    },
    getCarts(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(url).then((res) => {
        context.commit('CARTS', res.data.data.carts);
      });
    },
    addToCart(context, { id, quantity }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      let cart = {
        product_id: id,
        qty: quantity,
      };
      const sameItem = context.state.carts.filter((item) => item.product.id === id);
      context.dispatch('updateLoading', true);
      context.dispatch('productLoading', id);
      if (sameItem.length > 0) {
        const orderId = sameItem[0].id;
        const originQty = sameItem[0].qty;
        const newQty = originQty + cart.qty;
        cart = {
          product_id: id,
          qty: newQty,
        };
        context.dispatch('deleteOrder', orderId);
        axios.post(url, { data: cart })
          .then(() => {
            context.dispatch('updateLoading', false);
            context.dispatch('productLoading', '');
            context.dispatch('getCarts');
          })
          .catch(() => {
            context.dispatch('updateLoading', false);
            context.dispatch('productLoading', '');
          });
      } else {
        axios.post(url, { data: cart }).then(() => {
          context.dispatch('updateLoading', false);
          context.dispatch('productLoading', '');
          context.dispatch('getCarts');
        });
      }
    },
    deleteOrder(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.dispatch('updateLoading', true);
      axios.delete(url).then(() => {
        context.dispatch('updateLoading', false);
        context.dispatch('getCarts');
      });
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CARTS(state, payload) {
      state.carts = payload;
    },
    PRODUCTLOADING(state, payload) {
      state.productLoading = payload;
    },
    CATEGORIES(state) {
      const categories = new Set();
      state.products.forEach((item) => { categories.add(item.category); });
      state.categories = Array.from(categories);
    },
  },
});
