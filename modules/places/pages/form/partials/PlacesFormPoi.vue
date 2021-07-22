<template>
  <div class="space-y-4">
    <div>
      <label class="label">Регион <span class="asterisk"></span></label>
      <ul class="flex flex-wrap">
        <li v-for="region in regions"
            :key="region.id"
            @click="form.parent_id = region.id"
            :class="{[form.parent_id === region.id ? 'bg-gray-400' : 'bg-gray-200']: true}"
            class="mr-1 mb-1 py-1 px-3 rounded-full cursor-pointer hover:bg-gray-400">{{ region.name }}</li>
      </ul>
    </div>

    <div v-if="form.parent_id > 0">
      <label class="label">Населенный пункт</label>
      <div class="mb-2">
        <input type="search" class="input" placeholder="Поиск населенного пункта по названию">
      </div>
      <div class="alert alert--warning">
        Пропустите выбор населенного пункта, если добавляемое место находятся за пределами населенного пункта. Например озеро Байкал находится в центре Азии на границе Иркутской области и Республики Бурятия
        и не привязано к конкретному населенному пункту.
        <br /><br />В другом случае населенных пункт должен быть выбран, а если подходящего населенного пункта не найдено,
        то придется сначала добавить его, а затем вернутся к добавлению места.
      </div>
    </div>

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