<template>
  <the-layout heading="Редактирование изображения" :class="{loading}">
    <div slot="sidebar">
      <label for="tags" class="label">Теги</label>
      <v-tags-select id="tags" v-model="image.tags" :max="3"></v-tags-select>
    </div>
    <div slot="content">
      <img :src="image.url" :alt="image.text" class="block rounded-t-lg w-full">
      <div class="rounded-b-lg bg-white p-3">
        <v-textarea v-model="image.text" @input="onInput" id="text" placeholder="Описание фотографии"></v-textarea>
      </div>
      <div class="mt-4">
        <button type="button" class="button button-success" @click="onSubmit">Сохранить</button>
      </div>
    </div>
  </the-layout>
</template>

<script>
import VTextarea from "~/components/common/VTextarea";
import VTagsSelect from '~/modules/tags/components/VTagsSelect';

export default {
  components: {VTextarea,VTagsSelect},
  data() {
    return {
      loading: false
    }
  },
  asyncData({ $axios, params }) {
    return $axios
      .$get('/api/images/' + params.imageId)
      .then(({ image }) => {
        return { image }
      });
  },
  methods: {
    onSubmit() {
      if (this.loading) return;

      this.loading = true;

      this.$axios
          .$put(`/api/images/${this.image.id}`, {
            text: this.image.text,
            tags: this.image.tags,
          }, {
            progress: false
          })
          .then(() => {
            this.$router.push({name: 'images.show', params: {imageId: this.image.id}})
          })
          .finally(() => this.loading = false);
    },
  }
}
</script>