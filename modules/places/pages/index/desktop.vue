<template>
  <the-layout>
    <template #content>
      <place v-for="place in places.data" :key="place.id" :entry="place" class="mb-4"></place>
    </template>
  </the-layout>
</template>

<script>
import Place from '~/modules/places/_desktop/cards/Place';

export default {
  components: {Place},
  asyncData({ $axios }) {
    return $axios.$get('/api/places', {
      params: {
        paginate: true,
        type: 'poi'
      }
    })
        .then(places => {
          return {
            places
          }
        });
  }
}
</script>
