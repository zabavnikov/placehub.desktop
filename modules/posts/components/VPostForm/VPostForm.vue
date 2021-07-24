<template>
  <div class="p-4 bg-white rounded-lg shadow-sm" :class="{loading: parseProgress}">
    <VTextarea
        v-model="form.text"
        placeholder="Привет, что нового?"
        parse-url
        @parse-url-progress="parseProgress = $event"
        @url="form.url_id = $event.id; form.url = $event"
    />

    <div v-if="form.sets && form.sets.length > 0" class="mt-2">
      <VPostFormImages
          v-model="form.sets"
          model-type="posts"
          :story-mode="storyMode"
          @upload="uploadIndex = $event; $refs.upload.$refs.file.click()"
          @loading="loading = $event"/>
    </div>

    <div v-if="form.tags.length > 0" class="flex mt-4 space-x-4">
      <v-tag
          v-for="(tag, index) in form.tags"
          :key="tag.id"
          :name="tag.name"
          editable
          @delete="form.tags.splice(index, 1)"
      >
      </v-tag>
    </div>

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

    <div class="post-form" id="post-form-tools">
      <VProgressBar class="mt-2" v-if="uploadProgress > 0" :progress="uploadProgress"/>

      <div class="flex items-center ">
        <div class="flex items-center space-x-2">
          <v-tags-select v-model="form.tags"
                         v-tooltip="`Теги`">
            <button slot="trigger" type="button" class="post-form-tool" ref="triggerTags">
              <v-icon name="tag" stroke="#b0bec5"></v-icon>
            </button>
          </v-tags-select>

          <v-upload
              ref="upload"
              class="post-form-tool"
              v-tooltip="`Фотографии`"
              to="posts"
              :is-error="errors.first('images')"
              @progress="uploadProgress = $event"
              @input="onUpload"
          >
          </v-upload>

          <button
              @click="$overlay.show(() => import('~/modules/places/components/VChoosePlaceOverlay'), mapOverlay)"
              type="button"
              class="post-form-tool"
              v-tooltip="`Карта`"
              :style="{backgroundColor: errors.first('place_id') ? 'red' : undefined}">
            <v-icon name="location-marker" stroke="#b0bec5"></v-icon>
          </button>

          <button
              @click="onToggleStoryMode"
              type="button"
              v-tooltip="storyModeTooltip"
              class="post-form-tool">
            <v-icon name="collection" :stroke="storyMode ? 'black' : '#b0bec5'"></v-icon>
          </button>
        </div>

        <div class="ml-auto space-x-2 flex items-center">
          <v-post-form-access v-model="form.is_draft"></v-post-form-access>
          <button @click="onSubmit" :class="{loading}" class="button">Отправить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.post-form {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  padding: 1rem;
  margin: 0 -1rem -1rem;
}

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

<script>
import cloneDeep from 'lodash/cloneDeep';
import Cookie from 'js-cookie';
import VTextarea from "~/components/common/VTextarea";
import Errors from "~/utils/errors"
import VPostFormImages from "./VPostFormImages";
import VPostFormAccess from "./VPostFormAccess";
import VUpload from '~/components/common/VUpload';
import VTagsSelect from '~/modules/tags/components/VTagsSelect';
import VUrl from "~/modules/urls/components/VUrl";
import VProgressBar from "~/components/ui/VProgressBar";
import VTag from '~/components/ui/VTag';

const formInitialState = {
  id: null,
  place_id: null,
  text: '',
  place: {},
  tags: [],
  sets: [],
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
    VUrl,
    VTagsSelect,
    VUpload,
    VPostFormImages,
    VTextarea,
    VPostFormAccess,
    VProgressBar,
    VTag,
  },

  data() {
    return {
      loading: false,
      errors: new Errors(),
      showTags: false,
      storyMode: Cookie.get('storyMode') === 'on',
      form: this.post,
      uploadProgress: 0,
      uploadIndex: null,
      parseProgress: false,
    }
  },

  computed: {
    isEdit() {
      return this.post.id > 0;
    },
    storyModeTooltip() {
      return this.storyMode ? 'Отключить режим истории' : 'Включить режим истории';
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
    onToggleStoryMode() {
      this.storyMode = !this.storyMode;
      Cookie.set('storyMode', this.storyMode ? 'on' : 'off');
    },

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

              this.form = cloneDeep(formInitialState);
              this.errors.clear();
              Cookie.set('storyMode', 'off');
            }
          })
          .catch(error => this.errors.record(error))
          .finally(() => this.loading = false);
    },

    onUpload(images) {
      images.forEach(image => {
        if (this.uploadIndex !== null && this.uploadIndex >= 0) {
          this.form.sets[this.uploadIndex].push(image);
        } else {
          this.form.sets.push([image]);
        }
      });

      this.uploadIndex = null;
    },

    scrollToLastUploadedImage() {
      const images = this.$el.querySelector('.form-images');

      if (images) {
        this.$nextTick(() => {
          const lastImage = images.lastChild;

          window.scrollTo({
            top: lastImage.offsetTop - lastImage.getBoundingClientRect().height
          })
        })
      }
    }
  }
}
</script>
