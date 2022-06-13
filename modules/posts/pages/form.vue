<template>
  <the-layout>
    <v-post-form :post="form" slot="content"></v-post-form>
  </the-layout>
</template>

<script>
import VPostForm from '~/modules/posts/components/VPostForm';

export default {
  components: {
    VPostForm
  },
  async asyncData({ $axios, params }) {
    const { form } = await $axios.$get(`/api/posts/form/${params.postId}`);

    return { form };
  }
}
</script>
