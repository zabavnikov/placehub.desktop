<template>
  <div>
    <div class="alert alert--warning mb-4">
      Если отсутствует нужный вам регион,
      вы можете добавить его самостоятельно,
      а затем вернуться к добавлению населенного пункта.
    </div>

    <div class="mt-4">
      <label class="label">Тип населенного пункта <span class="asterisk"></span></label>
      <ul class="flex flex-wrap">
        <li v-for="category in categories"
            :key="category.id"
            @click="form.category_id = category.id"
            :class="{[form.category_id === category.id ? 'bg-gray-400' : 'bg-gray-200']: true}"
            class="mr-1 mb-1 py-1 px-3 rounded-full cursor-pointer hover:bg-gray-400">{{ category.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
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
    }
  },
  watch: {
    form: {
      handler(newValue) {
        this.$emit('input', newValue)
      },
      deep: true
    }
  }
}
</script>