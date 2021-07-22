<template>
  <div class="geo-search">
    <input
      v-model="query"
      :id="id"
      :placeholder="placeholder"
      @input="onSearch"
      type="search"
      class="input"
    >
    <ul v-show="results.length" class="bg-yellow-200 p-2">
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
      id: String,
      value: String,
      parentId: Number,
      only: {
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

        if (this.only.length > 0) {
          data.only = this.only;
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
