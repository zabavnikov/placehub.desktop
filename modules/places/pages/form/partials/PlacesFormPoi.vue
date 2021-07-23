<template>
  <div>
    <label class="label">Категория <span class="asterisk"></span></label>
    <ul class="flex flex-wrap">
      <li v-for="category in categories"
          :key="category.id"
          @click="form.category_id = category.id"
          :class="{[form.category_id === category.id ? 'bg-gray-400' : 'bg-gray-200']: true}"
          class="mr-1 mb-1 py-1 px-3 rounded-full cursor-pointer hover:bg-gray-400">{{ category.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
    regions: {
      type: Array,
      default() {
        return [];
      }
    },
    categories: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      form: {...this.value},
      selectedRegion: null,
    }
  },
  watch: {
    form: {
      handler(newValue) {
        this.$emit('input', newValue)
      },
      deep: true
    }
  },
}
</script>