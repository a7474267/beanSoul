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
    <div class="container mb-3">
      <div class="row flex-column-reverse flex-md-row justify-content-center">
        <div class="col-md-7">
          <div class="text-center">
            <h4 class="font-weight-bold">訂購人資訊</h4>
            <hr class="border-dark mt-0 border-bottom w-100" />
          </div>
          <validation-observer v-slot="{ invalid }">
            <form class="font-weight-bold" @submit.prevent="createOrder">
              <div class="form-group">
                <validation-provider rules="required|email"
                v-slot="{ errors, classes, passed }">
                <label for="email">
                  <span class="text-danger">*</span>電子郵件
                </label>
                <input
                  type="email"
                  class="form-control" :class="classes"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="請輸入Email"
                  v-model="user.email"
                />
                <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                <span v-if="passed" class="valid-feedback">Email 輸入正確</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required"
                v-slot="{ errors, classes, passed }">
                <label for="name">
                  <span class="text-danger">*</span>收件人姓名
                </label>
                <input
                  type="text"
                  class="form-control" :class="classes"
                  id="name"
                  aria-describedby="emailHelp"
                  placeholder="請輸入姓名"
                   v-model.trim="user.name"
                />
                <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                <span v-if="passed" class="valid-feedback">姓名輸入正確</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required|min:8"
                v-slot="{ errors, classes, passed }">
                <label for="phone">
                  <span class="text-danger">*</span>收件人電話
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  aria-describedby="emailHelp"
                  placeholder="請輸入收件人電話"
                  :class="classes"
                  v-model.trim="user.tel"
                />
                <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                <span v-if="passed" class="valid-feedback">電話輸入正確</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required"
                v-slot="{ errors, classes, passed }">
                <label for="address">
                  <span class="text-danger">*</span>收件人地址
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  aria-describedby="emailHelp"
                  placeholder="請輸入收件人地址"
                  :class="classes"
                  v-model.trim="user.address"
                />
                <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                <span v-if="passed" class="valid-feedback">地址輸入正確</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="message">
                  <span class="text-danger">*</span>其他需求備註
                </label>
                <textarea name id="message" rows="5"
                placeholder="若有其他需求，請留言告訴我們" class="form-control" v-model.trim="message"></textarea>
              </div>
              <div class="row justify-content-between">
              <div class="col-md-4">
                  <router-link to="/cart" class="font-weight-bold btn btn-outline-dark w-100 mb-3">
                  上一步</router-link>
              </div>
              <div class="col-md-4">
                  <button class="font-weight-bold btn btn-outline-danger w-100"
                  :disabled="invalid">
                      下一步
                      <i class="fas fa-spinner" v-if="sendingOrder"></i></button>
              </div>
          </div>
            </form>
          </validation-observer>
        </div>
        <div class="col-md-5 border shadow-lg rounded-lg mb-3 mb-md-0">
            <div>
                <h4 class="font-weight-bold">訂單明細</h4>
                <hr class="border-dark mt-0 border-bottom w-100" />
            </div>
            <div v-for="item in carts" :key="item.id" class="form-row mb-2">
                <div class="col-3">
                    <img :src="item.product.imageUrl" alt="" class="img-fluid rounded-circle">
                </div>
                <div class="col-6 d-flex flex-column justify-content-center
                align-items-center">
                    <h6 class="mb-1 font-weight-bold">{{ item.product.title }}</h6>
                    <small class="text-muted font-weight-bold">
                        {{ item.product.price }} / {{ item.product.unit }}</small>
                </div>
                <div class="col-3 d-flex align-items-center justify-content-center">
                    X {{ item.qty }}
                </div>
            </div>
            <hr class="border-dark mt-0 border-bottom w-100" />
            <div v-if="cartTotal > 2000">
                <p class="text-muted font-weight-bold">您的消費金額已達 2,000 元，立即輸入夏季限時優惠碼
                <span class="text-success">happysummer88 </span>"，即享
                <span class="text-success">88 折 </span>優惠！</p>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="請輸入優惠碼"
                    aria-label="Recipient's username" aria-describedby="button-addon2"
                    v-model.trim="code">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button"
                        id="button-addon2" @click="applyCoupon">
                            套用優惠碼
                        </button>
                    </div>
                </div>
                <div class="d-flex justify-content-between font-weight-bold">
                    <p class="mb-0">小計</p>
                    <p class="mb-0">{{ cartTotal }}</p>
                </div>
                <div class="d-flex justify-content-between font-weight-bold"
                v-if="coupon.success">
                    <p class="mb-0">折扣</p>
                    <p class="text-danger">-{{ cartTotal - coupon.data.final_total }}</p>
                </div>
                <hr class="border-dark">
                <div class="d-flex justify-content-between">
                    <h3 class="font-weight-bold">總金額</h3>
                    <h3 v-if="coupon.success">{{ coupon.data.final_total }}</h3>
                    <h3 v-else>{{ cartTotal + 170 }}</h3>
                </div>
            </div>
            <div v-else>
                <p class="text-muted font-weight-bold">消費滿 2,000 即可享 88 折優惠，您目前的消費金額尚差
                <span class="text-success">{{ 2000 - cartTotal }}元!</span></p>
                <router-link to="/products" class="btn btn-outline-dark w-100 mb-2">
                  繼續選購
                </router-link>
                <div class="d-flex justify-content-between font-weight-bold">
                    <p class="mb-0">小計</p>
                    <p class="mb-0">{{ cartTotal }}</p>
                </div>
                <div class="d-flex justify-content-between font-weight-bold">
                    <p class="mb-0">運費</p>
                    <p class="mb-0">170</p>
                </div>
                <p class="text-right text-danger font-weight-bold">消費金額滿 2,000 元，免運費</p>
                <hr class="border-dark">
                <div class="d-flex justify-content-between">
                    <h3 class="font-weight-bold">總金額</h3>
                    <h3 v-if="coupon.success">{{ coupon.data.final_total }}</h3>
                    <h3 v-else>{{ cartTotal + 170 }}</h3>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      carts: [],
      cartTotal: 0,
      code: '',
      coupon: {},
      sendingOrder: false,
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
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
    applyCoupon() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const code = { code: vm.code };
      vm.isLoading = true;
      vm.$http.post(url, { data: code }).then((res) => {
        vm.isLoading = false;
        vm.coupon = res.data;
        vm.getCarts();
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.sendingOrder = true;
      const order = {
        user: vm.user,
        message: vm.message,
      };
      vm.isLoading = true;
      vm.$http.post(url, { data: order }).then((res) => {
        vm.sendingOrder = false;
        vm.isLoading = false;
        vm.$bus.$emit('get-cart');
        vm.$router.push(`/cart-check/${res.data.orderId}`);
      });
    },
  },
  created() {
    this.getCarts();
  },
};
</script>
