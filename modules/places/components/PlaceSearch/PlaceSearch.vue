<template>
  <div class="relative">
    <input
      v-model="query"
      :id="id"
      :placeholder="placeholder"
      @input="onSearch"
      type="search"
      class="input"
    >
    <ul v-show="results.length" class="bg-white p-2 absolute w-full">
      <li
        v-for="item in results"
        :key="item.id"
        @click="onSelect(item)"
        class="cursor-pointer hover:font-bold mt-2"
      >{{ item.full_name }}</li>
    </ul>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
    props: {
      placeholder: String,
      id: String,
      value: String,
      parentId: Number,
      searchBy: {
        type: Array,
        default() {
          return [];
        }
      },
    },

    data() {
      return {
        results: [],
        query: this.value,
      }
    },

    methods: {
      onSelect(item) {
        this.$emit('select', item);
        this.results = [];
        this.query = item.full_name;
      },

      /**
       * Поиск родительского места.
       */
      onSearch: debounce(function () {
        if (this.query.length < 2) {
          this.results = [];
          return;
        }

        let data = {
          query: this.query,
        };

        if (this.searchBy.length > 0) {
          data.searchBy = this.searchBy;
        }

        if (this.parentId > 0) {
          data.parent_id = this.parentId;
        }

        this.$axios
          .$post('/api/places/search', data)
          .then(response => {
            this.results = response;
          });
      }, 500)
    }
  }
</script>
