<template>
  <div class="comments">
    <!--    <div class="flex items-center space-x-2 mb-3">
          <div class="text-xl font-bold">Комментарии</div>
          <div v-if="comments.count > 0" class="text-xl font-bold text-gray-500">{{ comments.count }}</div>
        </div>-->

    <v-comment-form
        v-if="$auth.loggedIn"
        :model-type="modelType"
        :model-id="modelId">
    </v-comment-form>
    <div v-else class="text-xs">
      Только авторизованные пользователи могут оставлять комментарии
    </div>

    <div>
      <v-comment
          v-for="(comment, indexComment) in comments"
          :key="comment.id"
          :model-type="modelType"
          :model-id="modelId"
          :comment="comment"
          @deleted="comment.branch.splice(indexComment, 1)"
      >

        <!-- Ветка ответов. -->
        <div class="replies" slot="replies">
          <v-comment
              v-for="(reply, indexReply) in comment.branch"
              :key="reply.id"
              :model-type="modelType"
              :model-id="modelId"
              :comment="reply"
              @deleted="comment.branch.splice(indexReply, 1)"
          >
          </v-comment>
        </div>
        <!-- / Ветка ответов. -->

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

    <div @click="onClickMore(mutableComments)">показать еще</div>
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
    modelType() {
      return 'posts';
    },
    modelId() {
      return this.comments[0]['model_id'];
    },
    comments() {
      return this.$store.state.comments.list;
    }
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
