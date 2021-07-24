<template>
  <client-only>
    <draggable
        v-model="sets"
        :group="{ name: 'g1' }"
        handle=".handle"
        :class="{
          'form-images': true,
          [storyMode ? 'story-mode' : 'grid grid-cols-4 gap-1']: true,
        }">

      <div v-for="(set, setIndex) in sets" :key="setIndex" class="handle">
        <v-post-form-image
            v-for="image in set"
            @click="$emit('upload', setIndex)"
            :key="image.id"
            :image="image"
            :story-mode="storyMode">
        </v-post-form-image>
      </div>
    </draggable>
  </client-only>
</template>

<script>
import throttle from 'lodash/throttle';
import VPostFormImage from './VPostFormImage';

let draggable = null;

if (process.client) {
  draggable = require('vuedraggable');
}

export default {
  name: 'VPostFormImages',
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
    VPostFormImage,
    draggable
  },

  data() {
    return {
      sets: this.value,
    }
  },

  watch: {
    sets() {
      this.$emit('input', this.sets);
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
      this.$emit('input', this.sets.splice(imageIndex, 1));
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
