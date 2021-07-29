<template>
  <div>
    <div class="m-6">
      <div v-if="post.tags && post.tags.length > 0" class="mb-4 flex flex-wrap text-base text-gray-500">
        <n-link to="/" v-for="tag in post.tags" :key="tag.id" class="mr-2 hover:text-gray-800">#{{ tag.name }}</n-link>
      </div>
      <n-link
          v-if="post.short_text" :to="{name: 'posts.show', params: {postId: post.id}}"
          class="text-base whitespace-pre-line block"
          v-text="post.short_text"></n-link>
    </div>

    <n-link v-if="post.preview" :to="{name: 'posts.show', params: {postId: post.id}}" class="block mb-6">
      <post-image :image="post.preview"></post-image>
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