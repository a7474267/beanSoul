<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div
      class="jumbotron jumbotron-fluid bg-style d-flex align-items-center"
      style="background-image:url(img/coffee-farm.jpg);height:250px"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <div class="d-flex flex-column align-items-center align-items-md-start">
              <h1 class="text-light font-weight-bold pt-2">
                產地嚴選，
                <br />生豆空運！
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <ul
            class="nav nav-pills justify-content-center font-weight-bold"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
                @click.prevent="filterProduct('全部品項')"
              >全部品項</a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                @click.prevent="filterProduct('新手入門')"
              >新手入門</a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
                @click.prevent="filterProduct('新品嚴選')"
              >新品嚴選</a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
                @click.prevent="filterProduct('日曬處理')"
              >日曬處理</a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="pills-contact-tab"
                data-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
                @click.prevent="filterProduct('水洗處理')"
              >水洗處理</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-4 my-3" v-for ="item in sortProducts" :key="item.id">
          <div class="card text-center shadow rounded h-100">
            <img :src="item.imageUrl" class="card-img-top mh-250" alt>
            <div class="card-body position-relative">
              <h4 class="card-title font-weight-bold text-danger">{{ item.title }}</h4>
              <p
                class="card-text text-muted font-weight-bold"
              >{{ item.description }}</p>
              <div>
                <del class="text-muted">原價：{{item.origin_price}}</del>
                <p class="font-weight-bold text-danger h5">售價: {{ item.price }}</p>
              </div>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-between">
                <router-link class="btn btn-outline-success font-weight-bold"
                :to="`/product/${item.id}`">瞭解更多
                </router-link>
                <button class="btn btn-outline-danger font-weight-bold"
                @click="addToCart(item.id)">加入購物車
                  <i class="fas fa-spinner fa-spin" v-if="item.id === productLoading"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 my-3"></div>
        <div class="col-md-4 my-3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-style {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.object-fit{
  object-fit:cover;
  object-position:center center;
}
.mh-250{
  max-height: 250px;
}
</style>
<script>
export default {
  data() {
    return {
      products: [],
      sortProducts: [],
      isLoading: false,
      productLoading: '',
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(url).then((res) => {
        vm.isLoading = false;
        vm.products = res.data.products;
        vm.sortProducts = [...vm.products];
      });
    },
    filterProduct(category) {
      const vm = this;
      switch (category) {
        case ('全部品項'):
          vm.sortProducts = [...vm.products];
          break;
        case ('新手入門'):
          vm.sortProducts = [...vm.products].filter((item) => item.category === '新手入門');
          break;
        case ('新品嚴選'):
          vm.sortProducts = [...vm.products].filter((item) => item.category === '新品嚴選');
          break;
        case ('日曬處理'):
          vm.sortProducts = [...vm.products].filter((item) => item.category === '日曬處理');
          break;
        case ('水洗處理'):
          vm.sortProducts = [...vm.products].filter((item) => item.category === '水洗處理');
          break;
        default:
          break;
      }
    },
    addToCart(id, quantity = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty: quantity,
      };
      vm.isLoading = true;
      vm.productLoading = id;
      vm.$http.post(url, cart).then(() => {
        vm.isLoading = false;
        vm.productLoading = '';
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
