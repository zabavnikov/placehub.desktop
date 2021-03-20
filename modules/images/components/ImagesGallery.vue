<template>
  <div :class="classes">
    <component :is="linkable ? 'n-link' : 'div'" :to="linkable ? `/images/${image.id}` : undefined"
        v-for="image in images" :key="image.id"
        @click="$emit('click', image)"
        class="wh-ratio rounded"
        :style="{backgroundImage: `url(${image[size]})`, backgroundSize: 'cover', backgroundPosition: 'center'}"
    >
      <div>{{ image.id }}</div>
    </component>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
    size: {
      type: String,
      default: 'url_small'
    },
    cols: {
      type: Number,
      default: 8,
    },
    max: {
      type: Number,
      default: 8
    },
    linkable: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    images(newValue) {
      if (newValue.length > this.max) this.images.length = this.max;
    }
  },
  computed: {
    classes() {
      return `grid grid-cols-${this.cols} grid-rows-${this.cols} gap-4`;
    }
  }
}
</script>