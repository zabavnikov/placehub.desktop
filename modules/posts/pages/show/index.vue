<template>
  <the-layout>
    <template #sidebar>1</template>
    <template #content>
      <div class="bg-white shadow-sm rounded overflow-hidden">
        <v-profile :user="post.user" class="m-6"></v-profile>

        <div class="m-6 post-text">{{ post.text }}</div>

        <div v-if="post.images.length > 0">
          <figure v-for="image in post.images" :key="image.id">
            <div class="relative">
              <a :href="image.url" target="_blank">
                <img :src="image.presets.small" :alt="image.id" width="100%" class="block" style="border-bottom: 1px solid #f1f1f1">
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

            <figcaption v-if="image.text" class="m-6" style="line-height: 20px; font-size: 12px; font-weight: 500; white-space: pre-line;">{{ image.text }}</figcaption>
          </figure>
        </div>
<!--

        <VUrl v-if="post.url" :url="post.url" class="m-6" />-->

<!--        <div v-if="post.place" class="m-6">
          <div style="font-size: 12px; font-weight: 500">{{ post.place.name }}</div>
          <div class="help">{{ post.place.parent_names }}</div>
        </div>-->

        <VTags v-if="post.tags.length > 0" :tags="post.tags" route-name="posts" class="m-6" />
      </div>

      <VComments class="mt-3" id="comments"/>
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
import { query as GQLQuery, params as GQLParams, types } from 'typed-graphqlify';
import VComments from "~/modules/comments/_desktop/components/VComments";
import VCommentForm from "~/modules/comments/_desktop/components/VCommentForm";
import VLike from "~/components/common/VLike";
import VUrl from '~/modules/urls/components/VUrl';
import VTags from "~/modules/tags/components/VTags";
import VProfile from '~/modules/users/components/VProfile';
import PostFragment from '~/modules/posts/graphql/post.fragment';
import CommentCardFragment from '~/modules/comments/graphql/comment-card.fragment';

export default {
  components: { VUrl, VTags, VLike, VComments, VCommentForm, VProfile },

  /*head() {
    return {
      title: this.post.seo_title,
      meta: [
        { hid: 'description', name: 'description', content: this.post.seo_description },
        { hid: 'keywords', name: 'keywords', content: this.post.seo_keywords },
      ],
    }
  },*/

  async asyncData({ $axios, params, query, store }) {
    const getPost = GQLQuery('getPost($id: Int!, $offset: Int, $subject_type: String!)', {
      post: GQLParams({id: '$id'}, PostFragment),
      comments: GQLParams({
        subject_type: '$subject_type',
        subject_id: "$id",
        offset: '$offset'
      }, CommentCardFragment)
    });

    const { data } = await $axios.$post('/gql', {
      query: getPost.toString(),
      variables: {
        id: parseInt(params.postId),
        subject_type: 'posts',
        offset: parseInt(query.offset) || undefined,
      }
    });

    store.commit('comments/SET', {
      comments: data.comments,
      subjectType: 'posts',
      subjectId: params.postId
    });

    return data;
  },
}
</script>