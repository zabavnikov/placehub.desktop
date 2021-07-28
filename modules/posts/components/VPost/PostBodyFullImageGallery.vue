<template>
  <figure>
    <div class="relative overflow-hidden">
      <div class="backdrop-blur">
        <div class="backdrop-blur-background" :style="{backgroundImage: `url(${activeImage.sizes.default})`}"></div>
      </div>
      <div :style="{backgroundImage: `url(${activeImage.sizes.default})`}"
           @click="onClickNext"
           class="bg-contain relative wh-ratio"
           style="background-position: center; background-repeat: no-repeat;">
        <div class="absolute right-0 bottom-0 p-4">
          <div class="bg-black bg-opacity-75 py-1 px-2 rounded-full text-white">
            {{ activeIndex + 1 }} из {{ count }}
          </div>
        </div>
      </div>
    </div>
    <figcaption v-if="isActiveImageHasText" class="p-6">{{ activeImage.text }}</figcaption>
  </figure>
</template>

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

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  computed: {
    activeImage() {
      return this.images[this.activeIndex];
    },
    count() {
      return this.images.length;
    },

    isActiveImageHasText() {
      return this.activeImage.text !== null && this.activeImage.text.length > 0;
    },
  },
  methods: {
    onClickNext() {
      if ((this.activeIndex + 1) < this.count) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    }
  }
}
</script>