<template>
  <div>
    <client-only>
      <draggable v-model="images" @end="onDragEnd" handle=".handle" class="grid grid-cols-4 gap-4">
        <div v-for="(image, index) in images" :key="image.id" class="handle">
          <img :src="image.sizes.default" alt="">
        </div>
      </draggable>
    </client-only>

    <v-upload ref="upload" to="posts" @input="onUpload" class="hidden"></v-upload>
  </div>
</template>

<script>
import VUpload from '~/components/common/VUpload';

let draggable = null;

if (process.client) {
  draggable = require('vuedraggable');
}

export default {
  components: {
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
  },

  data() {
    return {
      images: [...this.value],
    }
  },

  methods: {
    onUpload(images) {
      images.forEach(image => this.images.push(image));
      this.$emit('input', this.images);
    },

    onDragEnd() {
      this.$emit('input', this.images);
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
