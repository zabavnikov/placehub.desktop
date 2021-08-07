<template>
  <div class="layout-main">
    <div class="layout-content">

      <div class="p-4 bg-white rounded-t-lg">
        <client-only>
          <draggable v-model="editableImages" handle=".handle" class="grid grid-cols-4 gap-4">
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
      </div>

      <footer class="p-4 bg-gray-100 rounded-b-lg border-t border-solid border-gray-200">
        <button type="button" class="button button-primary" @click="$emit('upload')">Добавить фото</button>
      </footer>
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
      editableImages: [...this.images]
    }
  },
  watch: {
    images(newValue) {
      this.editableImages = newValue;
    },
    editableImages(newValue) {
      this.$axios
        .$put('/api/posts/images/order', {
          set: newValue
        })
        .then(() => this.$emit('change', newValue));
    }
  },
}
</script>