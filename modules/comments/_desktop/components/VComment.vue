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
          <div class="help">{{ new Date(comment.created_at).toLocaleString('ru-RU') }}</div>
        </div>

        <slot v-if="showEditForm" name="edit-form"></slot>

        <div v-show="!showEditForm">
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
              :style="{backgroundImage: `url(${image.url})`, backgroundSize: 'cover', backgroundPosition: 'center'}"
              :href="image.url"
              target="_blank"
              class="wh-ratio rounded"
            >
            </a>
          </div>

          <div class="flex items-center space-x-4 mt-3">
            <v-like
              :to="`${modelType}_comments/${comment.id}`"
              :count="comment.likes_count"
              :is-liked="comment.liked_by_me">
            </v-like>
            <div @click="$emit('reply', comment.id)" class="cursor-pointer help">Ответить</div>
          </div>
        </div>

        <!-- Форма ответа на комментарий. -->
        <slot v-if="showReplyForm" name="reply-form"></slot>
      </div>

      <div class="ml-4 flex-shrink-0">
        <v-dropdown>
          <ul class="dropdown-menu">
            <div @click="$eventBus.$emit('modal', ['complaints', 'complaint', {modelType: `${modelType}_comments`, modelId: comment.id}])"
                 class="dropdown-menu-item">Пожаловаться
            </div>
            <a @click="$emit('edit', comment.id)" class="dropdown-menu-item">Редактировать</a>
            <a @click="$emit('delete')" class="dropdown-menu-item">Удалить</a>
          </ul>
        </v-dropdown>
      </div>
    </div>

    <!-- Ветка ответов. -->
    <slot v-if="comment.replies && comment.replies.length > 0" name="replies"></slot>

    <div style="margin-left: 52px;">
      <slot name="more"></slot>
    </div>
  </div>
</template>

<script>
  import VCommentForm from './VCommentForm';
  import VLike from '~/components/common/VLike';
  import VDropdown from "~/components/ui/VDropdown";

  export default {
    name: 'VComment',

    components: {VDropdown, VCommentForm, VLike},

    props: {
      modelType: {
        type: String,
        required: true,
      },
      modelId: {
        type: Number,
        required: true,
      },
      comment: {
        type: Object,
        required: true,
      },
      showEditForm: {
        type: Boolean,
        default: false,
      },
      showReplyForm: {
        type: Boolean,
        default: false,
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
