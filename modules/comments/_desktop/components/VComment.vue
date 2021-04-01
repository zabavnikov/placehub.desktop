<template>
  <div class="comment" :id="`comment-${comment.id}`">
    <div v-if="comment.deleted_at" class="comment-deleted"><div>Комментарий удален</div></div>

    <div v-else class="comment-content">
      <div class="comment-column">
        <n-link :to="{name: 'users.show', params: {username: comment.user.username}}" class="comment-user-avatar">
          <img :src="comment.user.avatar" :alt="comment.user.one_of_names">
        </n-link>
      </div>

      <div class="comment-column">
        <div class="comment-header">
          <n-link :to="{name: 'users.show', params: {username: comment.user.username}}" class="comment-user">
            {{ comment.user.one_of_names }}
          </n-link>
          <div class="help">{{ comment.created_at }}</div>
        </div>

        <div v-show="!isEdit">
          <div v-if="comment.hasOwnProperty('image') && comment.image !== null" class="mb-2">
            <img :src="comment.image.url" data-zoom />
          </div>

          <span v-if="comment.parent && comment.parent_id !== comment.branch_id" class="text-gray-700">
              <span class="underline cursor-pointer" title="Перейти к комментарию" @click="onScrollToParent(comment.parent_id)">{{ comment.parent.user.one_of_names }}</span>,
          </span>
          <span class="comment-text whitespace-pre-line" v-text="comment.text"></span>

          <div v-if="comment.images && comment.images.length" class="grid grid-cols-4 gap-3 mt-3">
            <a
              v-for="image in comment.images"
              :key="image.id"
              :style="{backgroundImage: `url(${image.presets.square})`, backgroundSize: 'cover', backgroundPosition: 'center'}"
              :href="image.url"
              target="_blank"
              class="wh-ratio rounded"
            >
            </a>
          </div>

          <div class="flex items-center space-x-4 mt-3">
            <v-like
              :to="`${subjectType}_comments/${comment.id}`"
              :count="comment.likes_count"
              :is-liked="comment.like">
            </v-like>
            <div @click="$store.commit('comments/MODE_REPLY', comment)" class="cursor-pointer help">Ответить</div>
          </div>
        </div>

        <!-- Форма ответа/редактирования на комментарий. -->
        <v-comment-form
            class="mt-4"
            v-if="$auth.loggedIn && isEdit || isReply"
            cancelable>
        </v-comment-form>
        <!-- / Форма ответа/редактирования на комментарий. -->
      </div>

      <div class="ml-4 flex-shrink-0">
        <v-dropdown>
          <ul class="dropdown-menu">
            <div @click="$eventBus.$emit('modal', ['complaints', 'complaint', {subjectType: `${subjectType}_comments`, modelId: comment.id}])"
                 class="dropdown-menu-item">Пожаловаться
            </div>
            <a @click="$store.commit('comments/MODE_EDIT', comment)" class="dropdown-menu-item">Редактировать</a>
            <a @click="onDelete(comment)" class="dropdown-menu-item">Удалить</a>
          </ul>
        </v-dropdown>
      </div>
    </div>

    <!-- Ветка ответов. -->
    <div v-if="comment.branch">
      <slot v-if="comment.branch.length > 0" name="replies"></slot>

      <div style="margin-left: 52px;">
        <div
            v-if="comment.branch_replies_count > 3 && comment.branch_replies_count > comment.branch.length && comment.parent_id === null"
            class="cursor-pointer flex items-center space-x-1 mt-2"
            style="line-height: normal"
            @click="onClickMore(comment.branch)"
        >
          <v-icon name="corner-down-right"></v-icon>
          <span class="underline font-bold">Показать еще</span>
          <span class="underline font-bold">{{
              (comment.branch_replies_count - comment.branch.length) >= 5 ? 5 : comment.branch_replies_count - comment.branch.length
            }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VCommentForm from './VCommentForm';
  import VLike from '~/components/common/VLike';
  import VDropdown from "~/components/ui/VDropdown";
  import { query as GQLQuery, params as GQLParams, types } from 'typed-graphqlify';
  import CommentCardFragment from '~/modules/comments/graphql/comment-card.fragment';

  export default {
    name: 'VComment',

    components: {VDropdown, VCommentForm, VLike},

    props: {
      comment: {
        type: Object,
        required: true,
      },
    },

    computed: {
      mode() {
        return this.$store.state.comments.mode;
      },
      selectedComment() {
        return this.$store.state.comments.selectedComment;
      },
      isReply() {
        return this.mode === 'reply'
            && this.selectedComment.id === this.comment.id;
      },
      isEdit() {
        return this.mode === 'edit'
            && this.selectedComment.id === this.comment.id;
      },
      subjectType() {
        return this.$store.state.comments.subjectType;
      },
      subjectId() {
        return this.$store.state.comments.subjectId;
      }
    },

    methods: {
      /**
       * Перейти к родительскому комментарию.
       */
      onScrollToParent(parentId) {
        const parent = document.getElementById(`comment-${parentId}`);

        window.scrollTo({
          top: parent.offsetTop,
          behavior: 'smooth'
        });
      },
      onDelete(comment) {
        if (! window.confirm('Вы подтверждаете действие?')) return;

        this.$axios
            .$delete(`/api/comments/${this.subjectType}/${comment.id}`)
            .then(() => {
              comment.deleted_at = true;

              this.$emit('deleted');
            });
      },

      async onClickMore(list) {
        const getComments = GQLQuery('getComments($subject_type: String!, $subject_id: Int!, $offset: Int, $branch_id: Int)', {
          comments: GQLParams({
            subject_id:   '$subject_id',
            subject_type:   '$subject_type',
            branch_id:    '$branch_id',
            offset:       '$offset'
          }, CommentCardFragment)
        });

        const { data } = await this.$axios.$post('/gql', {
          query: getComments.toString(),
          variables: {
            subject_id: parseInt(this.subjectId),
            subject_type: this.subjectType,
            offset: list.length,
            branch_id: list[0].branch_id,
          }
        });

        data.comments.forEach(comment => list.push(comment))
      },
    }
  }
</script>

<style lang="scss">
  .comment {
    padding: 12px;
  }

  .comment-content {
    display: flex;

    .comment-column {
      &:first-child {
        flex-shrink: 0;
        width: 40px;
        margin-right: 16px;
      }

      + .comment-column {
        flex-grow: 1;
      }
    }
  }

  .comment-header {
    margin-bottom: 4px;
  }

  .comment-footer {
    margin-top: 4px;
  }

  .comment-user {
    font-size: 14px;
    font-weight: 600;
    color: #000;
  }

  .comment-user-avatar {
    display: block;
    width: 40px;
    height: 40px;

    img {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .comment-date {
    margin-left: 8px;
    font-size: 13px;
    font-weight: 500;
  }

  .comment-text {
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    color: #333;
  }

  .comment-deleted {
    user-select: none;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 40px;
    opacity: 0.4;

    div {
      position: relative;
      display: block;
      padding: 8px 16px;
      background-color: #fff;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
    }

    &:before {
      content: '';
      display: block;
      height: 1px;
      border-bottom: 1px dashed #f1f1f1;
      width: 100%;
      position: absolute;
    }
  }
</style>
