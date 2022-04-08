<template>
  <the-layout>
    <template #sidebar>1</template>
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
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

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

  mounted() {
    const elms = document.getElementsByClassName( 'splide' );

    for ( let i = 0; i < elms.length; i++ ) {
      new Splide( elms[ i ], {
        perPage: 1,
      }  ).mount();
    }
  },

  async asyncData({ $axios, params, query, store }) {
    const getPost = GQLQuery('getPost($id: Int!, $offset: Int, $subject_type: String!)', {
      post: GQLParams({id: '$id'}, PostFragment),
      comments: GQLParams({
        subject_type: '$subject_type',
        subject_id: "$id",
        offset: '$offset'
      }, CommentCardFragment)
    });

    const { data } = await $axios.$post('/graphql', {
      query: getPost.toString(),
      variables: {
        id: parseInt(params.postId),
        subject_type: 'posts',
        offset: parseInt(query.offset) || undefined,
      }
    });

    store.commit('comments/SET', {
      comments: data.comments,
      subjectType: 'posts',
      subjectId: params.postId
    });

    return data;
  },
}
</script>