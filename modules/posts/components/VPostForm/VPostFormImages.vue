<template>
  <div>
    <client-only>
      <draggable
          v-model="sets"
          handle=".handle"
          :class="{
        'form-images': true,
        [storyMode ? 'story-mode' : 'grid grid-cols-4 gap-4']: true,
      }">

        <div v-for="(set, index) in sets" :key="set.map(image => image['id']).join('-')">
          <div class="flex items-center justify-between mb-1">
            <div>{{ set.length }} фото</div>
            <v-icon name="dots-horizontal" @click="onEdit(index)" class="cursor-pointer"></v-icon>
          </div>
          <post-form-image-set
              class="cursor-move"
              :images="set"
              :story-mode="storyMode"
              @text="onChangeText">
          </post-form-image-set>
        </div>
      </draggable>
    </client-only>

    <v-upload ref="upload" to="posts" @input="onUpload" class="hidden"></v-upload>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import PostFormImageSet from './PostFormImages/PostFormImageSet';
import VUpload from '~/components/common/VUpload';

let draggable = null;

if (process.client) {
  draggable = require('vuedraggable');
}

export default {
  name: 'VPostFormImages',

  components: {
    PostFormImageSet,
    VUpload,
    draggable
  },

  props: {
    value: {
      type: Array,
      required: true,
    },

    modelType: {
      type: String,
      required: true,
    },

    storyMode: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      sets: [...this.value],
      editableSet: null,
    }
  },

  watch: {
    sets(newValue) {
      this.$nextTick().then(() => this.$emit('input', newValue))
    },
  },

  methods: {
    onChangeText: throttle(function (image) {
      this.$emit('loading', true);

      this.$axios
          .$put(`/api/images/${image.id}`, {
            text: image.text,
            model_type: this.modelType,
          }, {
            progress: false
          })
          .finally(() => this.$emit('loading', false));
    }, 1500),

    /**
     * Редактирование набора изображений.
     * @param setIndex
     */
    onEdit(setIndex) {
      let set = this.sets[setIndex];
      this.editableSet = setIndex;

      this.$overlay.show(() => import('~/modules/posts/components/VPostForm/PostFormImageSetEditor'), {
        props: {
          set
        },
        on: {
          change: images => {
            // Если удалено последние изображение, то удаляем и сама набор.
            if (images.length === 0) {
              this.$overlay.hide();
              this.$nextTick(() => this.sets.splice(setIndex, 1));
              this.editableSet = null;
            } else {
              this.$set(this.sets, setIndex, images);
            }
          },
          upload: () => this.$refs.upload.$el.click(),
        }
      })
    },

    onUpload(images) {
      images.forEach(image => {
        if (this.editableSet !== null && this.editableSet >= 0) {
          this.sets[this.editableSet].push(image);
        } else {
          this.sets.push([image]);
        }
      });
    },
  }
}
</script>

<style lang="scss">
.story-mode {
  .post-images-wrap + .post-images-wrap {
    margin-top: 24px;
  }
}

.form-images {
  &__image {
    background-size: cover;
    background-position: 50%;
  }

  &__delete {
    margin-left: auto;
    width: 24px;
    height: 24px;
    background-color: rgba(255, 17, 0, .8);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
}
</style>
