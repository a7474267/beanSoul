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
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="input-group">
            <input class="form-control" type="text" v-model.trim="searchText"
                  placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                    @click="searchText = ''">
                    <i class="fa fa-times"></i>
                </button>
              </div>
          </div>
        </div>
        <div class="col-md-8">
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
                @click.prevent="searchText = ''"
              >全部品項</a>
            </li>
            <li class="nav-item" role="presentation" v-for="item in categories" :key="item">
              <a
                class="nav-link"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
                @click.prevent="searchText = item"
              >{{ item }}</a>
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
              >{{ item.content.flavor }}</p>
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
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      searchText: '',
    };
  },
  computed: {
    ...mapState(['isLoading', 'products', 'carts', 'productLoading', 'categories']),
    sortProducts() {
      const vm = this;
      if (vm.searchText) {
        if (vm.categories.includes(vm.searchText)) {
          return vm.products.filter((item) => {
            const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase());
            return data;
          });
        }
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return vm.products;
    },
  },
  methods: {
    ...mapActions(['getProducts', 'getCarts', 'deleteOrder']),
    addToCart(id, quantity = 1) {
      this.$store.dispatch('addToCart', { id, quantity });
    },
  },
  created() {
    this.getProducts();
    this.getCarts();
  },
};
</script>
