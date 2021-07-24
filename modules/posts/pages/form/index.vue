<template>
  <the-layout>
    <template #sidebar>.</template>
    <template #content>
      <VPostForm :post="form"/>
    </template>
  </the-layout>
</template>

<script>
import VPostForm from '~/modules/posts/components/VPostForm';

export default {
  components: {VPostForm},

  async asyncData({ $axios, params }) {
    const { form } = await $axios.$get(`/api/posts/form/${params.postId}`);

    return {
      form
    };
  },
}
</script>
