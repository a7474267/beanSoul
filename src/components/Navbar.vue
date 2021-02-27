<template>
  <div class="bg-primary sticky-top">
    <div class="container">
      <nav class="navbar navbar-expand-md navbar-dark bg-primary">
        <router-link class="navbar-brand" to="/">
          <img src="img/ajk5p-0iuoe.svg" class="rounded-pill" alt />
        </router-link>
        <span class="d-md-none navbar-nav ml-auto">
          <router-link class="nav-link" to="/cart">
            <i class="fas fa-md fa-shopping-cart fa-2x"></i>
            <span class="badge badge-pill badge-warm cart-logo-position">1</span>
          </router-link>
        </span>
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
          <div class="d-none d-md-block ml-auto">
            <ul class="navbar-nav">
              <li class="nav-item d-flex align-items-center">
                <router-link class="nav-link" to="/">首頁</router-link>
              </li>
              <li class="nav-item d-flex align-items-center">
                <router-link class="nav-link" to="/about">關於我們</router-link>
              </li>
              <li class="nav-item d-flex align-items-center">
                <router-link class="nav-link" to="/products">好豆市集</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/cart">
                  <i class="fas fa-md fa-shopping-cart fa-2x"></i>
                  <span class="badge badge-pill badge-warm cart-logo-position">1</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="d-md-none">
            <ul class="navbar-nav text-center">
              <li class="nav-item">
                <router-link class="nav-link border-bottom mt-3"
                @click="closeNavBar" to="/">首頁</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link border-bottom"
                @click="closeNavBar" to="/about">關於我們</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link border-bottom"
                @click="closeNavBar" to="/products">好豆市集</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.nav-link:hover {
  font-weight: bolder;
}
.router-link-exact-active{
  text-shadow: 2px 2px 3px rgb(0 0 0 / 50%);
  border-bottom:1px solid white;
  font-weight: bolder;
}
.cart-logo-position{
  transform:translate(-5px, -20px);
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
