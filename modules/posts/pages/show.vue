<template>
  <the-layout>
    <template #content>
      <v-post :content="post" full class="mb-6"></v-post>
      <v-comments id="comments"></v-comments>
    </template>
  </the-layout>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import VComments from "~/modules/comments/_desktop/components/VComments";
import VPost from '~/modules/posts/components/VPost';
import { POST } from '../graphql';
import { COMMENT } from '../../comments/graphql';

export default {
  components: {
    VPost,
    VComments
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
    const { post, comments } = await $graphql.default.request(gql`
      query ($id: ID!, $modelType: String) {
        ${POST}
        comments(modelType: $modelType, modelId: $id) {
          ${COMMENT}
        }
      }
    `, {
      id: params.postId,
      modelType: 'posts',
    })

    store.commit('comments/SET', {
      comments: comments,
      modelType: 'posts',
      modelId: params.postId
    });

    return {
      post
    };
  },
}
</script>