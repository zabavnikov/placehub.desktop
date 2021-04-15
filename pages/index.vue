<template>
  <the-layout>
    <template #sidebar>&nbsp;</template>
    <template #content>
      <v-post
          v-for="(post, index) in posts"
          @delete="posts.splice(index, 1)"
          :key="post.id"
          :content="post"
          class="mb-6">
      </v-post>

    </template>
  </the-layout>
</template>

<script>
import {params as GQLParams, query as GQLQuery} from 'typed-graphqlify';
import VPost from '~/modules/posts/components/VPost';
import PostCardFragment from '~/modules/posts/graphql/post-card.fragment';

export default {
  components: { VPost },

  watchQuery: ['tags'],

  async asyncData({ $axios, query }) {
    const getPosts = GQLQuery('query($tags: String)', {
      posts: GQLParams({
        tags: '$tags'
      }, PostCardFragment),
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
