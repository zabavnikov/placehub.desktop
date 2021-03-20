<template>
  <div :class="classes">
    <div v-for="(image, index) in images"
         :style="{backgroundImage: `url(${image.url})`}"
         :class="{[`col-span-${geo[count][0][index]}`]: true, 'post-gallery-item': true}"
         :key="image.id">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['images'],

    computed: {
      geo() {
        return {
          1: [[4]],
          2: [[1,1]],
          3: [[4,2,2]],
          4: [[2,2,2,2]],
          5: [[2,3,2,2]],
          6: [[2,2,2,2,2,2]],
          7: [[2,2,2,2,2,2]],
          8: [[4,4,4,2,2,2,2,4]],
          9: [[9,4,5,3,3,3,3,3,3]],
          11: [[6,5,11,4,4,3,3,4,4,5,6]],
          12: [[7,5,4,4,4,5,7,6,6,4,4,4]],
        }
      },

      count() {
        return this.images.length;
      },

      classes() {
        return {
          [`grid grid-columns-${this.count} grid-gap-1 w-full rounded overflow-hidden`]: true,
          'post-gallery-item-before-100': this.count === 2 || this.count === 6,
        };
      }
    },
  }
</script>

<style lang="scss">
  .post-gallery-item-before-100 {
    .post-gallery-item:before {
      padding-top: 100%;
    }
  }

  .post-gallery-item {
    width: 100%;
    height: inherit;
    background-size: cover;
    background-position: center;

    &:before {
      content: '';
      padding-top: 70%;
      float: left;
    }

    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
</style>
