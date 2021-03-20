<template>
  <the-layout>
    <template #sidebar>1</template>
    <template #content>
      <div class="bg-white shadow-sm rounded overflow-hidden">
        <VProfile :user="post.user" :sub="post.date" class="m-6" />

        <div class="m-6 post-text">{{ post.text }}</div>

        <div v-if="post.ordered_images">
          <figure v-for="image in post.ordered_images" :key="image.id" style="border-bottom: 1px solid #fff" :data-image-id="image.id" :data-image-url="image.url">
            <div class="relative">
              <a :href="image.url" target="_blank"><img :src="image.url_small" :alt="image.id" width="100%" class="block"></a>
              <div v-if="$auth.loggedIn" class="post-image-tools space-x-4">
                <v-like :to="`posts_images/${image.id}`" :count="image.likes_count" :is-liked="image.liked_by_me" color="white"></v-like>
                <div @click="toggleCommentableImage(image.id)" class="underline cursor-pointer">
                  <!--{{ image.id === commentableImageId ? 'Отмена' : 'Комментировать' }}-->
                  <v-icon name="message-circle" stroke="white"></v-icon>
                </div>
              </div>
            </div>

            <VCommentForm
                class="py-6 mx-6"
                v-if="$auth.loggedIn && image.id === commentableImageId"
                :model-type="comments.modelType"
                :model-id="comments.modelId"
                :image-id="commentableImageId"
                placeholder="Комментарий к изображению"
                text-create="Комментарий добавлен в общий список"
                @create="comments.list.data.unshift($event); commentableImageId = null; comments.count++" />

            <figcaption v-if="image.text" class="m-6" style="line-height: 20px; font-size: 12px; font-weight: 500; white-space: pre-line;">{{ image.text }}</figcaption>
          </figure>
        </div>

        <VUrl v-if="post.url" :url="post.url" class="m-6" />

        <div v-if="post.place" class="m-6">
          <div style="font-size: 12px; font-weight: 500">{{ post.place.name }}</div>
          <div class="help">{{ post.place.parent_names }}</div>
        </div>

        <VTags v-if="post.tags.length > 0" :tags="post.tags" route-name="posts" class="m-6" />
      </div>
<!--      <VImageOverlay />-->
      <VComments :comments="comments" class="mt-3" id="comments"/>
    </template>
  </the-layout>
</template>

<style>
.post-image-tools {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background-color: rgba(0,0,0,.72);
}
</style>

<script>
import VComments from "~/modules/comments/_desktop/components/VComments";
import VCommentForm from "~/modules/comments/_desktop/components/VCommentForm";
import VLike from "~/components/common/VLike";
import VUrl from '~/modules/urls/components/VUrl';
import VTags from "~/modules/tags/components/VTags";
import VProfile from '~/modules/users/components/VProfile';
import VImageOverlay from '~/modules/images/components/VImageOverlay';

export default {
  components: { VUrl, VTags, VLike, VComments, VCommentForm, VProfile, VImageOverlay },

  head() {
    return {
      title: this.post.seo_title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.seo_description },
        { hid: 'keywords', name: 'keywords', content: this.post.seo_keywords },
      ],
    }
  },

  data() {
    return {
      commentableImageId: null,
    }
  },

  asyncData({ $axios, params }) {
    return $axios
        .$get(`/api/posts/${params.postId}`)
        .then(({ post, comments }) => {

          return {
            post,
            comments
          }
        })
  },

  methods: {
    toggleCommentableImage(imageId) {
      if (this.commentableImageId === null) {
        this.commentableImageId = imageId;
      } else {
        this.commentableImageId = null;
      }
    }
  },

}
</script>