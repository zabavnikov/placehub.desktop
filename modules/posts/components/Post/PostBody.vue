<template>
  <nuxt-link :to="{name: 'posts.show', params: {postId: post.id}}" class="block my-6">
    <div v-if="post.text" class="text-base post-text mx-6 mb-3">{{ post.text }}</div>
    <post-body-gallery v-if="post.images.length > 0" class="mt-6" :images="post.images"></post-body-gallery>
  </nuxt-link>
</template>

<script>
import PostBodyGallery from './PostBodyGallery';

export default {
  name: 'PostBody',

  components: {
    PostBodyGallery,
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