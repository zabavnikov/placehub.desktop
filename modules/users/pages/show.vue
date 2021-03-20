<template>
  <the-layout>
    <template #sidebar>
      <img :src="user.avatar" :alt="user.one_of_names" class="rounded" width="100%" />

      <div v-if="user.id === $auth.user.id" class="mt-4">
        <n-link
            :to="{name: 'users.edit', params: {userId: user.id}}"
            class="button button-success block mb-4"
        >Редактировать</n-link>
      </div>
      <div v-if="user.description">{{ user.description }}</div>
    </template>

    <template #content>
      <v-post-form v-if="$auth.loggedIn" @create="posts.data.unshift($event)" class="mb-4"></v-post-form>
<!--      <v-post v-for="(post, index) in posts.data" @delete="posts.data.splice(index, 1)" :key="post.id" :content="post" class="mb-6"></v-post>-->
    </template>
  </the-layout>
</template>

<script>
import { query as GQLQuery, params as GQLParams, types as GQLTypes } from 'typed-graphqlify';
import VPost from '~/modules/posts/components/VPost';
import VPostForm from '~/modules/posts/components/VPostForm';

export default {
  components: {VPost, VPostForm},

  data() {
    return {
      posts: [],
    }
  },

  async asyncData({ $axios, $auth }) {
    const getUser = GQLQuery('query($id: Int!)', {
      user: GQLParams({ id: '$id' }, {
        id:           GQLTypes.number,
        one_of_names: GQLTypes.string,
        description:  GQLTypes.string,
        avatar:       GQLTypes.string,
      }),
    });

    const { data } = await $axios.$post(`/gql`, {
      query: getUser.toString(),
      variables: { id: $auth.user.id }
    });

    return {...data};
  },
};
</script>

