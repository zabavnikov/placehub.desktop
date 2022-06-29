<template>
  <the-layout>
    <template #hero>
      <profile-header :user="user"></profile-header>
    </template>

    <template #content>
      <post-form v-if="$auth.loggedIn" @create="posts.unshift($event)" class="mb-4"></post-form>

      <div v-if="posts.length">
        <v-post v-for="(post, index) in posts" @delete="posts.splice(index, 1)" :key="post.id" :content="post" class="mb-6"></v-post>
      </div>
      <div v-else class="text-gray p-3 bg-gray-50 border border-solid border-gray-100 rounded-lg">Ничего не найдено</div>
    </template>
  </the-layout>
</template>

<script>
import VPost from '~/modules/posts/components/VPost';
import { PostForm } from '~/modules/posts/components/PostForm';
import ProfileHeader from '../components/ProfileHeader';
import { gql } from 'nuxt-graphql-request';
import { GET_USER } from '~/modules/users/graphql';
import { GET_POSTS } from '~/modules/posts/graphql';

export default {
  components: {VPost, PostForm, ProfileHeader},

  async asyncData({ $graphql, params }) {
    const query = gql`
      query($userId: ID!) {
        ${GET_USER}
        ${GET_POSTS}
      }
    `;

    const { getUser, posts } = await $graphql.default.request(query, {
      userId: params.userId
    });

    return {
      user: getUser,
      posts
    };
  },
};
</script>

