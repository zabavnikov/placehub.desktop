<template>
  <the-layout :heading="`Отзыв от ${review.user.one_of_names}`" :subheading="review.place.full_name">
    <template #sidebar>
      {{ review.place_id }}
    </template>
    <template #content>
      <v-review :content="review"></v-review>
      <v-comments :comments="comments"></v-comments>
    </template>
  </the-layout>
</template>

<script>
import ShowPage from '~/modules/reviews/common/mixins/pages/show';
import VReview from '~/modules/reviews/_desktop/components/VReview';
import VComments from '~/modules/comments/_desktop/components/VComments';

export default {
  mixins: [ShowPage],
  components: { VReview, VComments },
}
</script>
