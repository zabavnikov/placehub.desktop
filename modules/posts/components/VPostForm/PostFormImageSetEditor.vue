<template>
  <div>
    <div class="grid grid-cols-4 gap-1">
      <div
          class="wh-ratio rounded"
          v-for="image in images"
          :key="image.id"
          :style="{backgroundImage: `url(${image.sizes.small})`}">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
  mounted() {
    console.log(this.images)
  }
}
</script>