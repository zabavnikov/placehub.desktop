<template>
  <the-layout>
    <template #sidebar>#</template>
    <template #content>
      <div v-if="search.length">
        <v-post v-for="(post, index) in search" @delete="search.splice(index, 1)" :key="post.id" :content="post" class="mb-6"></v-post>
      </div>
    </template>
  </the-layout>
</template>

<script>
import { gql } from 'nuxt-graphql-request'
import { SEARCH } from '../graphql'
import VPost from '~/modules/posts/components/VPost'

export default {
  components: {
    VPost
  },

  head() {
    let query = this.$route.params.query;

    return {
      title: `${query.length > 1 ? query : 'Поиск'}`
    }
  },

  async asyncData({ $graphql, params }) {
    const { search } = await $graphql.default.request(gql`
     query ($query: String!) {
        ${SEARCH}
     }
    `, {
      query: params.query
    })

    return {
      search
    }
  }
}
</script>