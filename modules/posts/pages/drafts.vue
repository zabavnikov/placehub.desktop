<template>
  <the-layout heading="Мои черновики">
    <template #sidebar>1</template>
    <template #content>
      <div v-if="posts.data.length > 0" class="space-y-6">
        <v-post
            v-for="(post, index) in posts.data"
            :key="post.id"
            :content="post"
            @delete="posts.data.splice(index, 1)">
        </v-post>
      </div>
      <div v-else class="text-base alert alert--warning">У вас нет черновиков</div>
    </template>
  </the-layout>
</template>

<script>
import { params as GQLParams, query as GQLQuery } from 'typed-graphqlify';
import VPost from '~/modules/posts/components/VPost';
import PostCardFragment from '~/modules/posts/graphql/post-card.fragment';

export default {
  middleware: 'auth',
  components: {VPost},

  async asyncData({ $axios }) {
    const getPosts = GQLQuery('getPosts($drafts: Boolean!)', {
      posts: GQLParams({
        drafts: '$drafts'
      }, {
        data: PostCardFragment
      }),
    });

    const { data } = await $axios
        .$post('/gql', {
          query: getPosts.toString(),
          variables: {
            drafts: true,
          },
        });

    return {...data}
  }
}
</script>