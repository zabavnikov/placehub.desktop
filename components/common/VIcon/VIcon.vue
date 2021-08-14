<template>
  <svg
      :width="width"
      :height="height"
      :fill="fill"
      :viewBox="`0 0 ${parseInt(width)} ${parseInt(height)}`"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      @click="$emit('click')"
  >
    <use :xlink:href="`/heroicons.svg#${getName}`"/>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    fill: {
      type: String,
      default: 'none'
    },
    solid: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    getName() {
      return this.solid === true ? `${this.name}-solid` : this.name;
    }
  }
}
</script>
