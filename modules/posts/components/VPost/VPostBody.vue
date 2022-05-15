<template>
  <n-link :to="{name: 'posts.show', params: {postId: post.id}}" class="block my-6">
    <div v-if="post.shortText" class="text-base leading-5 mx-6 mb-3" v-text="post.shortText"></div>
    <div v-if="post.hashtags.length > 0" class="mx-6 mb-6 flex flex-wrap text-gray-500">
      <nuxt-link v-for="hashtag in post.hashtags" :key="hashtag" :to="`/search/${hashtag}`" class="mr-2 hover:text-gray-800">#{{ hashtag }}</nuxt-link>
    </div>
    <post-gallery v-if="post.images.length > 0" class="mt-6" :images="post.images"></post-gallery>
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