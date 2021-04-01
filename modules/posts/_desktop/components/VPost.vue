<template>
  <article class="p-4 bg-white rounded-lg shadow-xl">
    <header class="flex items-center">
      <div class="flex items-center">
        <n-link :to="{name: 'users.show', params: {username: content.user.username}}" class="flex items-center space-x-1 mr-4">
          <img class="rounded-full mr-2 h-6" :src="content.user.avatar">
          <span>{{ content.user.one_of_names }}</span>
        </n-link>
        <n-link :to="{name: 'posts.show', params: {postId: content.id}}" class="font-bold text-gray-500">{{ content.date }}</n-link>
      </div>

      <v-dropdown v-if="$auth.loggedIn" class="flex-shrink-0 ml-auto">
        <ul class="dropdown-menu">
          <n-link :to="{name: 'posts.edit', params: {postId: content.id}}" class="dropdown-menu-item">Редактировать</n-link>
          <li @click="$eventBus.$emit('modal', ['complaints', 'complaint', {modelType: 'posts', modelId: content.id}])"
               class="dropdown-menu-item">Пожаловаться
          </li>
          <li v-if="$auth.user.id === content.user_id" @click="onDelete" class="dropdown-menu-item">Удалить</li>
        </ul>
      </v-dropdown>
    </header>

    <n-link v-if="content.cover" class="block mt-4 -mx-4 relative" :to="{name: 'posts.show', params: {postId: content.id}}">
      <div v-if="content.images_count > 1" class="absolute right-0 bottom-0 m-2 flex items-center space-x-2 bg-black bg-opacity-50 py-1 px-2 rounded">
        <span class="leading-none text-xs text-white font-bold">{{ content.images_count }} фото</span>
      </div>
      <img class="w-full" :src="content.cover.url_small" :alt="content.title">
    </n-link>

    <n-link
      v-if="content.text"
      class="block mt-4"
      style="line-height: 24px; font-weight: 500"
      :to="{name: 'posts.show', params: {postId: content.id}}">
      {{ content.text }}
    </n-link>

    <footer class="flex items-center mt-4">
      <div v-if="content.place.id">
        <div style="font-size: 12px; font-weight: 500;">{{ content.place.name }}</div>
        <div class="help">{{ content.place.parent_names }}</div>
      </div>
      <div class="flex items-center space-x-6 ml-auto">
        <n-link :to="`/posts/${content.id}#comments`" class="flex items-center space-x-2">
          <v-icon name="message-circle"></v-icon>
          <span>{{ content.comments_count }}</span>
        </n-link>
        <v-like :to="`posts/${content.id}`" :count="content.likes_count" :is-liked="content.is_liked"></v-like>
      </div>
    </footer>
  </article>
</template>

<script>
  import VDropdown from '~/components/ui/VDropdown';
  import VLike from '~/components/common/VLike';

  export default {
    components: {VLike, VDropdown},

    props: {
      content: {
        type: Object,
        required: true,
      }
    },

    data() {
      return {
        loading: false,
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
