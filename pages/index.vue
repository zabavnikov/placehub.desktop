<template>
  <the-layout>
    <template #sidebar>&nbsp;</template>
    <template #content>
      <post
          v-for="(post, index) in posts"
          @delete="posts.splice(index, 1)"
          :key="post.id"
          :content="post"
          class="mb-6" />
    </template>
  </the-layout>
</template>

<script>
import { Post } from '~/modules/posts/components/Post';
import { gql } from 'nuxt-graphql-request';
import { POST_FRAGMENT } from '~/modules/posts/graphql';

export default {
  components: { Post },

  async asyncData({ $graphql }) {
    const query = gql`
      query {
        posts {
          ${POST_FRAGMENT}
        }
      }
    `;

    const { posts } = await $graphql.default.request(query);

    return {
      posts
    };
  },
}
</script>
