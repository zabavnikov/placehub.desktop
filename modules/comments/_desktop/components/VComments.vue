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

        <div
            v-if="comment.replies_count > 3 && comment.replies_count > comment.branch.length && comment.parent_id === null"
            class="cursor-pointer flex items-center space-x-1 mt-2"
            style="line-height: normal"
            @click="onClickMore(comment.branch)"
            slot="more"
        >
          <v-icon name="corner-down-right"></v-icon>
          <span class="underline font-bold">Показать еще</span>
          <span class="underline font-bold">{{
              (comment.replies_count - comment.branch.length) >= 5 ? 5 : comment.replies_count - comment.branch.length
            }}</span>
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
import { query as GQLQuery, params as GQLParams, types } from 'typed-graphqlify';
import CommentCardFragment from '~/modules/comments/graphql/comment-card.fragment';

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

  methods: {
    async onClickMore(list) {
      const getPostComments = GQLQuery('getPostComments($subject_id: Int!, $offset: Int, $branch_id: Int)', {
        postComments: GQLParams({
          subject_id:   '$subject_id',
          branch_id:    '$branch_id',
          offset:       '$offset'
        }, CommentCardFragment('PostComment'))
      });

      const { data } = await this.$axios.$post('/gql', {
        query: getPostComments.toString(),
        variables: {
          subject_id: parseInt(this.modelId),
          offset: list.length,
          branch_id: list[0].branch_id,
        }
      });

      data.postComments.forEach(comment => list.push(comment))
    },
  }
}
</script>
