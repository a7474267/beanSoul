<template>
    <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-md-6">
                <div class="text-center h3">
                    <p class="mb-0">Bean Soul</p>
                    <p>管理員登入</p>
                </div>
                <form action="" @submit.prevent="logIn">
                  <div class="form-group mt-4">
                    <input type="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="請輸入電子郵件地址"
                    v-model="user.username" autofocus>
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" id="exampleInputPassword1"
                    placeholder="請輸入密碼" v-model="user.password">
                  </div>
                </form>
                <div class="d-flex justify-content-center mt-4">
                  <router-link to="/products" class="btn border-dark">返回賣場</router-link>
                  <button type="button" class="btn btn-dark ml-3"
                  @click="logIn" :disabled="isLoading">登入</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    logIn() {
      const url = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.post(url, vm.user).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `BeanToken=${token}; expires=${new Date(expired * 1000)};`;
          vm.$router.push('/admin/products');
        }
      });
    },
  },
};
</script>
