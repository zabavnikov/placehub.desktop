<template>
  <figure>
    <div class="relative overflow-hidden">
      <div class="backdrop-blur">
        <div class="backdrop-blur-background" :style="{backgroundImage: `url(${image.sizes.default})`}"></div>
      </div>
      <div :style="{backgroundImage: `url(${image.sizes.default})`}"
           class="bg-contain relative wh-ratio"
           style="background-position: center; background-repeat: no-repeat;">
        <div v-if="!!$slots['counter']" class="absolute right-0 bottom-0 p-4">
          <div class="bg-black bg-opacity-75 py-1 px-2 rounded-full text-white">
            <slot name="counter"></slot>
          </div>
        </div>
      </div>
    </div>

    <figcaption v-if="!!$slots['caption']" class="p-6">
      <slot name="caption"></slot>
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.backdrop-blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 104%;
  height: 104%;
  margin-top: -2%;
  margin-left: -2%;

  &-background {
    width: inherit;
    height: inherit;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(8px);
  }
}
</style>