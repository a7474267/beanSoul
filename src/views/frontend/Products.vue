<template>
    <div>123</div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      sortProducts: [],
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
      const vm = this;
      vm.$http.get(url).then((res) => {
        vm.products = res.data.products;
        vm.sortProducts = JSON.parse(JSON.stringify(vm.products));
      });
    },
    sortByPrice() {
      const vm = this;
      vm.sortProducts.sort((a, b) => b.price - a.price);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
