<template>
  <div class="container mt-3">
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <div class="col-12">
        <div class="text-left mt-4">
          <button type="button" class="btn btn-dark"
          @click="openCouponModal(true)">建立新的Coupon</button>
        </div>
      </div>
      <div class="col-12">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>名稱</th>
                <th width="200">折扣百分比</th>
                <th width="200">到期日</th>
                <th width="200">是否啟用</th>
                <th width="200">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in coupons" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.percent }}%</td>
                <td>{{ item.due_date }}</td>
                <td>
                  <span v-if="item.is_enabled" class="text-success">Yes</span>
                  <span v-else>No</span>
                </td>
                <td>
                  <button
                    class="btn btn-outline-success btn-sm"
                    @click="openCouponModal(false,item,false)"
                  >編輯</button>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    @click="openCouponModal(false,item,true)"
                  >刪除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- new / edit modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增Coupon</span>
              <span v-else>編輯Coupon</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model.trim="tempCoupon.title"
                  />
                </div>
                <div class="form-group">
                  <label for="code">優惠碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    placeholder="請輸入優惠碼"
                    v-model.trim="tempCoupon.code"
                  />
                </div>
                <div class="form-group">
                  <label for="expired">到期日</label>
                  <input type="date" class="form-control" id="expired"
                  placeholder="請輸入到期日" v-model="tempCoupon.due_date"/>
                </div>
                <hr />

                <div class="form-group">
                  <label for="percentage">折扣百分比</label>
                  <input
                    type="text"
                    class="form-control"
                    id="percentage"
                    placeholder="請輸入百分比"
                    v-model.number="tempCoupon.percent"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary"
            data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">儲存優惠券</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete modal -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pages="pagination"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import $ from 'jquery';

export default {
  data() {
    return {
      isLoading: false,
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNew: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    openCouponModal(isNew, item, clear) {
      const vm = this;
      if (clear) {
        vm.tempCoupon = { ...item };
        $('#delCouponModal').modal('show');
        return;
      }
      $('#couponModal').modal('show');
      if (isNew) {
        vm.tempCoupon = {};
        vm.isNew = true;
      } else {
        vm.tempCoupon = { ...item };
        vm.isNew = false;
      }
    },
    getCoupons() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(url).then((res) => {
        vm.isLoading = false;
        vm.coupons = res.data.coupons;
        vm.pagination = res.data.pagination;
      });
    },
    updateCoupon() {
      const vm = this;
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        httpMethod = 'put';
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      }
      vm.$http[httpMethod](url, { data: vm.tempCoupon }).then(() => {
        $('#couponModal').modal('hide');
        vm.getCoupons();
      });
    },
    deleteCoupon() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.$http.delete(url).then(() => {
        $('#delCouponModal').modal('hide');
        vm.getCoupons();
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
