<template>
  <the-layout heading="Мои черновики">
    <template #sidebar>1</template>
    <template #content>
      <div v-if="getPosts.length > 0" class="space-y-6">
        <v-post
            v-for="(post, index) in getPosts"
            :key="post.id"
            :content="post"
            @delete="getPosts.splice(index, 1)">
        </v-post>
      </div>
      <div v-else class="text-base alert alert--warning">У вас нет черновиков</div>
    </template>
  </the-layout>
</template>

<script>
import VPost from '~/modules/posts/components/VPost';

export default {
  middleware: 'auth',
  components: {VPost},

  async asyncData({ $axios }) {
    const getPosts = GQLQuery('getPosts($drafts: Boolean!)', {
      getPosts: GQLParams({
        drafts: '$drafts'
      }, PostCardFragment),
    });

    const { data } = await $axios
        .$post('/graphql', {
          query: getPosts.toString(),
          variables: {
            drafts: true,
          },
        });

    return {...data}
  }
}
</script>