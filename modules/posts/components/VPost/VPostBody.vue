<template>
  <n-link :to="{name: 'posts.show', params: {postId: post.id}}" class="block my-6">
    <div v-if="post.short_text" class="whitespace-pre-line mx-6 mb-6" v-text="post.short_text"></div>
    <div v-if="post.images.length > 0" :class="grid">
      <div
          v-for="image in post.images"
          class="bg-center bg-cover aspect-w-4 aspect-h-3"
          :key="image.id">
        <img :src="image.sizes.default" alt="" class="w-full h-full object-center object-cover">
      </div>
    </div>
  </n-link>
</template>

<script>
import PostImage from './PostImage';

export default {
  name: 'VPostBody',

  components: {
    PostImage,
  },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  computed: {
    count() {
      return this.post.images.length;
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