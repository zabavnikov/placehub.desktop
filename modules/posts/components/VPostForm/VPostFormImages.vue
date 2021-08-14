<template>
  <div>
    <client-only>
      <draggable v-model="images" @end="onDragEnd" handle=".handle" class="grid grid-cols-4 gap-2">
        <div v-for="(image, index) in images" :key="image.id" class="handle relative">
          <img :src="image.sizes.default" alt="" class="rounded-lg">
          <div @click="onDelete(index)" class="absolute top-0 right-0 m-1 p cursor-pointer rounded-full bg-black bg-opacity-75">
            <v-icon name="x-circle" class="text-white" width="20" height="20"></v-icon>
          </div>
        </div>
      </draggable>
    </client-only>
  </div>
</template>

<script>
let draggable = null;

if (process.client) {
  draggable = require('vuedraggable');
}

export default {
  components: {
    draggable
  },

  props: {
    value: {
      type: Array,
      required: true,
    },
  },

  watch: {
    value(newValue) {
      if (this.skipWatchIfDragged === false) {
        this.images = newValue;
      } else {
        this.skipWatchIfDragged = false;
      }
    }
  },

  data() {
    return {
      images: [...this.value],
      skipWatchIfDragged: false,
    }
  },

  methods: {
    onDragEnd() {
      this.skipWatchIfDragged = true;
      this.$emit('input', this.images);
    },
    onDelete(index) {
      this.images.splice(index, 1);
      this.skipWatchIfDragged = true;
      this.$emit('input', this.images);
    },
  }
}
</script>
