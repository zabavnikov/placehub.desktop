<template>
  <article class="bg-white rounded shadow-sm overflow-hidden">
    <header class="flex items-center m-6">
      <VProfile :user="content.user" :sub="content.created_at" />
      <v-dropdown v-if="$auth.loggedIn" class="flex-shrink-0 ml-auto">
        <ul class="dropdown-menu">
          <n-link :to="{name: 'posts.edit', params: {postId: content.id}}" class="dropdown-menu-item">Редактировать
          </n-link>
          <li @click="$eventBus.$emit('modal', ['complaints', 'complaint', {modelType: 'posts', modelId: content.id}])"
              class="dropdown-menu-item">Пожаловаться
          </li>
          <li v-if="$auth.user.id === content.user_id" @click="onDelete" class="dropdown-menu-item">Удалить</li>
        </ul>
      </v-dropdown>
    </header>

    <n-link v-if="content.short_text " :to="{name: 'posts.show', params: {postId: content.id}}"
            class="post-text m-6 block">{{ content.short_text }}
    </n-link>


    <div v-if="hasImages > 0" class="mb-6">
      <n-link :to="{name: 'posts.show', params: {postId: content.id}}" class="block relative">
        <img :src="preview.presets.small" width="100%" :alt="content.short_text" class="block">
        <div class="post-total-photos" v-if="content.images.length > 1">{{ content.images.length }} фото</div>
      </n-link>
    </div>


    <VUrl v-if="content.url" :url="content.url" :compact="hasImages" class="m-6" />

    <footer class="flex items-center m-6">
      <div v-if="content.place" class="text-gray-500">
        <div style="font-size: 12px; font-weight: 500;">{{ content.place.name }}</div>
        <div class="help">{{ content.place.parent_names }}</div>
      </div>
      <div class="flex items-center space-x-6 ml-auto">
        <n-link :to="`/posts/${content.id}#comments`" class="flex items-center space-x-2">
          <v-icon name="message-circle" stroke="#aaa"></v-icon>
          <span>{{ content.comments_count }}</span>
        </n-link>
        <v-like :to="`posts/${content.id}`" :count="content.likes_count" :is-liked="content.liked_by_me"></v-like>
      </div>
    </footer>
  </article>
</template>

<script>
import VDropdown from '~/components/ui/VDropdown';
import VLike from '~/components/common/VLike';
import VUrl from '~/modules/urls/components/VUrl';
import VProfile from '~/modules/users/components/VProfile';

export default {
  components: {VUrl, VLike, VDropdown, VProfile},

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

  computed: {
    preview() {
      return this.content.images[0];
    },
    hasImages() {
      return this.content.images && this.content.images.length > 0;
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
  line-height: 20px;
  white-space: pre-line;
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
