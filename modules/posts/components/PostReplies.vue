<template>
  <div>
    <post-reply-form
        @created="$store.commit('posts/replies/ADD', $event)">
    </post-reply-form>

    <div v-if="replies.length > 0" class="space-y-6 mt-6">
      <post-reply v-for="reply in replies" :key="reply.id" :content="reply"></post-reply>
    </div>
  </div>
</template>

<script>
import PostReply from '~/modules/posts/components/PostReply';
import { PostReplyForm } from '~/modules/posts/components/PostForm';

export default {
  components: {
    PostReplyForm,
    PostReply
  },
  computed: {
    replies() {
      return this.$store.state.posts.replies.list;
    }
  }
}
</script>