<template>
  <div class="p-4 bg-white rounded shadow-sm hover:bg-gray-100">
    <div class="flex">
      <div>
        <n-link :to="`/${entry.type}/${entry.id}`">{{ entry.full_name }}</n-link>
        <div v-if="entry.type === 'poi'" class="help">{{ entry.category_of_poi.name }}</div>
        <div class="mt-1"><v-rating-stars :value="entry.rating"></v-rating-stars></div>
      </div>
      <v-dropdown class="ml-auto">
        <ul class="dropdown-menu">
          <n-link :to="{name: 'places.edit', params: {placeId: entry.id}}" class="dropdown-menu-item">Редактировать</n-link>
          <a @click="onDelete(entry.id)" class="dropdown-menu-item">Удалить</a>
        </ul>
      </v-dropdown>
    </div>
  </div>
</template>

<script>
import VRatingStars from "~/components/common/VRatingStars";
import VDropdown from "~/components/ui/VDropdown/VDropdown";

export default {
  components: {VDropdown, VRatingStars},
  props: ['entry'],
  methods: {
    onDelete(placeId) {
      this.$axios
          .$delete('/api/places/' + placeId)
          .then(response => {
            this.$eventBus.$emit('modal', ['places', 'delete', response])
          });
    }
  }
}
</script>
