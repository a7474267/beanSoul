<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div
      class="jumbotron jumbotron-fluid bg-style"
      style="background-image:url(img/coffee-1580595_1280.jpg)"
    >
      <div class="container">
        <div class="row">
          <div class="col md-5 d-flex justify-content-center justify-content-md-start">
            <h2 class="text-white font-weight-bold">
              滿室飄香!
              <br />宅配到府!
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <h2 class="font-weight-bold">購物車</h2>
            <hr class="w-100 border-bottom border-dark mt-0" />
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="carts.length > 0">
      <div class="row">
        <div class="col-12 py-3">
          <div class="table-responsive d-none d-md-block">
            <table class="table table-striped text-center">
              <thead>
                <tr>
                  <th>產品圖片</th>
                  <th>產品名稱</th>
                  <th>數量</th>
                  <th>價格</th>
                  <th>刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in carts" :key="item.id">
                  <td width="100">
                    <img :src="item.product.imageUrl" alt class="img-fluid" />
                  </td>
                  <td class="font-weight-bold align-middle">{{ item.product.title }}</td>
                  <td class="align-middle">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <button
                          class="btn btn-danger"
                          type="button"
                          :disabled="item.qty <= 1"
                          @click="item.qty --; updateCart(item.product.id, item.qty, item.id)"
                        >
                          <span v-if="item.product.id === qtyChanging">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                          <span>-</span>
                        </button>
                      </div>
                      <input type="number" min="1" max="10" v-model.number="item.qty"
                      class="text-center form-control"
                      @keyup.enter="updateCart(item.product.id, item.qty, item.id)"/>
                      <div class="input-group-append">
                        <button
                          type="button"
                          class="btn btn-danger" :disabled="item.qty >= 10"
                          @click="item.qty ++; updateCart(item.product.id, item.qty, item.id)"
                        >
                          <span v-if="item.product.id === qtyChanging">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                          <span v-else>+</span>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">
                    {{ item.final_total }}
                  </td>
                  <td class="align-middle">
                    <button class="btn btn-outline-danger" type="button"
                    @click="deleteOrder(item.id)">
                      <i class="fas fa-md fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-md-none row mb-3 shadow-lg rounded" v-for="item in carts" :key="item.id">
            <div class="d-flex align-items-center justify-content-center col-3">
              <img :src="item.product.imageUrl" alt="" class="img-fluid">
            </div>
            <div class="col-9 d-flex align-items-center justify-content-between">
              <p class="mb-0 h5 font-weight-bold">{{ item.product.title }}</p>
              <div class="badge badge-pill badge-danger">
                  {{ item.product.category }}
                </div>
            </div>
            <hr class="w-100 border-primary">
            <div class="col-12 mb-4">
              <div class="row">
                <div class="col-9">
                  <div class="input-group">
                      <div class="input-group-prepend">
                        <button
                          class="btn btn-danger"
                          type="button"
                          :disabled="item.qty <= 1"
                          @click="item.qty --; updateCart(item.product.id, item.qty, item.id)"
                        >
                          <span v-if="item.product.id === qtyChanging">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                          <span>-</span>
                        </button>
                      </div>
                      <input type="number" min="1" max="10" v-model.number="item.qty"
                      class="text-center form-control"
                      @keyup.enter="updateCart(item.product.id, item.qty, item.id)"/>
                      <div class="input-group-append">
                        <button
                          type="button"
                          class="btn btn-danger" :disabled="item.qty >= 10"
                          @click="item.qty ++; updateCart(item.product.id, item.qty, item.id)"
                        >
                          <span v-if="item.product.id === qtyChanging">
                            <i class="fas fa-spinner fa-spin"></i>
                          </span>
                          <span v-else>+</span>
                        </button>
                      </div>
              </div>
                </div>
                <div class="col-3 text-right">
                  <button class="btn btn-outline-danger" type="button"
                    @click="deleteOrder(item.id)">
                      <i class="fas fa-md fa-trash-alt"></i>
                    </button>
                </div>
              </div>
            </div>
            <div class="col-12 d-flex justify-content-end font-weight-bold h5">
              金額：{{ item.final_total }}
            </div>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <p class="h4 mb-0 font-weight-bold">總金額</p>
            <p class="h4 mb-0 font-weight-bold">{{ cartTotal }}</p>
          </div>
          <!-- 繼續選購/下一步 -->
          <div class="row justify-content-between mt-4">
            <div class="col-md-2">
              <router-link class="btn btn-outline-dark font-weight-bold mb-2 mb-md-0 w-100"
            to="/products"
            type="button">繼續選購</router-link>
            </div>
            <div class="col-md-2">
              <router-link class="btn btn-outline-danger font-weight-bold w-100"
            type="button" to="/cart-form">下一步</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3" v-else>
      <div class="row flex-column align-items-center">
        <div class="col-12 text-center mb-3">
            <p class="h3 text-dark mb-0">購物車無商品，快去逛逛！</p>
        </div>
        <div class="col-md-5 mb-3">
          <img src="img/anastasiia-chepinska-lcfH0p6emhw-unsplash.jpg" alt="" class="img-fluid">
        </div>
        <div class="col-md-5 text-center">
          <router-link class="btn btn-outline-danger w-100"
          to="/products">
          繼續選購
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-style {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
<script>
import _ from 'lodash';

export default {
  data() {
    return {
      isLoading: false,
      qtyChanging: '',
      carts: [],
      cartTotal: 0,
    };
  },
  methods: {
    getCarts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(url).then((res) => {
        vm.carts = res.data.data.carts;
        vm.carts.sort((a, b) => a.qty - b.qty);
        vm.cartTotal = res.data.data.total;
      });
    },
    debounce() {
      const vm = this;
      const lodashFunc = _.debounce(vm.updateCart, 3000);
      lodashFunc();
    },
    updateCart(productID, qty, orderID) {
      const vm = this;
      vm.qtyChanging = productID;
      vm.isLoading = true;
      Promise.all([vm.deleteOrder(orderID), vm.addToCart(productID, qty)])
        .then(() => {
          vm.isLoading = false;
          vm.qtyChanging = '';
          vm.getCarts();
        });
    },
    addToCart(id, qty) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cart });
    },
    deleteOrder(id) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.$http.delete(url).then(() => {
        vm.isLoading = false;
        vm.$bus.$emit('get-cart');
        vm.getCarts();
      });
    },
  },
  created() {
    this.getCarts();
  },
};
</script>
