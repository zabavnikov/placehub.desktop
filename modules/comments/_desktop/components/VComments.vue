<template>
  <div class="comments">
    <!--    <div class="flex items-center space-x-2 mb-3">
          <div class="text-xl font-bold">Комментарии</div>
          <div v-if="comments.count > 0" class="text-xl font-bold text-gray-500">{{ comments.count }}</div>
        </div>-->

    <div class="bg-white card rounded-t-lg p-4">
      <v-comment-form :disabled="mode !== null"></v-comment-form>
    </div>

    <div class="bg-white card rounded-b-lg">
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
        padding: 24px 0 0;
        margin-top: 24px;
        border-top: 1px dotted #f1f1f1;
      }

      .comment-content > .comment-column:first-child {
        width: 24px;
      }

      .comment-user-avatar,
      .comment-user-avatar img {
        width: 24px;
        height: 24px;
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
