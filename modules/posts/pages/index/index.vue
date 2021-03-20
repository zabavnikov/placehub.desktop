<template>
  <the-layout>
    <template #sidebar>&nbsp;</template>
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

import VPost from '../../components/VPost';
import VPagination from '~/components/common/VPagination';

export default {
  components: { VPost },

  asyncData({ $axios, query }) {
    const params = {};

    if (query.tagId > 0) {
      params.tagId = query.tagId;
    }

    return $axios
        .$get(`/api/posts`, {
          params
        })
        .then(posts => {
          return {
            posts,
            pagination: {current_page: posts.current_page, total: posts.total, per_page: posts.per_page}
          }
        })
  }
}
</script>
