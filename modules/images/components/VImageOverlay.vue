<template>
  <div class="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
       style="padding: 24px;">
    <div class="grid grid-flow-col grid-cols-2 h-full">
      <div class="rounded-bl-lg rounded-tl-lg overflow-hidden flex items-center justify-center" style="background-color: #333; min-width: 540px; min-height: 480px;">
        <img
            style="width: auto; max-height: 100%;"
            :src="currentImage"
            @load="loading = false"
            @click="next"
            alt="">
      </div>
      <div class="bg-white rounded-br-lg rounded-tr-lg" style="width: 320px">
        {{ loading }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentImageIndex: 0,
      images: [],
      loading: false,
    }
  },
  mounted() {
    this.images = document.querySelectorAll('[data-image-id]');
  },
  computed: {
    currentImage() {
      if (this.images.length > 0) {
        return this.images[this.currentImageIndex].dataset.imageUrl;
      }

      return '';
    }
  },
  methods: {
    next() {
      this.loading = true;

      if (this.currentImageIndex < (this.images.length - 1)) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    }
  }
}
</script>