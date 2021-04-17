<template>
  <div>
    <div class="m-6">
      <div v-if="post.tags.length > 0" class="mb-4 flex flex-wrap text-base text-gray-500">
        <n-link to="/" v-for="tag in post.tags" :key="tag.id" class="mr-2 hover:text-gray-800">#{{ tag.name }}</n-link>
      </div>
      <n-link
          v-if="post.short_text" :to="{name: 'posts.show', params: {postId: post.id}}"
          class="text-base whitespace-pre-line block"
          v-text="post.short_text"></n-link>
    </div>

    <div v-if="hasImages > 0" class="mb-6">
      <n-link :to="{name: 'posts.show', params: {postId: post.id}}" class="block relative">
        <img :src="preview.presets.small_fill" width="100%" :alt="post.short_text" class="block">
        <div class="post-total-photos" v-if="post.images.length > 1">{{ post.images.length }} фото</div>
      </n-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VPostBody',

  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    preview() {
      return this.post.images[0];
    },
    hasImages() {
      return this.post.images && this.post.images.length > 0;
    }
  },
}
</script>