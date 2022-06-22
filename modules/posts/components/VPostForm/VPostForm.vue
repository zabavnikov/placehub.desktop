<template>
  <div :class="{loading: parseProgress}">
    <div class="bg-white p-4 rounded-t-lg">
      <VTextarea
          v-model="form.text"
          :placeholder="isReply ? 'Что ответим?' : 'Привет, что нового?'"
          parse-url
          @parse-url-progress="parseProgress = $event"
          @url="form.url_id = $event.id; form.url = $event"
      />

      <v-post-form-images v-if="form.images.length > 0" class="mt-2" v-model="form.images"></v-post-form-images>

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
              :style="{backgroundColor: errors.first('placeId') ? 'red' : undefined}">
            <v-icon name="location-marker" stroke="#b0bec5"></v-icon>
          </button>
          <!-- / Выбор места. -->
        </div>

        <div class="ml-auto space-x-2 flex items-center">
          <button @click="onSubmit" :class="{loading}" class="button">Отправить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep, pick } from 'lodash';
import { gql } from 'nuxt-graphql-request';
import Errors from "~/utils/errors"
import VChip from '~/placehub-ui/components/VChip';
import VPostFormImages from "./VPostFormImages";
import VProgressBar from "~/components/ui/VProgressBar";
import VTextarea from "~/components/common/VTextarea";
import VUpload from '~/components/common/VUpload';
import VUrl from "~/modules/urls/components/VUrl";
import { CREATE_POST, UPDATE_POST, CREATE_POST_REPLY, UPDATE_POST_REPLY } from '../../graphql';

const formInitialState = {
  placeId: null,
  text: '',
  place: {},
  images: [],
  url: null,
};

export default {
  props: {
    post: {
      type: Object,
      default() {
        return cloneDeep(formInitialState)
      }
    },
    isReply: {
      type: Boolean,
      default: false
    },
    postId: {
      type: Number,
    },
    parentId: {
      type: Number
    }
  },

  components: {
    VChip,
    VPostFormImages,
    VProgressBar,
    VTextarea,
    VUpload,
    VUrl
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
    },
    mutationName() {
      if (this.isReply === false) {
        return this.isEdit
          ? UPDATE_POST
          : CREATE_POST;
      }

      return this.isEdit
          ? UPDATE_POST_REPLY
          : CREATE_POST_REPLY;
    },
    pickFormFields() {
      const fields = ['placeId', 'linkId', 'text', 'images'];

      if (this.isReply) {
        fields.push('parentId');
      }

      return fields;
    }
  },

  watch: {
    'form.place.id'(newValue) {
      // Если прилетел undefined, то axios его пропустит и на сервер placeId не улетит,
      // а значит сервер тоже пропустит это поле и не обновит его, по этому если undefined, то заменим его на null.
      this.form.placeId = newValue || null;

      if (newValue) {
        this.errors.clear('placeId');
      }
    },
    'form.images'(newValue) {
      if (newValue.length > 0) {
        this.errors.clear('images');
      }
    },
  },

  methods: {
    async onSubmit() {
      if (this.loading) return;

      this.loading = true;

      try {
        const input = pick(this.form, ['placeId', 'linkId', 'text', 'images']);

        input.images = input.images.map(image => image.id);

        const variables = {
          id: this.isEdit
              ? parseInt(this.$route.params.postId)
              : undefined,
          input
        };

        const { postForm } = await this.$graphql.default
          .request(gql`${this.mutationName}`, variables)
          .finally(() => this.loading = false);

        if (! this.isEdit) {
          if (! postForm.isDraft) {
            this.$emit('create', postForm);
          }
        } else {
          await this.$router.push({name: 'posts.show', params: {postId: this.$route.params.postId}});
        }

        this.form = cloneDeep(formInitialState);
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false;
      }
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
