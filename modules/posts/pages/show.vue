<template>
  <the-layout>
    <template #content>
      <v-post :content="post" full class="mb-6"></v-post>
      <post-replies></post-replies>
    </template>
  </the-layout>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import PostReplies from '~/modules/posts/components/PostReplies';
import VPost from '~/modules/posts/components/VPost';
import { POST, POST_REPLIES } from '../graphql';

export default {
  components: {
    VPost,
    PostReplies
  },

  head() {
    return {
      title: this.post.seo_title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.seo_description },
        { hid: 'keywords', name: 'keywords', content: this.post.seo_keywords },
      ],
    }
  },

  async asyncData({ $graphql, params, store }) {
    const { post, postReplies } = await $graphql.default.request(gql`
      query ($postId: Int!) {
        ${POST}
        ${POST_REPLIES}
      }
    `, {
      postId: parseInt(params.postId),
    })

    store.commit('posts/replies/SET_POST_ID', parseInt(params.postId));
    store.commit('posts/replies/ADD', postReplies);

    return {
      post
    };
  },
}
</script>