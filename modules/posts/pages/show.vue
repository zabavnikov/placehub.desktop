<template>
  <the-layout>
    <template #content>
      <v-post :content="post" full class="mb-6"></v-post>
      <v-post-form
          v-if="$auth.loggedIn"
          @create="postReplies.unshift($event)"
          is-reply
          :parent-id="post.id"
          class="mb-4">
      </v-post-form>
    </template>
  </the-layout>
</template>

<script>
import { gql } from 'nuxt-graphql-request';
import VPostForm from '~/modules/posts/components/VPostForm';
import VPost from '~/modules/posts/components/VPost';
import { POST } from '../graphql';

export default {
  components: {
    VPost,
    VPostForm
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
    const { post } = await $graphql.default.request(gql`
      query ($id: ID!) {
        ${POST}
      }
    `, {
      id: params.postId,
    })

    /*store.commit('comments/SET', {
      comments: comments,
      modelType: 'posts',
      modelId: params.postId
    });*/

    return {
      post
    };
  },
}
</script>