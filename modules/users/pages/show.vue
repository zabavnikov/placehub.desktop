<template>
  <the-layout>
    <template #hero>
      <profile-header :user="user"></profile-header>
    </template>

    <template #sidebar>

      <div v-if="$auth.loggedIn && user.id === $auth.user.id">
        <n-link
            :to="{name: 'users.edit', params: {userId: user.id}}"
            class="button button-success block"
        >Редактировать</n-link>
      </div>
    </template>

    <template #content>
      <v-post-form v-if="$auth.loggedIn" @create="posts.data.unshift($event)" class="mb-4"></v-post-form>
      <v-post v-for="(post, index) in posts.data" @delete="posts.data.splice(index, 1)" :key="post.id" :content="post" class="mb-6"></v-post>
    </template>
  </the-layout>
</template>

<script>
import {params as GQLParams, query as GQLQuery, types as GQLTypes} from 'typed-graphqlify';
import PostCardFragment from '~/modules/posts/graphql/post-card.fragment';
import VPost from '~/modules/posts/components/VPost';
import VPostForm from '~/modules/posts/components/VPostForm';
import ProfileHeader from '../components/ProfileHeader';

export default {
  components: {VPost, VPostForm, ProfileHeader},

  async asyncData({ $axios, params }) {
    const getUser = GQLQuery('query($username: String!)', {
      user: GQLParams({ username: '$username' }, {
        id:           GQLTypes.number,
        username:     GQLTypes.string,
        one_of_names: GQLTypes.string,
        description:  GQLTypes.string,
        avatar:       GQLTypes.string,
      }),
      posts: GQLParams({ username: '$username' }, {
        data: PostCardFragment
      })
    });

    const { data } = await $axios.$post('/gql', {
      query: getUser.toString(),
      variables: {
        username: params.username,
      }
    });

    return {...data};
  },
};
</script>

