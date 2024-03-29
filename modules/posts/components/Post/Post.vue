<template>
  <article class="card bg-white rounded-lg shadow-xs overflow-hidden">
    <header class="flex items-center m-6">
      <v-profile :user="content.user" :sub="content.created_at"></v-profile>
      <d-content-card-menu
          :can="content.can"
          model-type="posts"
          :model-id="content.id"
          route-name="posts"
          route-params="postId">
      </d-content-card-menu>
    </header>

    <component :is="full ? 'PostBodyFull' : 'PostBody'" :post="content"></component>

    <VUrl v-if="content.url" :url="content.url" :compact="true" class="m-6" />

    <footer class="flex items-center m-6">
      <div class="flex items-center space-x-6">
        <v-like v-if="content.like" :to="`posts/${content.id}`" :count="content.likesCount" :is-liked="content.like.is_liked"></v-like>
        <n-link :to="`/posts/${content.id}#comments`" class="flex items-center space-x-2">
          <v-icon name="chat" stroke="#aaa"></v-icon>
          <span class="text-base">{{ content.commentsCount }}</span>
        </n-link>
      </div>
      <div v-if="content.place" class="text-base ml-auto">
        <div class="text-gray-600">{{ content.place.name }}</div>
        <div class="text-gray-400">{{ content.place.parent_names }}</div>
      </div>
    </footer>
  </article>
</template>

<script>
import DContentCardMenu from '~/components/common/DContentCardMenu';
import VLike from '~/components/common/VLike';
import VUrl from '~/modules/urls/components/VUrl';
import VProfile from '~/modules/users/components/VProfile';
import PostBody from './PostBody'
import PostBodyFull from './PostBodyFull'

export default {
  name: 'VPost',

  components: {
    DContentCardMenu,
    VUrl,
    VLike,
    VProfile,
    PostBody,
    PostBodyFull
  },

  props: {
    content: {
      type: Object,
      required: true,
    },
    full: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      loading: false
    }
  },
  methods: {
    onDelete() {
      if (this.loading) {
        return;
      }

      this.loading = false;

      if (!window.confirm('Вы действительно хотите удалить пост?')) {
        return;
      }

      this.$axios
          .$delete('/api/posts/' + this.content.id)
          .then(response => {
            if (response.status === true) {
              this.$emit('delete');
            }
          })
          .finally(() => this.loading = false);
    }
  }
}
</script>

<style>
.post-text {
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
}

.post-total-photos {
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 8px 12px;
  border-radius: 99px;
  background-color: rgba(0, 0, 0, .8);
  color: #fff;
  line-height: 1;
  font-size: 12px;
  font-weight: 500;
}
</style>
