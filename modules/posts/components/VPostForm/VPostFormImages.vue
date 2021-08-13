<template>
  <div>
    <client-only>
      <draggable v-model="images" @end="onDragEnd" handle=".handle" class="grid grid-cols-4 gap-4">
        <div v-for="image in images" :key="image.id" class="handle">
          <img :src="image.sizes.default" alt="">
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
    }
  }
}
</script>

<style lang="scss">
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
