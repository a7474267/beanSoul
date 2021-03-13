<template>
  <div class="mb-5">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in similar" :key="item.id">
          <div class="card h-100" @click="getDetail(item.id)">
          <div class="card-img-top card-img-height">
              <img :src="item.imageUrl" alt="" class="img-fluid object-fit">
          </div>
          <div class="card-body text-center px-2 py-3">
            <h5 class="mb-0">
              <router-link :to="`/product/${item.id}`">{{ item.title }}</router-link>
            </h5>
            <div class="mt-2 d-lg-flex justify-content-center align-items-center">
              <del class="text-muted mr-lg-2">
                <span class="font-size-xs">原價：{{ item.origin_price }}</span>
              </del>
              <p class="text-danger mb-0 font-size-s">
                售價：<strong>{{ item.price }}</strong>
              </p>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev bg-style" slot="button-prev"></div>
      <div class="swiper-button-next bg-style" slot="button-next"></div>
    </swiper>
  </div>
</template>

<style scoped>
.swiper-button-prev{
  background-image: url(../../public/img/arrow-left-solid.svg);
  color: transparent;
}
.swiper-button-next{
  background-image: url(../../public/img/arrow-right-solid.svg);
  color: transparent;
}
.bg-style {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.object-fit{
  object-fit:cover;
  object-position:center center;
}
</style>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

export default {
  data() {
    return {
      products: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    };
  },
  props: ['product'],
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(url).then((res) => {
        vm.products = res.data.products;
      });
    },
    getDetail(id) {
      this.$router.push(`/product/${id}`);
      this.$emit('update');
    },
  },
  computed: {
    similar() {
      const vm = this;
      return vm.products
        .filter((item) => vm.product.id !== item.id && vm.product.category === item.category);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
