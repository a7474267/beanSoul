<template>
  <div class="toast-position">
    <div
      v-for="(item, i) in messages"
      :id="`toast-${i}`"
      :key="i"
      class="toast fade show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-autohide="false"
    >
      <div class="toast-header">
        <div
          class="inline-block rounded mr-2 toasts-square"
          :class="`bg-${ item.status }`"
        />
        <strong class="mr-auto">Bean Soul</strong>
        <small>現在</small>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          @click="closeToast(`toast-${i}`)"
          >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{ item.message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-position {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2200;
  min-width: 300px;
}
</style>>
<script>
import $ from 'jquery';

export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
    closeToast(element) {
      $(`#${element}`).toast('hide');
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('alert', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>
