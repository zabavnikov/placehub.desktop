<template>
  <div :class="grid">
    <div v-for="image in images"
         :key="image.id"
        class="bg-center bg-cover aspect-w-4 aspect-h-3">
      <img :src="image.sizes.default" alt="" class="w-full h-full object-center object-cover">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  computed: {
    count() {
      return this.images.length;
    },
    grid() {
      if (this.count === 1) {
        return '';
      } else if (this.count === 2) {
        return 'grid grid-cols-2 gap-px';
      } else if (this.count === 3) {
        return 'grid grid-cols-3 gap-px';
      } else if (this.count === 4) {
        return 'grid grid-cols-2 gap-px';
      } else {
        return 'grid grid-cols-4 gap-px';
      }
    }
  }
}
</script>