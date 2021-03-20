<template>
  <ul v-if="last > 1" class="v-pagination">
    <li
      v-if="pager.current_page > 0"
      :class="{
      'pagination__first-page': true,
      'disabled': pager.current_page === 1
    }"
      @click="changePage(pager.current_page - 1)"
    >Назад</li>

    <li v-if="firstPage" title="Первая">
      <span @click="changePage(1)">1</span>
    </li>

    <li v-if="firstPage">...</li>

    <li
      v-for="page in pagesNumber"
      :key="page"
      :class="{'active': page === pager.current_page}"
    >
      <span @click="changePage(page)">{{ page }}</span>
    </li>

    <li v-if="lastPage">...</li>

    <li v-if="lastPage" title="Последняя">
      <span @click="changePage(last)">{{ last }}</span>
    </li>

    <li
      :class="{
        'pagination__last-page': true,
        'disabled': pager.current_page === last
      }"
      @click="changePage(pager.current_page + 1)"
    >Далее</li>
  </ul>
</template>

<script>
export default {
  props: {
    pagination: {
      type: [Object, Array],
      required: true,
    },

    offset: {
      type: Number,
      default: 4,
    },
  },

  data() {
    return {
      pager: this.pagination
    }
  },

  computed: {
    firstPage() {
      return this.pager.current_page > this.offset + 1;
    },

    lastPage() {
      return (
        this.last > 1 && this.last - this.pager.current_page > this.offset
      );
    },

    last() {
      return Math.ceil(this.pager.total / this.pager.per_page);
    },

    pagesNumber() {
      if (!this.pager.total) {
        return [];
      }

      let from = this.pager.current_page - this.offset;

      if (from < 1) {
        from = 1;
      }

      let to = from + this.offset * 2;

      if (to >= this.last) {
        to = this.last;
      }

      let pagesArray = [];

      for (let page = from; page <= to; page++) {
        pagesArray.push(page);
      }

      return pagesArray;
    },
  },
  methods: {
    changePage(page) {
      if (this.pager.current_page === page) {
        return false;
      }

      this.pager.current_page = page;

      this.$router.push({
        query: Object.assign(
          {
            ...this.$router.currentRoute.query,
          },
          {
            page: page,
          }
        ),
      });
    },
  },
};
</script>

<style lang="scss">
.v-pagination {
  display: flex;
  justify-content: center;

  li {
    cursor: pointer;

    &.active {
      font-weight: bold;
      color: #4caf50;
    }

    &:hover {
      color: #2a2a92;
    }

    + li {
      margin-left: 12px;
    }
  }
}
</style>
