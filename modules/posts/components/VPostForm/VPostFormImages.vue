<template>
  <client-only>
    <draggable
        v-model="images"
        handle=".form-images__image"
        :class="{
          'form-images': true,
          [storyMode ? 'story-mode' : 'grid grid-cols-4 gap-1']: true,
        }">
      <div v-for="(image, index) in images" :key="image.id" :id="`post-image-${image.id}`" class="post-images-wrap">
        <div :style="{backgroundImage: `url(${image.presets.square})`}" class="form-images__image wh-ratio rounded">
          <div class="form-images__delete"
               @dblclick="onDelete(index)">
            <v-icon name="trash-2" stroke="white" width="16px"></v-icon>
          </div>
        </div>

        <VTextarea v-if="storyMode" v-model="image.text" @input="onInput($event, image)" maxlength="2000" placeholder="Добавьте текст" class="mt-2"/>
      </div>
    </draggable>
  </client-only>
</template>

<script>
import throttle from 'lodash/throttle';
import VTextarea from '~/components/common/VTextarea/VTextarea';

let draggable = null;

if (process.browser) {
  draggable = require('vuedraggable');
}

export default {
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

  components: {
    VTextarea,
    draggable
  },

  data() {
    return {
      images: this.value,
    }
  },

  watch: {
    images() {
      this.$emit('input', this.images);
    }
  },

  methods: {
    onInput: throttle(function (text, image) {
      this.$emit('loading', true);

      this.$axios
          .$put(`/api/images/${image.id}`, {
            text,
            model_type: this.modelType,
          }, {
            progress: false
          })
          .finally(() => this.$emit('loading', false));
    }, 1500),

    onDelete(imageIndex) {
      this.$emit('input', this.images.splice(imageIndex, 1));
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
    cursor: move;
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
