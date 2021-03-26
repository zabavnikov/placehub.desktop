<template>
  <div class="comments">
<!--    <div class="flex items-center space-x-2 mb-3">
      <div class="text-xl font-bold">Комментарии</div>
      <div v-if="comments.count > 0" class="text-xl font-bold text-gray-500">{{ comments.count }}</div>
    </div>-->

    <v-comment-form
      v-if="$auth.loggedIn"
      :model-type="modelType"
      :model-id="modelId"
      @create="onCreate">
    </v-comment-form>
    <div v-else class="text-xs">
      Только авторизованные пользователи могут оставлять комментарии
    </div>

    <div>
      <v-comment
          v-for="comment in comments"
          :key="comment.id"
          :model-type="modelType"
          :model-id="modelId"
          :comment="comment"
          :show-edit-form="showEditForm === comment.id"
          :show-reply-form="showReplyForm === comment.id"
          @edit="toggleEditForm"
          @reply="toggleReplyForm"
          @delete="onDelete(comment)"
      >
        <!-- Форма редактирования комментариев. -->
        <v-comment-form
            v-if="$auth.loggedIn"
            slot="edit-form"
            show-cancel
            :model-type="modelType"
            :model-id="modelId"
            :comment="comment"
            @cancel="showEditForm = false"
            @update="onUpdate(comment, $event)">
        </v-comment-form>
        <!-- / Форма редактирования комментариев. -->

        <!-- Форма ответа на комментарий. -->
        <v-comment-form
            v-if="$auth.loggedIn"
            class="mt-4"
            slot="reply-form"
            show-cancel
            :model-type="modelType"
            :model-id="modelId"
            :parent-comment-id="comment.id"
            @create="onCreateReply(comment, $event)"
            @cancel="showReplyForm = false">
        </v-comment-form>
        <!-- / Форма ответа на комментарий. -->

        <!-- Ветка ответов. -->
        <div class="replies" slot="replies">
          <v-comment
              v-for="reply in comment.replies"
              :key="reply.id"
              :model-type="modelType"
              :model-id="modelId"
              :comment="reply"
              :show-edit-form="showEditForm === reply.id"
              :show-reply-form="showReplyForm === reply.id"
              @edit="toggleEditForm"
              @reply="toggleReplyForm"
              @delete="onDelete(comment, reply)"
          >
            <!-- Форма редактирования ответов. -->
            <v-comment-form
                v-if="$auth.loggedIn"
                slot="edit-form"
                show-cancel
                :model-type="modelType"
                :model-id="modelId"
                :comment="reply"
                @cancel="showEditForm = false"
                @update="onUpdate(reply, $event)">
            </v-comment-form>

            <!-- Форма ответа на комментарий. -->
            <v-comment-form
                v-if="$auth.loggedIn"
                class="mt-4"
                slot="reply-form"
                show-cancel
                :model-type="modelType"
                :model-id="modelId"
                :parent-comment-id="reply.id"
                @create="onCreateReply(comment, $event)"
                @cancel="showReplyForm = false">
            </v-comment-form>
            <!-- / Форма ответа на комментарий. -->
          </v-comment>
        </div>
        <!-- / Ветка ответов. -->

        <div
            v-if="comment.replies_count > 3 && comment.replies_count > comment.replies.length && comment.parent_id === null"
            class="cursor-pointer flex items-center space-x-1 mt-2"
            style="line-height: normal"
            @click="onLoad(comment)"
            slot="more"
        >
          <v-icon name="corner-down-right"></v-icon>
          <span class="underline font-bold">Показать еще</span>
          <span class="underline font-bold">{{ (comment.replies_count - comment.replies.length) >=5 ? 5 : comment.replies_count - comment.replies.length }}</span>
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

    props: {
      comments: {
        type: Array,
      },
    },

    computed: {
      modelType() {
        return 'posts';
      },
      modelId() {
        return this.comments[0]['model_id'];
      }
    },

    data() {
      return {
        showEditForm: false,
        showReplyForm: false,
      }
    },

    methods: {
      toggleEditForm(commentId) {
        this.showEditForm = this.showEditForm === commentId ? false : commentId;

        if (this.showEditForm) {
          this.showReplyForm = false;
        }
      },

      toggleReplyForm(replyId) {
        this.showReplyForm = this.showReplyForm === replyId ? false : replyId;

        if (this.showReplyForm) {
          this.showEditForm = false;
        }
      },

      /**
       * Создание комментария.
       * @param comment
       */
      onCreate(comment) {
        this.comments.unshift(comment);
      },

      /**
       * Создание ответа на комментарий.
       *
       * @param parentComment - передаем комментарий самого верхнего уровня,
       * так как всего два уровня вложености.
       *
       * @param reply
       */
      onCreateReply(parentComment, reply) {
        if (!parentComment.hasOwnProperty('replies')) {
          this.$set(parentComment, 'replies', []);
        }

        parentComment.replies.push(reply);
        this.showReplyForm = false;
      },

      /**
       * Обновление комментария.
       *
       * @param comment
       * @param newComment
       */
      onUpdate(comment, newComment) {
        // Свойста которые нужно обновить.
        ['text', 'images', 'image']
          .forEach(property => comment[property] = newComment[property]);

        this.showEditForm = false
      },

      /**
       * Удаление комментария.
       */
      onDelete(branch, comment = null) {
        if (! window.confirm('Вы подтверждаете действие?')) {
          return;
        }

        // Если передана только ветка (родительский комментарий), то работаем с ним.
        if (comment === null) {
          comment = branch;
        }

        this.$axios
          .$delete(`/api/comments/${this.modelType}/${comment.id}`)
          .then(() => {
            comment.deleted_at = true;

            // Если передан comment, то уветки отнимаем кол. ответов.
            if (comment.parent_id) {
              branch.replies_count--;
            }

            this.comments.count--;
          });
      },

      onLoad(comment) {
        this.$axios
          .$get('/api/comments/more', {
            params: {
              model_id: this.modelType,
              branch_id: comment.id,
              offset: comment.replies.length,
            }
          })
          .then(replies => {
            if (replies.length) {
              replies.forEach(reply => comment.replies.push(reply))
            }
          })
      },
    }
  }
</script>
