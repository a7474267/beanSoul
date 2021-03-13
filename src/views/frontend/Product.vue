<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-5">
      <div class="col-md-7">
          <img :src="product.imageUrl" alt="" class="img-fluid rounded-circle">
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-center">
          <h2 class="text-danger font-weight-bold mt-3 mt-md-0">
              {{ product.title }}</h2>
          <hr class="w-100 border-primary mt-0">
          <p>{{ product.description }}</p>
          <div class="d-flex align-items-center">
              <h4 class="text-danger mr-3 mb-0">售價{{ product.price }}</h4>
              <del>原價{{ product.origin_price }}</del>
          </div>
          <div class="d-flex mt-3">
            <select name="" id="" class="form-control w-50 mr-3" v-model.number="qty">
              <option :value="number" v-for="number in 10" :key="number"
              class="text-center">{{ number }}{{product.unit}}</option>
            </select>
            <button class="w-50 btn btn-outline-danger" type="button"
            @click="addToCart(product.id)">
              加入購物車
              <i class="fas fa-spinner fa-spin" v-if="product.id === productLoading"></i></button>
          </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-3">
        <h4 class="text-success font-weight-bold">沖泡風味</h4>
      </div>
      <div class="col-md-9 font-weight-bold">
        <p>{{ product.content.flavor }}</p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-3">
        <h4 class="text-success font-weight-bold">生產資訊</h4>
      </div>
      <div class="col-md-9">
        <div class="row font-weight-bold">
          <div class="col-md-4">
            <p class="mb-0">國家：<span class="border-bottom border-primary text-center">
              {{ product.content.country }}
              </span>
            </p>
          </div>
          <div class="col-md-4">
            <p class="mb-0">產地：<span class="border-bottom border-primary text-center">
              {{ product.content.origin }}
              </span>
            </p>
          </div>
          <div class="col-md-4">
            <p class="mb-0">等級：<span class="border-bottom border-primary text-center">
              {{ product.content.level }}
              </span>
            </p>
          </div>
        </div>
        <div class="row font-weight-bold">
          <div class="col-md-4">
            <p class="mb-0">烘焙度：<span class="border-bottom border-primary text-center">
              {{ product.content.roast }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <ProductNotice></ProductNotice>
    <hr class="w-100 border-primary mt-0">
    <div class="row">
      <div class="col-12">
        <h4 class="mb-5 font-weight-bold">更多商品</h4>
        <RelatedProducts :product="product" @update="getProduct"></RelatedProducts>
      </div>
    </div>
  </div>
</template>

<style scoped>
select{
  text-align: center;
  text-align-last: center;
}
</style>>
<script>
import ProductNotice from '@/components/ProductNotice.vue';
import RelatedProducts from '@/components/RelatedProducts.vue';

export default {
  components: {
    ProductNotice,
    RelatedProducts,
  },
  data() {
    return {
      isLoading: false,
      product: {
        content: {},
      },
      carts: [],
      qty: 1,
      productLoading: '',
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.$http.get(url).then((res) => {
        vm.product = res.data.product;
        vm.isLoading = false;
      });
    },
    getCarts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(url).then((res) => {
        vm.carts = res.data.data.carts;
      });
    },
    addToCart(productID) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      let cart = {
        product_id: productID,
        qty: vm.qty,
      };
      const sameItem = vm.carts.filter((item) => item.product.id === productID);
      vm.isLoading = true;
      vm.productLoading = productID;
      if (sameItem.length > 0) {
        const orderId = sameItem[0].id;
        const originQty = sameItem[0].qty;
        const newQty = originQty + vm.qty;
        cart = {
          product_id: productID,
          qty: newQty,
        };
        vm.deleteOrder(orderId);
        vm.$http.post(url, { data: cart }).then(() => {
          vm.isLoading = false;
          vm.productLoading = '';
          vm.getCarts();
        });
      } else {
        vm.$http.post(url, { data: cart }).then(() => {
          vm.isLoading = false;
          vm.productLoading = '';
          vm.$bus.$emit('get-cart');
          vm.getCarts();
        });
      }
    },
    deleteOrder(orderID) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${orderID}`;
      vm.isLoading = true;
      vm.$http.delete(url).then(() => {
        vm.isLoading = false;
        vm.getCarts();
      });
    },
  },
  created() {
    this.getProduct();
    this.getCarts();
  },
};
</script>
