<template>
  <article class="card bg-white rounded-lg shadow-xs overflow-hidden">
    <header class="flex items-center m-6">
      <v-profile :user="content.user" :sub="content.created_at"></v-profile>
      <d-content-card-menu
          model-type="posts"
          :model-id="content.id"
          route-name="posts"
          route-params="postId">
      </d-content-card-menu>
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
          <v-icon name="chat-alt" stroke="#aaa"></v-icon>
          <span>{{ content.comments_count }}</span>
        </n-link>
        <v-like :to="`posts/${content.id}`" :count="content.likes_count" :is-liked="content.liked_by_me"></v-like>
      </div>
    </footer>
  </article>
</template>

<script>
import DContentCardMenu from '~/components/common/DContentCardMenu';
import VLike from '~/components/common/VLike';
import VUrl from '~/modules/urls/components/VUrl';
import VProfile from '~/modules/users/components/VProfile';
import VTag from '~/components/ui/VTag';

export default {
  components: {DContentCardMenu, VUrl, VLike, VProfile, VTag},

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
