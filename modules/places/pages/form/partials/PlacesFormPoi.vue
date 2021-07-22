<template>
  <div class="space-y-4">
    <div>
      <label class="label asterisk">Населенный пункт или регион</label>
      <div class="mb-2">
        <place-search
            :only="['localities', 'regions']"
            placeholder="Населенный пункт"
            @select="form.parent_id = $event.parent_id; form.lat = $event.lat; form.lng = $event.lng"></place-search>
      </div>
      <div class="alert alert--warning">
        Если подходящего региона или населенного пункта не найдено,
        то сначала придется добавить его, а затем вернутся к добавлению места.
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
import PlaceSearch from '~/modules/places/components/PlaceSearch';
export default {
  components: {
    PlaceSearch
  },
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