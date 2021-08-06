<template>
  <div>
    <div class="layout-content bg-white p-4 rounded-lg">

      <client-only>
        <draggable v-model="editableImages" @end="onDragEnd" handle=".handle" class="grid grid-cols-4 gap-4">
        <div
            class="handle wh-ratio rounded bg-cover bg-center"
            v-for="(image, index) in editableImages"
            :key="image.id"
            :style="{backgroundImage: `url(${image.sizes.small})`}">
          <div class="ml-auto p-1" @click="$emit('delete', index)">
            <v-icon name="trash"></v-icon>
          </div>
        </div>
        </draggable>
      </client-only>

      <button type="button" class="button button-primary" @click="$emit('upload')">Добавить фото</button>
    </div>
  </div>
</template>

<script>
let Draggable = null;

if (process.client) {
  Draggable = require('vuedraggable');
}

export default {
  components: {
    Draggable
  },
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      editableImages: this.images
    }
  },
  beforeDestroy() {
    this.$emit('close', this.editableImages)
  },
  methods: {
    onDragEnd() {
      this.$axios.$put('/api/posts/images/order', {
        sets: this.editableImages
      })
    }
  }
}
</script>