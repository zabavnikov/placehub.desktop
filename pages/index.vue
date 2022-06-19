<template>
  <the-layout>
    <template #sidebar>&nbsp;</template>
    <template #content>
      <v-post
          v-for="(post, index) in getPosts"
          @delete="getPosts.splice(index, 1)"
          :key="post.id"
          :content="post"
          class="mb-6">
      </v-post>
    </template>
  </the-layout>
</template>

<script>
import VPost from '~/modules/posts/components/VPost';
import { gql } from 'nuxt-graphql-request';
import { POST_FRAGMENT } from '~/modules/posts/graphql';

export default {
  components: { VPost },

  async asyncData({ $graphql }) {
    const query = gql`
      query {
        getPosts {
          ${POST_FRAGMENT}
        }
      }
    `;

    const { getPosts } = await $graphql.default.request(query);

    return {
      getPosts
    };
  },
}
</script>
