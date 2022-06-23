<template>
  <the-layout>
    <template #content>
      <post-form :post="form"></post-form>
    </template>
  </the-layout>
</template>

<script>
import { PostForm } from '~/modules/posts/components/PostForm';

export default {
  middleware: 'auth',

  components: {
    PostForm
  },

  async asyncData({ $axios, params }) {
    const { form } = await $axios.$get(`/api/posts/form/${params.postId}`);
    return { form };
  }
}
</script>