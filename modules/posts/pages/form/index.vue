<template>
  <the-layout>
    <template #sidebar>.</template>
    <template #content>
      <VPostForm :post="post"/>
    </template>
  </the-layout>
</template>

<script>
import VPostForm from '~/modules/posts/components/VPostForm';

export default {
  components: {VPostForm},

  asyncData({$axios, params}) {
    return $axios
        .$get('/api/posts/form/' + params.postId)
        .then(post => {
          if (
              post.hasOwnProperty('ordered_images') &&
              post.ordered_images.length === post.images.length
          ) {
            post.images = post.ordered_images;
          }
          return {
            post
          }
        })
  },
}
</script>
