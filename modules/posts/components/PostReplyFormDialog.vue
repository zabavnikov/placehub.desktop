<template>
  <div class="bg-white rounded-lg overflow-hidden">
    <div class="p-4">{{ repliesStore.parent }}</div>
    <post-reply-form></post-reply-form>
  </div>
</template>

<script>
import { onBeforeUnmount } from '@vue/composition-api'
import { PostReplyForm } from '~/modules/posts/components/PostForm'
import { useRepliesStore } from '~/stores/posts'

export default {
  components: {
    PostReplyForm
  },
  setup(_, { $pinia }) {
    const repliesStore = useRepliesStore($pinia)

    onBeforeUnmount(() => {
      repliesStore.parent = {}
    })

    return {
      repliesStore
    }
  }
}
</script>