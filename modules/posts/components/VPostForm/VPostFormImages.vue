<template>
  <div>
    <client-only>
      <draggable
          v-model="sets"
          handle=".handle"
          :class="{
        'form-images': true,
        [storyMode ? 'story-mode' : 'grid grid-cols-4 gap-1']: true,
      }">

        <div v-for="(set, index) in sets" :key="set.map(image => image['id']).join('-')">
          <post-form-image-set
              :images="set"
              :story-mode="storyMode"
              @text="onChangeText"
              @delete="onDelete(index, $event)"
              @upload="$emit('upload', index)">
          </post-form-image-set>
          <div @click="onEditSet(index)">edit</div>
        </div>
      </draggable>
    </client-only>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import PostFormImageSet from './PostFormImages/PostFormImageSet';

let draggable = null;

if (process.client) {
  draggable = require('vuedraggable');
}

export default {
  name: 'VPostFormImages',

  components: {
    PostFormImageSet,
    draggable
  },

  props: {
    value: {
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
      sets: this.value,
      editableSet: null,
    }
  },

  watch: {
    sets() {
      this.$emit('input', this.sets);
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
     * Если в наборе всего одно изображение, то удаляем сам набор,
     * а если больше одного, то удаляем само изображение из набора.
     * @param setIndex
     * @param imageIndex
     */
    onDelete(setIndex, imageIndex) {
      if (this.sets[setIndex].length === 1) {
        this.$emit('input', this.sets.splice(setIndex, 1));
      } else {
        this.$emit('input', this.sets[setIndex].splice(imageIndex, 1));
      }
    },

    onEditSet(setIndex) {
      this.$overlay.show(() => import('~/modules/posts/components/VPostForm/PostFormImageSetEditor'), {
        props: {
          images: this.sets[setIndex]
        }
      })
    }
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
