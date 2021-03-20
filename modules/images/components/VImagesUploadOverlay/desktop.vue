<template>
  <v-overlay name="images-upload">
    <div class="container">
      <div class="p-3 bg-white rounded">
        <div class="flex space-x-3">
          <div class="w-3/5">
            <input type="file" max="5" @change="onUpload">
            <div v-if="images.length" class="grid grid-cols-2 grid-rows-2 gap-4">
              <div
                  v-for="image in images" :key="image.id"
                  class="wh-ratio rounded cursor-pointer"
                  :title="image.text"
                  :style="{backgroundImage: `url(${image.url})`, backgroundSize: 'cover', backgroundPosition: 'center'}"
                  :class="{'v-images-gallery--selected': selected && selected.id === image.id}" @click="selected = image">
              </div>
            </div>
          </div>
          <div class="w-2/5">
            <div v-if="selected">
              <label for="text" class="label">Описание</label>
              <v-textarea v-model="selected.text" @input="onInput" id="text" placeholder="Описание фотографии"></v-textarea>

              <div class="mt-4">
                <label for="tags" class="label">Теги</label>
                <v-tags-select id="tags" v-model="selected.tags" :max="3"></v-tags-select>
              </div>

              <div v-if="save" class="help mt-4">Сохраняю...</div>
            </div>
          </div>
        </div>
        <button v-show="images.length > 0" type="button" class="button mt-4" @click="$overlay.toggle('images-upload')">Готово</button>
      </div>
    </div>
  </v-overlay>
</template>

<style>
.v-images-gallery--selected {
  border: 4px solid #2a2a92;
}
</style>


<script>
import VOverlay from '~/components/ui/VOverlay';
import VTextarea from "~/components/common/VTextarea";
import throttle from "lodash/throttle";
import VTagsSelect from '~/modules/tags/components/VTagsSelect';

export default {
  components: {VOverlay, VTextarea, VTagsSelect},

  data() {
    return {
      images: [],
      progress: 0,
      selected: null,
      save: false,
    }
  },

  watch: {
    'selected.tags'() {
      this.onInput()
    }
  },

  methods: {
    onInput: throttle(function () {
      if (this.save) return;

      this.save = true;

      this.$axios
        .$put(`/api/images/${this.selected.id}`, {
          text: this.selected.text,
          tags: this.selected.tags,
        }, {
          progress: false
        })
        .finally(() => this.save = false);
    }, 1500),

    onDelete(index) {
      this.$delete(this.images, index);
      this.$emit('input', this.images);
    },

    onUpload(event) {
      const files = event.target.files, formData = new FormData();

      if (files.length < 1 || this.images.length >= this.max) {
        event.target.value = '';
        return;
      }

      for (let file of files) {
        formData.append('images[]', file)
      }

      formData.append('place_id', this.$route.params.placeId);

      this.$axios
          .$post('/api/images/upload', formData, {
            onUploadProgress: (progressEvent) => {
              this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            }
          })
          .then(images => {
            if (images.length > 0) {
              images.forEach(image => this.images.unshift(image));
              this.selected = images[0];
              this.$emit('uploaded', images);
            }
          })
          .finally(() => {
            event.target.value = '';
            this.progress = 0;
          });
    }
  }
}
</script>