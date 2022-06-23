<template>
  <div>
    <post-reply-form
        @create="$store.commit('posts/ADD_REPLY', $event)"
        :post-id="postId"
    >
    </post-reply-form>

    <div v-if="replies.length > 0" class="space-y-6 mt-6">
      <post-reply v-for="reply in replies" :key="reply" :content="reply"></post-reply>
    </div>
  </div>
</template>

<script>
import { PostReplyForm } from '~/modules/posts/components/PostForm';
import PostReply from '~/modules/posts/components/PostReply';

export default {
  components: {
    PostReplyForm,
    PostReply
  },
  props: {
    postId: {
      type: Number,
      required: true,
    }
  },
  computed: {
    replies() {
      return this.$store.state.posts.replies;
    },
  }
}
</script>