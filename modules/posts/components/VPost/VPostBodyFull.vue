<template>
        <div>
        <div class="m-6 text-base whitespace-pre-line">{{ post.text }}</div>

        <div v-if="post.sets.length > 0" class="post-image-sets">
          <div v-for="set in post.sets" :key="`set-${set[0]['id']}`" class="post-image-set">
            <post-body-full-image-gallery v-if="set.length > 1" :images="set"></post-body-full-image-gallery>
            <div v-else>
              <div v-for="image in set" class="relative" :key="image.id">
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

          </div>
        </div>

<!--        <VUrl v-if="post.url" :url="post.url" class="m-6" />

        <div v-if="post.place" class="m-6">
          <div style="font-size: 12px; font-weight: 500">{{ post.place.name }}</div>
          <div class="help">{{ post.place.parent_names }}</div>
        </div>

        <VTags v-if="post.tags.length > 0" :tags="post.tags" route-name="posts" class="m-6" />-->
      </div>
</template>

<style lang="scss">
.post-image-sets {
  .post-image-set + .post-image-set {
    border-top: 1px solid #f1f1f1;
  }
}
</style>

<script>
import PostBodyFullImageGallery from './PostBodyFullImageGallery';

export default {
  name: 'VPostBodyFull',
  components: {
    PostBodyFullImageGallery
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
    hasImages() {
      return this.content.images && this.content.images.length > 0;
    }
  },
}
</script>