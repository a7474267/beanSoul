<template>
  <div id="app">
    <Toast/>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/all';
</style>

<script>
import Toast from '@/components/Toasts.vue';

export default {
  name: 'App',
  components: {
    Toast,
  },
  data() {
    return {
    };
  },
};
</script>
