<template>
    <div>
        <BackendNavbar></BackendNavbar>
        <router-view></router-view>
    </div>
</template>

<script>
import BackendNavbar from '@/components/BackendNavbar.vue';

export default {
  components: {
    BackendNavbar,
  },
  created() {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)BeanToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>
