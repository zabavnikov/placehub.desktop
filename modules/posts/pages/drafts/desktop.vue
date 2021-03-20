<template>
  <the-layout heading="Черновики">
    <template #sidebar>1</template>
    <template #content>
      <v-post
          v-for="(post, index) in posts.data"
          @delete="posts.data.splice(index, 1)"
          :key="post.id"
          :content="post"
          class="mb-6">
      </v-post>

      <v-pagination :pagination="pagination"></v-pagination>
    </template>
  </the-layout>
</template>

<script>
import VPost from '~/modules/posts/components/VPost';
import VPagination from '~/components/common/VPagination';

export default {
  middleware: 'auth',
  components: {VPost, VPagination},

  asyncData({$axios}) {
    return $axios
        .$get('/api/posts/drafts')
        .then(posts => {
          return {
            posts,
            pagination: {current_page: posts.current_page, total: posts.total, per_page: posts.per_page}
          }
        })
  }
}
</script>