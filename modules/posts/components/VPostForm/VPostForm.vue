<template>
  <div :class="{loading: parseProgress}">
    <div class="bg-white p-4 rounded-t-lg">
      <wysiwyg v-model="form.text"></wysiwyg>
<!--      <VTextarea
          v-model="form.text"
          placeholder="Привет, что нового?"
          parse-url
          @parse-url-progress="parseProgress = $event"
          @url="form.url_id = $event.id; form.url = $event"
      />-->

      <v-post-form-images v-if="form.images.length > 0" class="mt-2" v-model="form.images"></v-post-form-images>

      <!-- Теги. -->
      <div v-if="form.tags.length > 0" class="flex mt-4 space-x-4">
        <v-chip v-for="(tag, index) in form.tags" :key="tag.id" :text="tag.name" deletable @delete="form.tags.splice(index, 1)"></v-chip>
      </div>
      <!-- Теги. / -->

      <div v-if="form.place && Object.keys(form.place).length > 0"
           class="mt-2 flex justify-between shadow-sm p-2 border rounded">
        <div>
          <div class="font-bold">{{ form.place.name }}</div>
          <div class="help">{{ form.place.parent_names }}</div>
        </div>
        <span @click="form.place = {}" class="cursor-pointer"><v-icon name="x" stroke="red"></v-icon></span>
      </div>

      <VUrl v-if="form.url" :url="form.url" @delete="form.url = null; form.url_id = null" editable class="mt-2"/>

      <div v-if="errors.any()" class="is-invalid mt-4">
        <div v-for="error in errors.all()" class="help">
          {{ error[0] }}
        </div>
      </div>
    </div>

    <div class="bg-gray-50 border-t border-solid border-t-gray-100 rounded-b-lg px-4 py-3 sticky bottom-0 z-10">
      <div class="flex items-center ">
        <div class="flex items-center space-x-2">
          <!-- Добавление тегов. -->
          <v-tags-select v-model="form.tags" v-tooltip="`Теги`">
            <button slot="trigger" type="button" class="post-form-tool" ref="triggerTags">
              <v-icon name="tag" stroke="#b0bec5"></v-icon>
            </button>
          </v-tags-select>
          <!-- / Добавление тегов. -->

          <!-- Загрузка изображений. -->
          <button
              @click="$refs.upload.$el.click()"
              v-tooltip="`Фото`"
              type="button"
              class="post-form-tool">
            <v-icon name="camera" stroke="#b0bec5"></v-icon>
          </button>
          <v-upload ref="upload" to="posts" multiple v-model="form.images" class="hidden"></v-upload>
          <!-- / Загрузка изображений. -->

          <!-- Выбор места. -->
          <button
              @click="$overlay.show(() => import('~/modules/places/components/VChoosePlaceOverlay'), mapOverlay)"
              type="button"
              class="post-form-tool"
              v-tooltip="`Карта`"
              :style="{backgroundColor: errors.first('place_id') ? 'red' : undefined}">
            <v-icon name="location-marker" stroke="#b0bec5"></v-icon>
          </button>
          <!-- / Выбор места. -->
        </div>

        <div class="ml-auto space-x-2 flex items-center">
          <v-post-form-access v-model="form.is_draft"></v-post-form-access>
          <button @click="onSubmit" :class="{loading}" class="button">Отправить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Errors from "~/utils/errors"
import VChip from '~/placehub-ui/components/VChip';
import VPostFormAccess from "./VPostFormAccess";
import VPostFormImages from "./VPostFormImages";
import VProgressBar from "~/components/ui/VProgressBar";
import VTagsSelect from '~/modules/tags/components/VTagsSelect';
import VTextarea from "~/components/common/VTextarea";
import VUpload from '~/components/common/VUpload';
import VUrl from "~/modules/urls/components/VUrl";
import cloneDeep from 'lodash/cloneDeep';
import Wysiwyg from '~/components/wysiwyg';

const formInitialState = {
  id: null,
  place_id: null,
  text: '',
  place: {},
  tags: [],
  images: [],
  url: null,
  is_draft: false
};

export default {
  props: {
    post: {
      type: Object,
      default() {
        return cloneDeep(formInitialState)
      }
    }
  },

  components: {
    VChip,
    VPostFormAccess,
    VPostFormImages,
    VProgressBar,
    VTagsSelect,
    VTextarea,
    VUpload,
    VUrl,
    Wysiwyg
  },

  data() {
    return {
      errors: new Errors(),
      form: this.post,
      loading: false,
      parseProgress: false,
      showTags: false,
    }
  },

  computed: {
    isEdit() {
      return this.post.id > 0;
    },
    mapOverlay() {
      return {
        props: {
          value: this.form.place
        },
        on: {
          input: selectedPlace => this.form.place = selectedPlace,
        }
      }
    }
  },

  watch: {
    'form.place.id'(newValue) {
      // Если прилетел undefined, то axios его пропустит и на сервер place_id не улетит,
      // а значит сервер тоже пропустит это поле и не обновит его, по этому если undefined, то заменим его на null.
      this.form.place_id = newValue || null;

      if (newValue) {
        this.errors.clear('place_id');
      }
    },
    'form.images'(newValue) {
      if (newValue.length > 0) {
        this.errors.clear('images');
      }
    },
  },

  methods: {
    onSubmit() {
      if (this.loading) return;

      this.loading = true;

      const options = {
        url: '/api/posts' + (this.isEdit ? `/${this.post.id}` : ''),
        data: this.form,
        method: this.isEdit ? 'put' : 'post'
      };

      this.$axios(options)
          .then(({data}) => {
            // После редактирования переходим в запись,
            // после создания просто чистим форма создания находится прямо в списке постов.
            if (this.isEdit) {
              this.$router.push({name: 'posts.show', params: {postId: this.post.id}});
            } else {
              if (!data.is_draft) {
                this.$emit('create', data);
              } else {
                this.$toast.info('Добавлено в черновики')
              }
              this.errors.clear();
            }

            this.form = cloneDeep(formInitialState);
          })
          .catch(error => this.errors.record(error))
          .finally(() => this.loading = false);
    },
  }
}
</script>

<style lang="scss">
.post-form-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border-radius: 99px;

  &:hover {
    svg {
      stroke: #1a202c;
    }
  }
}
</style>
