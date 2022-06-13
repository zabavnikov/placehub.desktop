<template>
  <the-layout>
    <template #sidebar>&nbsp;</template>
    <template #content>
<!--      <v-post
          v-for="(post, index) in posts.data"
          @delete="posts.data.splice(index, 1)"
          :key="post.id"
          :content="post"
          class="mb-6">
      </v-post>-->
    </template>
  </the-layout>
</template>

<!--<script>
import VPost from '~/modules/posts/components/VPost';

export default {
  components: { VPost },

  async asyncData({ $axios }) {
    const getPosts = GQLQuery('query', {
      posts: {
        data: PostCardFragment
      },
    });

    const { data } = await $axios.$post('/graphql', {
      query: getPosts.toString(),
    });

    return {...data};
  },
}
</script>-->
