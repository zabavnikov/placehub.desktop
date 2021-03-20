<template>
  <the-layout heading="Фотграфия">
    <div slot="sidebar">
      <n-link :to="{name: 'images.edit', params: {imageId: image.id}}">Редактировать</n-link>
    </div>

    <div slot="content">
      <div class="shadow-sm bg-white rounded-lg">
        <a :href="image.url" target="_blank">
          <img :src="image.url" :alt="image.text" class="block rounded-t-lg w-full">
        </a>
        <div class="m-3">{{ image.text }}</div>
        <div class="m-3" v-if="image.tags.length > 0">
          <VTags :tags="image.tags" />
        </div>
        <v-comments :comments="comments" class="rounded-b-lg"></v-comments>
      </div>
    </div>
  </the-layout>
</template>

<script>
import VComments from "~/modules/comments/_desktop/components/VComments";
import VTags  from "~/modules/tags/components/VTags";

export default {
  components: {VComments,VTags},
  asyncData({ $axios, params }) {
    return $axios
      .$get('/api/images/' + params.imageId)
      .then(({ image, comments }) => {
        return { image, comments }
      });
  }
}
</script>