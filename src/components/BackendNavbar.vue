<template>
  <div class="bg-dark sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="img/ajk5p-0iuoe.svg" class="d-inline-block align-top mr-2" alt />
          後台管理系統
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item text-center">
              <router-link
              @click="closeNavBar" to="/admin/products" class="nav-link">產品列表</router-link>
            </li>
            <li class="nav-item text-center">
              <router-link
              @click="closeNavBar" to="/admin/coupons" class="nav-link">優惠券列表</router-link>
            </li>
            <li class="nav-item text-center">
              <router-link
              @click="closeNavBar" to="/admin/orders" class="nav-link">訂單列表</router-link>
            </li>
            <li class="nav-item text-center">
              <router-link @click="closeNavBar" to="/"
              class="nav-link">回前台頁面</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.nav-link:hover{
    border:1px solid white;
}
</style>
<script>
import $ from 'jquery';

export default {
  methods: {
    closeNavBar() {
      $('#navbarNav').collapse('hide');
    },
  },
};
</script>
