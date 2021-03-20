<template>
  <svg
    :width="width"
    :height="height"
    :fill="fill"
    :stroke="stroke"
    :viewBox="`0 0 ${parseInt(width)} ${parseInt(height)}`"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    @click="$emit('click')"
  >
    <use :xlink:href="`/feather-sprite.svg#${name}`"/>
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
      stroke: {
        type: String,
        default: 'black'
      }
    }
  }
</script>
