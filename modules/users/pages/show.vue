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
      <v-post-form v-if="$auth.loggedIn" @create="getPosts.unshift($event)" class="mb-4"></v-post-form>
      <v-post v-for="(post, index) in getPosts" @delete="getPosts.splice(index, 1)" :key="post.id" :content="post" class="mb-6"></v-post>
    </template>
  </the-layout>
</template>

<script>
import PostCardFragment from '~/modules/posts/graphql/post-card.fragment';
import VPost from '~/modules/posts/components/VPost';
import VPostForm from '~/modules/posts/components/VPostForm';
import ProfileHeader from '../components/ProfileHeader';
import { gql } from 'nuxt-graphql-request';
import { GET_USER } from '~/modules/users/graphql';
import { GET_POSTS } from '~/modules/posts/graphql';

export default {
  components: {VPost, VPostForm, ProfileHeader},

  async asyncData({ $graphql, params }) {
    const query = gql`
      query($id: ID!) {
        ${GET_USER}
        ${GET_POSTS}
      }
    `;

    const { getUser, getPosts } = await $graphql.default.request(query, {
      id: params.userId
    });

    return {
      user: getUser,
      getPosts
    };
  },
};
</script>

