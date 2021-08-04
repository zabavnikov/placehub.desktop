<template>
  <div>
    <div class="layout-content bg-white p-4 rounded-lg">
      <div class="grid grid-cols-4 gap-1 mb-4">
        <div
            class="wh-ratio rounded bg-cover bg-center"
            v-for="(image, index) in images"
            :key="image.id"
            :style="{backgroundImage: `url(${image.sizes.small})`}">
          <div class="ml-auto p-1" @click="$emit('delete', index)">
            <v-icon name="trash"></v-icon>
          </div>
        </div>
      </div>

      <button type="button" class="button button-primary" @click="$emit('upload')">Добавить фото</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
}
</script>