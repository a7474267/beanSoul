<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div
      class="jumbotron jumbotron-fluid bg-style mb-0"
      v-if="!order.is_paid"
      style="background-image:url(img/clay-banks-E2HgkL3LaFE-unsplash.jpg)"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-5 d-none d-md-block">
            <div class="d-flex flex-column align-items-start mt-minus-m">
              <h1 class="text-light font-weight-bold">
                食指大動，
                <br />宅配到府！
              </h1>
            </div>
          </div>
          <div class="col-md-5 d-md-none">
            <div class="d-flex justify-content-center align-items-center mt-2 text-shadow">
              <h1 class="text-light font-weight-bold">
                食指大動，
                <br />宅配到府！
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5" v-else>
      <div
        class="bg-style"
        style="background-image:url(img/luca-upper-Z-4kOr93RCI-unsplash.jpg);height:400px"
      >
        <div
          class="h-100 d-flex justify-content-center align-items-center"
          style="position:relative"
        >
          <section class="bg-dark d-flex flex-column align-items-center px-3 py-4 py-md-5 w-75">
            <h1 class="text-light font-weight-bold text-shadow">訂單完成</h1>
            <p class="text-light text-center font-weight-bold font-size-l text-shadow">
              感謝您的購買！
              <br />您的訂單， 將在 1 ~ 3 個工作天內出貨！
            </p>
            <router-link
              to="/products"
              class="btn btn-outline-light w-25 mt-3 d-none d-md-block"
              v-if="order.is_paid === true"
            >繼續選購</router-link>
            <router-link
              to="/products"
              class="btn btn-outline-light mt-3 w-50 d-md-none"
              v-if="order.is_paid === true"
            >繼續選購</router-link>
          </section>
        </div>
      </div>
    </div>
    <div class="container my-3" v-if="!order.is_paid">
      <div class="row justify-content-center flex-md-row">
        <div class="col-md-7">
          <div class="bg-light mt-3">
            <div class="d-flex justify-content-center justify-content-md-start">
              <h4 class="text-dark mb-0 font-weight-bold">結帳</h4>
            </div>
            <hr class="border-dark hr-border-width" />
            <p>
              只差一步了！點選確認付款以完成訂單。
              <br />我們將在收到您的訂單後， 約 1 ~ 3 個工作天內出貨！
            </p>
            <img
              class="img-fluid w-100"
              src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Dry9BIAASb4giKnaoSNHtSk3l5GPx4a6lcxAxtoWM9GekuI7w9wUWmb53XFkhg1WWY9rBIPobkNvyGtttxQzHfU1zKpAyZvzJLo4g4XfFQODfneK8E2tGIquXnH9rAcK.jpg"
              alt
            />
          </div>
        </div>
        <div class="col-md-5 my-3">
          <div class="border p-4">
            <h4
              class="font-weight-bold mb-3 d-flex justify-content-center justify-content-md-start"
            >訂單明細</h4>
            <hr />
            <div v-for="( product, i ) in order.products" :key="i">
              <div class="d-flex mb-3">
                <img :src="product.product.imageUrl[0]" alt class="mr-2 table-img-width" />
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-0 font-weight-bold">{{ product.product.title }}</h6>
                    <h6 class="mb-0 font-weight-bold">X {{ product.quantity }}</h6>
                  </div>
                  <div class="d-flex justify-content-between">
                    <small
                      class="mb-0 text-muted"
                    >{{ product.product.price}} / {{ product.product.unit }}</small>
                  </div>
                </div>
              </div>
            </div>
            <ul class="mt-4 mb-0 border-top border-bottom text-muted pl-0">
              <li class="d-flex justify-content-between">
                <p scope="row" class="border-0 px-0 pt-3 pb-0 font-weight-normal">電子郵件</p>
                <p class="text-right border-0 px-0 pt-3 pb-0">{{ order.user.email }}</p>
              </li>
              <li class="d-flex justify-content-between">
                <p scope="row" class="border-0 px-0 font-weight-normal">收件人姓名</p>
                <p class="text-right border-0 px-0">{{ order.user.name }}</p>
              </li>
              <li class="d-flex justify-content-between">
                <p scope="row" class="border-0 px-0 pt-0 font-weight-normal">收件人電話</p>
                <p class="text-right border-0 px-0 pt-0">{{ order.user.tel }}</p>
              </li>
              <li class="d-flex justify-content-between">
                <p scope="row" class="border-0 px-0 pt-0 font-weight-normal">收件人地址</p>
                <p class="text-right border-0 px-0 pt-0">{{ order.user.address }}</p>
              </li>
            </ul>
            <ul class="text-muted pl-0">
              <li class="d-flex justify-content-between">
                <p scope="row" class="border-0 px-0 pt-3 pb-0 font-weight-normal">付款金額</p>
                <p class="text-right border-0 px-0 pt-3 pb-0">{{ order.total }}</p>
              </li>
              <li class="d-flex justify-content-between">
                <p scope="row" class="border-0 px-0 pt-0 font-weight-normal mb-0">付款狀態</p>
                <p
                  v-if="!order.is_paid"
                  class="text-right border-0 px-0 pt-0 mb-0 text-primary font-weight-bold"
                >尚未付款</p>
              </li>
            </ul>
            <hr v-if="order.is_paid === false" />
            <div class="row justify-content-between">
              <div class="col-md-6">
                <div v-if="order.is_paid === false">
                  <a @click.prevent="backHome"
                  class="btn btn-outline-dark d-none d-md-block">回到首頁</a>
                </div>
                <div v-if="order.is_paid === false">
                  <a
                    @click.prevent="backHome"
                    class="mb-3 btn btn-outline-dark btn-block d-md-none"
                  >回到首頁</a>
                </div>
              </div>
              <div class="col-md-6">
                <div v-if="order.is_paid === false">
                  <a
                    class="btn btn-primary d-flex align-items-center justify-content-center"
                    @click.prevent="payOrder"
                    :disabled="loadingItem"
                  >
                    確認付款
                    <span
                      v-if="loadingItem"
                      class="spinner-grow spinner-grow-sm ml-2 spinner-size-s"
                    ></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-5" v-else>
      <div class="row justify-content-center flex-md-row">
        <div class="col-12 mt-3">
          <div class="p-4 border">
            <h4 class="font-weight-bold mb-0 d-flex justify-content-center">訂單明細</h4>
          </div>
        </div>
      </div>
      <div class="row align-items-center">
              <div class="col-6 d-none d-md-block" style="relative">
                <div v-for="( product, i ) in order.products" :key="i">
                  <div class="d-flex align-items-center my-3 p-4">
                    <img :src="product.product.imageUrl" alt class="mr-3 img-fluid w-25" />
                    <div class="w-100">
                      <div class="d-flex justify-content-between">
                        <h6 class="mb-0 font-weight-bold mr-2">{{ product.product.title }}</h6>
                        <h6 class="mb-0 font-weight-bold ml-auto">X {{ product.qty }}</h6>
                      </div>
                      <div class="d-flex">
                        <small
                          class="mb-0 text-muted"
                        >{{ product.product.price }} / {{ product.product.unit }}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <span v-if="order.products.length >= 4" class="headerDivider-r"></span>
              </div>
              <div class="col-6 d-none d-md-block" style="relative">
                <ul class="mb-0 border-bottom text-muted p-4 border">
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pb-0 font-weight-normal">電子郵件</p>
                    <p class="text-right border-0 px-0 pb-0">{{ order.user.email }}</p>
                  </li>
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 font-weight-normal">收件人姓名</p>
                    <p class="text-right border-0 px-0">{{ order.user.name }}</p>
                  </li>
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pt-0 font-weight-normal">收件人電話</p>
                    <p class="text-right border-0 px-0 pt-0">{{ order.user.tel }}</p>
                  </li>
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pt-0 font-weight-normal">收件人地址</p>
                    <p class="text-right border-0 px-0 pt-0">{{ order.user.address }}</p>
                  </li>
                </ul>
                <ul class="text-muted p-4 mb-0 border">
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pt-3 pb-0 font-weight-normal">付款金額</p>
                    <p class="text-right border-0 px-0 pt-3 pb-0">{{ order.total }}</p>
                  </li>
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pt-0 font-weight-normal mb-0">付款狀態</p>
                    <p
                      v-if="order.is_paid"
                      class="text-right border-0 px-0 pt-0 mb-0 text-success font-weight-bold"
                    >已完成付款</p>
                  </li>
                </ul>
                <span v-if="order.products.length < 4" class="headerDivider-l"></span>
              </div>
              <div class="col-12 d-md-none">
                <div v-for="( product, i ) in order.products" :key="i">
                  <div class="d-flex align-items-center mb-3 p-4">
                    <img :src="product.product.imageUrl[0]" alt class="mr-3 table-img-width" />
                    <div class="w-100">
                      <div class="d-flex justify-content-between">
                        <h6 class="mb-0 font-weight-bold mr-2">{{ product.product.title }}</h6>
                        <h6 class="mb-0 font-weight-bold ml-auto">X {{ product.quantity }}</h6>
                      </div>
                      <div class="d-flex">
                        <small
                          class="mb-0 text-muted"
                        >{{ product.product.price }} / {{ product.product.unit }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 border-top d-md-none">
                <ul class="mb-0 border-bottom text-muted pl-0">
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pb-0 pt-3 font-weight-normal">電子郵件</p>
                    <p class="text-right border-0 px-0 pb-0 pt-3">{{ order.user.email }}</p>
                  </li>
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 font-weight-normal">收件人姓名</p>
                    <p class="text-right border-0 px-0">{{ order.user.name }}</p>
                  </li>
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pt-0 font-weight-normal">收件人電話</p>
                    <p class="text-right border-0 px-0 pt-0">{{ order.user.tel }}</p>
                  </li>
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pt-0 font-weight-normal">收件人地址</p>
                    <p class="text-right border-0 px-0 pt-0">{{ order.user.address }}</p>
                  </li>
                </ul>
                <ul class="text-muted pl-0 mb-0">
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pt-3 pb-0 font-weight-normal">付款金額</p>
                    <p class="text-right border-0 px-0 pt-3 pb-0">{{ order.total }}</p>
                  </li>
                  <li class="d-flex justify-content-between">
                    <p scope="row" class="border-0 px-0 pt-0 font-weight-normal mb-0">付款狀態</p>
                    <p
                      v-if="order.is_paid"
                      class="text-right border-0 px-0 pt-0 mb-0 text-success font-weight-bold"
                    >已完成付款</p>
                  </li>
                </ul>
              </div>
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
</style>>
<script>
export default {
  data() {
    return {
      order: {
        products: {},
        user: {},
      },
      isLoading: false,
      loadingItem: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const { orderId } = vm.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderId}`;
      vm.isLoading = true;
      vm.$http.get(url).then((res) => {
        vm.order = res.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const { orderId } = vm.$route.params;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${orderId}`;
      vm.loadingItem = true;
      vm.isLoading = true;
      vm.$http.post(url).then(() => {
        vm.loadingItem = false;
        vm.isLoading = false;
        vm.getOrder();
      });
    },
    backHome() {
      this.$router.push('/');
      this.$bus.$emit('alert',
        '尚未付款！訂單已放棄，請重新下單。',
        'danger');
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
