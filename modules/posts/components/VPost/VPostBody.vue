<template>
  <div>
    <n-link :to="{name: 'posts.show', params: {postId: post.id}}" class="block m-6">
      <div v-if="post.short_text" class="whitespace-pre-line" v-text="post.short_text"></div>
      <div v-if="post.images.length > 0" class="grid grid-cols-4 gap-2 mt-6">
        <div v-for="image in post.images" class="ratio bg-center bg-cover rounded-lg"
             :style="{backgroundImage: `url(${image.sizes.default})`}" :key="image.id">
        </div>
      </div>
    </n-link>
  </div>
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
}
</script>