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
import {params as GQLParams, query as GQLQuery} from 'typed-graphqlify';
import VPost from '~/modules/posts/components/VPost';
import PostCardFragment from '~/modules/posts/graphql/post-card.fragment';

export default {
  components: { VPost },

  watchQuery: ['tags'],

  async asyncData({ $axios, query }) {
    const getPosts = GQLQuery('getPosts($tags: String)', {
      posts: GQLParams({
        tags: '$tags'
      }, {
        data: PostCardFragment
      }),
    });

    const { data } = await $axios.$post('/graphql', {
      query: getPosts.toString(),
      variables: {
        tags: `${query.tags}` || undefined
      }
    });

    return {...data};
  },

  methods: {
    show(text) {
      console.log(text)
    }
  }

}
</script>
