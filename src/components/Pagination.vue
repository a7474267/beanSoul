<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{'disabled':!pages.has_pre}">
          <a class="page-link" href="#"
          @click.prevent="updatepage(pages.current_page-1)">上一頁</a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page"
        :class="{'active':page === pages.current_page}">
          <a class="page-link" href="#"
          @click.prevent="updatepage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled':!pages.has_next}">
          <a class="page-link" href="#"
          @click.prevent="updatepage(pages.current_page+1)">下一頁</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatepage(page) {
      this.$emit('update', page);
    },
  },
};
</script>
