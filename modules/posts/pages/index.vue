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

    </template>
  </the-layout>
</template>

<script>
import VPost from '../components/VPost';

export default {
  components: { VPost },

  watchQuery: ['tags'],

  async asyncData({ $axios, query }) {
    const getPosts = GQLQuery('query($tags: String)', {
      posts: GQLParams({
        tags: '$tags'
      }, {
        data: PostCardFragment
      }),
    });

    const { data } = await $axios.$post('/gql', {
      query: getPosts.toString(),
      variables: {
        tags: `${query.tags}` || undefined
      }
    });

    return {...data};
  },

}
</script>
