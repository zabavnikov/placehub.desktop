<template>
        <div>
        <div class="m-6 text-base leading-5 whitespace-pre-line post-text" v-html="post.html"></div>
          <post-gallery v-if="post.images.length > 0" :images="post.images"></post-gallery>

<!--        <div v-if="post.images.length > 0" class="grid grid-cols-4 gap-2 m-6">
          <div v-for="image in post.images" class="ratio bg-center bg-cover rounded-lg"
               :style="{backgroundImage: `url(${image.sizes.default})`}" :key="image.id">
                          <div v-if="$auth.loggedIn" class="post-image-tools space-x-4">
                            <v-like :to="`posts_images/${image.id}`" :count="image.likes_count" :is-liked="image.liked_by_me" color="white"></v-like>
                            <div @click="toggleCommentableImage(image.id)" class="underline cursor-pointer">
                              {{ image.id === commentableImageId ? 'Отмена' : 'Комментировать' }}
                              <v-icon name="message-circle" stroke="white"></v-icon>
                            </div>
                          </div>
          </div>


            <VCommentForm
                class="py-6 mx-6"
                v-if="$auth.loggedIn && image.id === commentableImageId"
                :model-type="modelType"
                :model-id="modelId"
                :image-id="commentableImageId"
                placeholder="Комментарий к изображению"
                text-create="Комментарий добавлен в общий список"
                @create="comments.list.data.unshift($event); commentableImageId = null; comments.count++" />

        </div>-->

          <v-url v-if="post.url" :url="post.url" class="m-6"></v-url>
      </div>
</template>

<style lang="scss">
.post-image-sets {
  .post-image-set + .post-image-set {
    border-top: 1px solid #f1f1f1;
  }
}
.post-text * + * {
  margin-top: 20px;
}
</style>

<script>
import VUrl from '~/modules/urls/components/VUrl';
import PostGallery from './PostGallery';

export default {
  name: 'VPostBodyFull',
  components: {
    PostGallery,
    VUrl,
  },
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
  },
}
</script>