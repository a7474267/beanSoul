<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-5">
      <div class="col-md-7">
          <img :src="product.imageUrl" alt="" class="img-fluid">
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-center">
          <h2 class="text-danger font-weight-bold mt-3 mt-md-0">
              {{ product.title }}</h2>
          <hr class="w-100 border-primary mt-0">
          <p>{{ product.content }}</p>
          <div class="d-flex align-items-center">
              <h4 class="text-danger mr-3 mb-0">售價{{ product.price }}</h4>
              <del>原價{{ product.origin_price }}</del>
          </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-3">
        <h4 class="text-success font-weight-bold">商品資訊</h4>
      </div>
      <div class="col-md-9"></div>
    </div>
    <div class="row mt-5">
      <div class="col-md-3">
        <h4 class="text-success font-weight-bold">營養成份</h4>
      </div>
      <div class="col-md-9"></div>
    </div>
    <ProductNotice></ProductNotice>
  </div>
</template>

<script>
import ProductNotice from '@/components/ProductNotice.vue';

export default {
  components: {
    ProductNotice,
  },
  data() {
    return {
      isLoading: false,
      product: {},
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
  },
  created() {
    this.getProduct();
  },
};
</script>
