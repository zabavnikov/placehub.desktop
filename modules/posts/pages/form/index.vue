<template>
  <the-layout>
    <template #sidebar>.</template>
    <template #content>
      <VPostForm :post="post"/>
    </template>
  </the-layout>
</template>

<script>
import VPostForm from '~/modules/posts/components/VPostForm';
import { query as GQLQuery, params as GQLParams, types } from 'typed-graphqlify';
import PostFormFragment from '~/modules/posts/graphql/post-form.fragment';

export default {
  components: {VPostForm},


  async asyncData({ $axios, params }) {
    const getPost = GQLQuery('getPost($id: Int!)', {
      post: GQLParams({id: '$id'}, PostFormFragment),
    });

    const { data } = await $axios.$post('/gql', {
      query: getPost.toString(),
      variables: {
        id: parseInt(params.postId),
      }
    });

    return data;
  },
}
</script>
