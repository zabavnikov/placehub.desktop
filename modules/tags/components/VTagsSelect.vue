<template>
  <div class="v-tags-select">
    <div class="v-tags-select-trigger" ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <div style="display: none; max-width: 320px" ref="tags">
      <input
          :disabled="isMax"
          ref="search"
          type="search"
          class="input"
          v-model="query"
          @input="search"
          :placeholder="isMax ? 'Вы выбрали максимальное количество тегов' : 'Введите название тега'">

      <ul v-show="isNewTag || results.length > 0" class="space-y-2 mt-1">
        <li v-if="isNewTag" @click="onCreate"
            class="hover:underline hover:bg-green-200 rounded p-1 cursor-pointer flex items-center justify-between">
          <span>{{ query.toLocaleLowerCase() }}</span>
          <v-icon name="plus-circle" width="20" height="20"></v-icon>
        </li>
        <li v-for="tag in results" :key="tag.id" @click="onSelect(tag)"
            class="hover:underline hover:bg-green-200 rounded p-1 cursor-pointer flex items-center justify-between">
          <span>{{ tag.name }}</span>
          <v-icon name="plus-circle" width="20" height="20"></v-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import tippy, {sticky} from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import debounce from 'lodash/debounce';

let tippyInstance;

export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    max: {
      type: Number,
      default: 3,
    }
  },

  data() {
    return {
      tags: [...this.value],
      results: [],
      isNewTag: false,
      query: '',
    }
  },

  mounted() {
    const self = this;
    const refs = self.$refs;

    tippyInstance = tippy(refs.trigger, {
      trigger: 'click',
      content: refs.tags,
      allowHTML: true,
      interactive: true,
      theme: 'simple',
      placement: 'bottom-start',
      sticky: 'reference',
      plugins: [sticky],
      onCreate: () => refs.tags.style.display = 'block',
      onDestroy: () => refs.tags.style.display = 'none',
      onShow: () => self.$nextTick().then(() => refs.search.focus()),
    });
  },

  beforeDestroy() {
    this.reset();
    tippyInstance.destroy();
  },

  computed: {
    isMax() {
      return this.tags.length >= this.max;
    },
    minQueryLength() {
      return 2;
    }
  },

  watch: {
    tags(newValue) {
      this.$emit('input', newValue);
    },
  },

  methods: {
    /**
     * Поиск тегов.
     */
    search: debounce(function (event) {
      const query = event.target.value;

      if (query.length < this.minQueryLength) {
        this.results = [];
        this.isNewTag = false;
        return;
      }

      this.$axios
          .$get('/api/tags/search', {
            params: {query},
            progress: false,
          })
          .then(tags => {
            if (tags.length === 0) {
              this.isNewTag = true;
            } else {
              // Если тег не найден в результатах поиска.
              this.isNewTag = !this.isTagExistsInList(query, tags);

              // Заполняем результаты поиска.
              this.results = tags;
            }
          });
    }, 300),

    reset() {
      this.results = [];
      this.isNewTag = false;
      this.query = '';
    },

    /**
     * Если тег не найден, то отправляем запрос на создание.
     */
    onCreate() {
      this.$axios
          .$post('/api/tags', {
            name: this.query
          }, {
            progress: false
          })
          .then(tag => this.onSelect(tag))
    },

    /**
     * Выбор найденого тега.
     *
     * @param tag
     */
    onSelect(tag) {
      if (this.tags.length === 0) {
        this.tags.push(tag);
      } else {
        const isExists = this.isTagExistsInList(tag.name, this.tags);

        if (!isExists) {
          this.tags.push(tag);
        }
      }

      // Reset state
      this.reset();

      this.$refs.search.focus();
    },

    isTagExistsInList(tag, tags) {
      return tags.find((item) => item.name === tag.toLowerCase());
    }
  }
}
</script>