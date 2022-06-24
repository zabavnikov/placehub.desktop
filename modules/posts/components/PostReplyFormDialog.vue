<template>
  <div class="bg-white rounded-lg overflow-hidden">
    <div class=" p-4">{{ original }}</div>
    <post-reply-form></post-reply-form>
  </div>
</template>

<script>
import { PostReplyForm } from '~/modules/posts/components/PostForm'

export default {
  components: {
    PostReplyForm
  },
  computed: {
    original() {
      return this.$store.state.posts.replies.original;
    }
  }
}
</script>