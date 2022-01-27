<template>
  <n-link :to="{name: 'posts.show', params: {postId: post.id}}" class="block my-6">
    <div v-if="post.shortText" class="whitespace-pre-line mx-6 mb-6" v-text="post.shortText"></div>
    <post-gallery v-if="post.images.length > 0" :images="post.images"></post-gallery>
  </n-link>
</template>

<script>
import PostGallery from './PostGallery';

export default {
  name: 'VPostBody',

  components: {
    PostGallery,
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