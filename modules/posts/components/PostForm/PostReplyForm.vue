<template>
  <div :class="{loading: parseProgress}" ref="target" style="max-width: 640px;">
    <div class="bg-white p-4 rounded-t-lg">
      <VTextarea
          v-model="form.text"
          parse-url
          @parse-url-progress="parseProgress = $event"
          @url="form.url_id = $event.id; form.url = $event"
      />

      <post-form-images v-if="form.images.length > 0" class="mt-2" v-model="form.images"></post-form-images>

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
          <v-upload ref="upload" to="posts_replies" multiple v-model="form.images" class="hidden"></v-upload>
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
          <button @click="$overlay.hide()" :class="{loading}" class="button">Отмена</button>
          <button @click="onSubmit" :class="{loading}" class="button button-primary">Отправить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { useStore } from '@nuxtjs/composition-api'
import { onClickOutside } from '@vueuse/core'
import { cloneDeep, pick } from 'lodash';
import { gql } from 'nuxt-graphql-request';
import Validation from "~/utils/validation"
import PostFormImages from "./partials/PostFormImages";
import VTextarea from "~/components/common/VTextarea";
import VUpload from '~/components/common/VUpload';
import VUrl from "~/modules/urls/components/VUrl";
import { CREATE_POST_REPLY, UPDATE_POST_REPLY } from '../../graphql';
import { usePostsStore, useRepliesStore } from '~/stores/posts'

const formInitialState = {
  place_id: null,
  text: '',
  place: {},
  images: [],
  url: null,
};

export default {
  props: {
    value: {
      type: Object,
      default() {
        return cloneDeep(formInitialState)
      }
    },
  },

  components: {
    PostFormImages,
    VTextarea,
    VUpload,
    VUrl
  },

  setup(props, { $pinia }) {
    const store = useStore()
    const target = ref(null)
    const isEdit = computed(() => props.value.id > 0)

    const postsStore = usePostsStore($pinia)
    const repliesStore = useRepliesStore($pinia)

    if (isEdit) {
      onClickOutside(target, async () => {
      })
    }

    return {
      target,
      isEdit,
      postsStore,
      repliesStore
    }
  },

  data() {
    return {
      errors: new Validation(),
      form: {...this.value},
      loading: false,
      parseProgress: false,
    }
  },

  computed: {
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
      if (this.loading) return

      this.loading = true

      try {
        const input = pick(this.form, ['place_id', 'link_id', 'text', 'images']);

        input.images = input.images.map(image => image.id)
        input.post_id = this.postsStore.post.id
        input.parent_id = this.repliesStore.parent.id

        const variables = {
          id: this.isEdit
            ? parseInt(this.value.id)
            : undefined,
          input
        };

        const { postReplyForm } = await this.$graphql.default
          .request(gql`${this.isEdit
            ? UPDATE_POST_REPLY
            : CREATE_POST_REPLY}`, variables)
          .finally(() => this.loading = false);

        if (this.isEdit) {
          this.$emit('input', this.form);
        } else {
          this.$emit('created', postReplyForm);
        }

        // this.$store.commit('posts/replies/RESET_FORM');
        // this.$overlay.hide();

        this.form = cloneDeep(formInitialState);
      } catch ({ response }) {
        // this.errors.record(response.errors)
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
