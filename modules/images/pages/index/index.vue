<template>
  <the-layout heading="Фотографии" :subheading="subheading" wide>
    <div slot="content" class="grid grid-cols-4 grid-rows-4 gap-4">
      <n-link :to="`/images/${image.id}`"
          v-for="image in images" :key="image.id"
          class="ratio rounded"
          :style="{backgroundImage: `url(${image.url_small})`, backgroundSize: 'cover', backgroundPosition: 'center'}"
      ></n-link>
    </div>
  </the-layout>
</template>

<script>
export default {
  asyncData({ $axios, query }) {
    const params = {};

    if (query.placeId > 0) {
      params.placeId = query.placeId;
    }

    return $axios
        .$get('/api/images', {
          params
        })
        .then(({ images, place }) => {
          return {images, place}
        })
  },
  computed: {
    subheading() {
      return this.place ? this.place.full_name : '';
    }
  }
}
</script>