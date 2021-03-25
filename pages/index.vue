<template>
  <the-layout>
    <template #content>
      <v-post v-for="(post, index) in posts" @delete="posts.splice(index, 1)" :key="post.id" :content="post" class="mb-6"></v-post>
    </template>
  </the-layout>
</template>

<script>
import { query as GQLQuery } from 'typed-graphqlify';
import PostCardFragment from '~/modules/posts/graphql/post-card.fragment';
import VPost from '~/modules/posts/components/VPost';

export default {
  components: {
    VPost
  },

  data() {
    return {
      posts: [],
    }
  },

  async asyncData({ $axios }) {
    const getPosts = GQLQuery({
      posts: {
        ...PostCardFragment
      }
    });

    const { data } = await $axios.$post(`/gql`, {
      query: getPosts.toString(),
    });

    return {...data};
  },
};
</script>