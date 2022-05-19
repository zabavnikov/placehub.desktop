<template>
  <div class="latest-comments">
    <h3 class="text-lg mb-4">Последние комментарии</h3>
    <ul v-if="comments.length" class="space-y-4">
      <li v-for="comment in comments" :key="comment.id">
        <div class="flex">
          <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="flex items-center">
            <img :src="comment.user.avatar" :alt="comment.user.name" class="rounded-full w-8 h-8" />
          </nuxt-link>
          <div class="ml-2">
            <nuxt-link :to="{name: 'users.show', params: {userId: comment.user_id}}" class="block">
              {{ comment.user.name }}
            </nuxt-link>
            <nuxt-link :to="`/posts/${comment.model_id}#comments`" class="text-gray-500">
              {{ comment.created_at }}
            </nuxt-link>
          </div>
        </div>

        <nuxt-link :to="`/posts/${comment.model_id}#comments`" class="mt-1 block text-gray-700">
          {{ comment.text }}
        </nuxt-link>
      </li>
    </ul>
    <div v-else class="text-gray-500">Пусто :(</div>
  </div>
</template>

<script>
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    return {
      comments: computed(() => store.state.comments.latest),
    }
  }
})
</script>