<template>
        <div>
        <div class="m-6 text-base whitespace-pre-line">{{ post.text }}</div>

        <div v-if="post.images.length > 0">
          <figure v-for="image in post.images" :key="image.id">
            <div class="relative">
              <a :href="image.url" target="_blank" class="block">
                <img :src="image.sizes.default" :alt="image.id" width="100%" class="block">
              </a>
<!--              <div v-if="$auth.loggedIn" class="post-image-tools space-x-4">
                <v-like :to="`posts_images/${image.id}`" :count="image.likes_count" :is-liked="image.liked_by_me" color="white"></v-like>
                <div @click="toggleCommentableImage(image.id)" class="underline cursor-pointer">
                  {{ image.id === commentableImageId ? 'Отмена' : 'Комментировать' }}
                  <v-icon name="message-circle" stroke="white"></v-icon>
                </div>
              </div>-->
            </div>

<!--            <VCommentForm
                class="py-6 mx-6"
                v-if="$auth.loggedIn && image.id === commentableImageId"
                :model-type="modelType"
                :model-id="modelId"
                :image-id="commentableImageId"
                placeholder="Комментарий к изображению"
                text-create="Комментарий добавлен в общий список"
                @create="comments.list.data.unshift($event); commentableImageId = null; comments.count++" />-->

            <figcaption v-if="image.text" class="m-6 text-base">{{ image.text }}</figcaption>
          </figure>
        </div>

<!--        <VUrl v-if="post.url" :url="post.url" class="m-6" />

        <div v-if="post.place" class="m-6">
          <div style="font-size: 12px; font-weight: 500">{{ post.place.name }}</div>
          <div class="help">{{ post.place.parent_names }}</div>
        </div>

        <VTags v-if="post.tags.length > 0" :tags="post.tags" route-name="posts" class="m-6" />-->
      </div>
</template>

<script>
export default {
  name: 'VPostBodyFull',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    preview() {
      return this.content.images[0];
    },
    hasImages() {
      return this.content.images && this.content.images.length > 0;
    }
  },
}
</script>