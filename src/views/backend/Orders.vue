<template>
  <div class="container">
    <Loading :active.sync="isLoading" />
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-striped text-center font-weight-bold">
            <thead>
              <tr>
                <th scope="col">下單時間</th>
                <th scope="col">購買品項</th>
                <th scope="col">付款方式</th>
                <th scope="col">應付金額</th>
                <th scope="col">是否付款</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td class="align-middle">{{ order.create_at }}</td>
                <td class="d-flex flex-column">
                    <span v-for="(product,i) in order.products"
                    :key="i">{{product.product.title}}
                    數量:{{ product.product.num }} {{ product.product.unit }}</span>
                </td>
                <td class="align-middle">{{ order.payment_method }}</td>
                <td class="align-middle">{{ order.total }}</td>
                <td class="align-middle">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input"
                        @change="changePaidStatus(order, order.id)"
                        :id="order.id" v-model="order.is_paid">
                        <label class="custom-control-label"
                        :for="order.id">
                          <span class="text-success" v-if="order.is_paid">Yes</span>
                          <span class="text-danger" v-else>No</span>
                        </label>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Pagination :pages="pagination" @update="getOrders"></Pagination>
  </div>
</template>

<style scoped>
.align-middle{
    vertical-align: middle;
}
</style>
<script>
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      isLoading: false,
      orders: [],
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      vm.$http.get(url).then((res) => {
        vm.isLoading = false;
        vm.orders = res.data.orders;
        vm.pagination = res.data.pagination;
      });
    },
    changePaidStatus(item, id) {
      const vm = this;
      const tempOrder = { ...item };
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${id}`;
      vm.isLoading = true;
      vm.$http.put(url, { data: tempOrder }).then(() => {
        vm.isLoading = false;
        vm.getOrders();
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
