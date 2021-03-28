<template>
  <div class="comments">
    <!--    <div class="flex items-center space-x-2 mb-3">
          <div class="text-xl font-bold">Комментарии</div>
          <div v-if="comments.count > 0" class="text-xl font-bold text-gray-500">{{ comments.count }}</div>
        </div>-->

    <v-comment-form :disabled="mode !== null"></v-comment-form>

    <div>
      <v-comment v-for="comment in comments" :key="comment.id" :comment="comment">
        <div class="replies" slot="replies">
          <v-comment v-for="reply in comment.branch" :key="reply.id" :comment="reply"></v-comment>
        </div>
      </v-comment>
    </div>
  </div>
</template>

<style lang="scss">
.comments {
  .comment {
    + .comment {
      border-top: 1px solid #f1f1f1;
    }

    .replies {
      padding-left: 56px;

      .comment {
        padding-left: 0;
      }

      .comment-content > .comment-column:first-child {
        width: 32px;
      }

      .comment-author-avatar,
      .comment-author-avatar img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>

<script>
import VComment from './VComment';
import VCommentForm from './VCommentForm';

export default {
  name: 'VComments',

  components: {
    VComment,
    VCommentForm,
  },

  computed: {
    comments() {
      return this.$store.state.comments.list;
    },
    mode() {
      return this.$store.state.comments.mode;
    },
  },
}
</script>
