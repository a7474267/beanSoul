<template>
  <div class="container mt-3">
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <div class="col-12">
        <div class="text-left mt-4">
          <button type="button" class="btn btn-dark" @click="openModal(true)">建立新的產品</button>
        </div>
      </div>
      <div class="col-12 mt-3">
        <div class="table-responsive">
          <table class="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col" width="100">分類</th>
                <th scope="col" width="100">產品圖</th>
                <th scope="col">產品名稱</th>
                <th scope="col" width="60">原價</th>
                <th scope="col" width="60">售價</th>
                <th scope="col" width="60">啟用</th>
                <th scope="col" width="120">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td class="align-middle">{{ item.category }}</td>
                <td class="align-middle">
                  <img class="table-img-size" :src="item.imageUrl" alt />
                </td>
                <td class="align-middle">{{ item.title }}</td>
                <td class="align-middle">{{ item.origin_price }}</td>
                <td class="align-middle">{{ item.price }}</td>
                <td class="align-middle">
                  <span v-if="item.is_enabled" class="text-success">Yes</span>
                  <span v-else>No</span>
                </td>
                <td class="align-middle">
                  <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    <button
                      type="button"
                      class="btn btn-outline-success"
                      @click="openModal(false, item)"
                    >編輯</button>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="openModal(false, item, true)"
                    >刪除</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Pagination :pages="pagination" @update="getProducts"></Pagination>
    <!-- edit / new modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title" id="productModal">
              <span class="font-weight-bold" v-if="isNew">新增產品</span>
              <span class="font-weight-bold" v-else>編輯產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <validation-observer v-slot="{ invalid }">
            <form action>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="url">輸入圖片網址</label>
                      <input
                        type="text"
                        class="form-control"
                        id="url"
                        v-model="tempProduct.imageUrl"
                      />
                    </div>
                    <div class="form-group">
                      <label class="btn btn-info" for="file">
                        <input
                          id="file"
                          @change="uploadPhoto"
                          style="display:none;"
                          type="file"
                          ref="files"
                        />
                        <i class="fas fa-image"></i> 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="uploadStatus"></i>
                      </label>
                    </div>
                    <img class="img-fluid" :src="tempProduct.imageUrl" alt />
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                        <label for="title">標題</label>
                        <input
                          type="text"
                          class="form-control"
                          :class="classes"
                          id="title"
                          placeholder="請輸入標題"
                          v-model.trim="tempProduct.title"
                        />
                        <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                        <span v-if="passed" class="valid-feedback">標題輸入正確</span>
                      </validation-provider>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <br />
                        <select name id="category" v-model="tempProduct.category" class="w-100">
                          <option disabled value>選擇產品分類</option>
                          <option value="新手入門">新手入門</option>
                          <option value="新品嚴選">新品嚴選</option>
                          <option value="水洗處理">水洗處理</option>
                          <option value="日曬處理">日曬處理</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="unit">單位</label>
                        <br />
                        <select name id="unit" v-model="tempProduct.unit" class="w-100">
                          <option value="半磅">半磅</option>
                          <option value="一磅">一磅</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                          <label for="origin_price">原價</label>
                          <input
                            type="number"
                            class="form-control"
                            :class="classes"
                            id="origin_price"
                            placeholder="請輸入原價"
                            v-model.number="tempProduct.origin_price"
                          />
                          <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                          <span v-if="passed" class="valid-feedback">原價輸入正確</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md-6">
                        <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                          <label for="price">售價</label>
                          <input
                            type="number"
                            class="form-control"
                            :class="classes"
                            id="price"
                            placeholder="請輸入售價"
                            v-model.number="tempProduct.price"
                          />
                          <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                          <span v-if="passed" class="valid-feedback">售價輸入正確</span>
                        </validation-provider>
                      </div>
                    </div>
                    <hr />
                    <div class="form-group">
                      <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                        <label for="flavor">產品風味</label>
                        <textarea
                          type="text"
                          class="form-control"
                          :class="classes"
                          id="flavor"
                          placeholder="請輸入產品風味"
                          v-model="tempProduct.content.flavor"
                        ></textarea>
                        <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                        <span v-if="passed" class="valid-feedback">產品風味已輸入</span>
                      </validation-provider>
                    </div>
                    <div class="form-group">
                      <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                        <label for="description">產品描述</label>
                        <textarea
                          type="text"
                          class="form-control"
                          :class="classes"
                          id="description"
                          placeholder="請輸入產品描述"
                          v-model="tempProduct.description"
                        ></textarea>
                        <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                        <span v-if="passed" class="valid-feedback">產品描述輸入正確</span>
                      </validation-provider>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                          <label for="country">國家</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="classes"
                            id="country"
                            placeholder="請輸入國家"
                            v-model="tempProduct.content.country"
                          />
                          <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                          <span v-if="passed" class="valid-feedback">國家輸入正確</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md-6">
                        <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                          <label for="origin">產區</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="classes"
                            id="origin"
                            placeholder="請輸入產區"
                            v-model="tempProduct.content.origin"
                          />
                          <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                          <span v-if="passed" class="valid-feedback">產區輸入正確</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md-6">
                        <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                          <label for="roast">焙度</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="classes"
                            id="roast"
                            placeholder="請輸入焙度"
                            v-model="tempProduct.content.roast"
                          />
                          <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                          <span v-if="passed" class="valid-feedback">焙度輸入正確</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md-6">
                        <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                          <label for="level">等級</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="classes"
                            id="level"
                            placeholder="請輸入等級"
                            v-model="tempProduct.content.level"
                          />
                          <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                          <span v-if="passed" class="valid-feedback">等級輸入正確</span>
                        </validation-provider>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="is_enabled"
                          v-model="tempProduct.is_enabled"
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="updateProduct"
                  :disabled="invalid"
                >儲存變更</button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
    <!-- delete modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title font-weight-bold text-white">刪除商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <strong>
              是否刪除
              <span class="text-danger font-weight- bold">{{ tempProduct.title }}</span>商品?
            </strong>
            <p>(注意！商品刪除則無法復原）</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="deleteProduct">確定刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-img-size {
  width: 70px;
}
.align-middle {
  vertical-align: middle;
}
</style>
<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';
// import { beAddProduct, beEditProduct } from '../../api';

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imageUrl: '',
        content: {},
      },
      pagination: {},
      isLoading: false,
      isNew: false,
      uploadStatus: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    uploadPhoto() {
      const vm = this;
      const file = vm.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);
      vm.uploadStatus = true;
      const url = `${process.env.VUE_APP_APIPATH}/API/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.data.success) {
            vm.tempProduct.imageUrl = res.data.imageUrl;
            vm.uploadStatus = false;
          }
        });
    },
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      vm.$http.get(url).then((res) => {
        vm.isLoading = false;
        vm.products = res.data.products;
        vm.pagination = res.data.pagination;
      });
    },
    openModal(isNew, item, clear) {
      const vm = this;
      if (clear) {
        vm.tempProduct = { ...item };
        $('#deleteModal').modal('show');
        return;
      }
      $('#productModal').modal('show');
      if (isNew) {
        vm.tempProduct = {
          imageUrl: '',
          content: {},
        };
        vm.isNew = true;
      } else {
        vm.tempProduct = { ...item };
        vm.isNew = false;
      }
    },
    updateProduct() {
      const vm = this;
      // if (!vm.isNew) {
      //   const data = { data: vm.tempProduct };
      //   beEditProduct(data, vm.tempProduct.id).then(() => {
      //     $('#productModal').modal('hide');
      //     vm.getProducts();
      //   });
      // } else {
      //   const data = { data: vm.tempProduct };
      //   beAddProduct(data).then((res) => {
      //     console.log(res);
      //     $('#productModal').modal('hide');
      //     vm.getProducts();
      //   });
      // }
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](url, { data: vm.tempProduct }).then(() => {
        $('#productModal').modal('hide');
        vm.getProducts();
      });
    },
    deleteProduct() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(url).then(() => {
        vm.isLoading = false;
        $('#deleteModal').modal('hide');
        vm.getProducts();
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
