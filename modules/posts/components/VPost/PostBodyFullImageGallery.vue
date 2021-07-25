<template>
  <figure>
    <div class="text-right mb-1 mr-6">
      {{ activeIndex + 1 }} из {{ count }}
    </div>
    <img :src="getActiveImage.sizes.default" @click="onClickNext" class="w-full" />
    <figcaption v-if="getActiveImage.text" class="p-6">{{ getActiveImage.text }}</figcaption>
  </figure>
</template>

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
    getActiveImage() {
      return this.images[this.activeIndex];
    },
    count() {
      return this.images.length;
    }
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