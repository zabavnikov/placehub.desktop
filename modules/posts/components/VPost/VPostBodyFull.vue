<template>
  <div>
    <div class="m-6 text-base post-text" v-html="post.text"></div>
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
.post-text {
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  white-space: pre-line;

  figcaption {
    font-style: italic;
    text-align: center;
    line-height: 20px;
    padding: 8px 12px 0;
  }
}
.post-text > * + * {
  margin-top: 20px;
}
</style>

<script>
import VUrl from '~/modules/urls/components/VUrl';
import PostGallery from './PostGallery';
import 'swiper/swiper-bundle.min.css';

let Swiper = null;

if (process.client) {
  Swiper = require('swiper/swiper-bundle.min.js')
}


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
  mounted() {
    if (Swiper) {
      new Swiper('.swiper', {
        autoHeight: true,
        spaceBetween: 20,
      })
    }
  },
  computed: {
    preview() {
      return this.content.images[0];
    },
  },
}
</script>