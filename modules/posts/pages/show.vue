<template>
  <the-layout>
    <template #content>
      <v-post :content="post" full class="mb-6"></v-post>
      <v-comments id="comments"></v-comments>
    </template>
  </the-layout>
</template>

<script>
import { params as GQLParams, query as GQLQuery } from 'typed-graphqlify';
import VComments from "~/modules/comments/_desktop/components/VComments";
import PostFragment from '~/modules/posts/graphql/post.fragment';
import CommentCardFragment from '~/modules/comments/graphql/comment-card.fragment';
import VPost from '~/modules/posts/components/VPost';

export default {
  components: { VPost, VComments },

  head() {
    return {
      title: this.post.seo_title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.seo_description },
        { hid: 'keywords', name: 'keywords', content: this.post.seo_keywords },
      ],
    }
  },

  async asyncData({ $axios, params, query, store }) {
    const getPost = GQLQuery('getPost($id: ID!, $offset: Int, $modelType: String)', {
      post: GQLParams({id: '$id'}, PostFragment),
      comments: GQLParams({
        modelType: '$modelType',
        modelId: "$id",
        offset: '$offset'
      }, CommentCardFragment)
    });

    const { data } = await $axios.$post('/graphql', {
      query: getPost.toString(),
      variables: {
        id: parseInt(params.postId),
        modelType: 'posts',
        offset: parseInt(query.offset) || undefined,
      }
    });

    store.commit('comments/SET', {
      comments: data.comments,
      modelType: 'posts',
      modelId: params.postId
    });

    return data;
  },
}
</script>