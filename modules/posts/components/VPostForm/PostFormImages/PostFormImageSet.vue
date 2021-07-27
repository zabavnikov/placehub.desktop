<template>
  <div>
    <div class="flex space-x-2 justify-end mb-2">
      <div @click="$emit('upload')" class="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full cursor-pointer" title="Добавить фото в слайдер">
        <v-icon name="folder-add" width="20" height="20"></v-icon>
      </div>
      <div class="flex items-center justify-center handle w-6 h-6 bg-gray-200 rounded-full cursor-pointer" title="Удалить изображение"
           @click="$emit('delete', activeIndex)">
        <v-icon name="trash" width="20" height="20"></v-icon>
      </div>
    </div>

    <div v-if="activeImage" class="post-images-wrap handle" @click="$emit('click')">
      <div :style="{backgroundImage: `url(${activeImage.sizes[storyMode === true ? 'large' : 'small']})`}" class="form-images__image wh-ratio rounded">
      </div>
      <VTextarea v-if="storyMode" v-model="activeImage.text" @input="$emit('text', activeImage)" maxlength="2000" placeholder="Добавьте текст" class="mt-2"/>
    </div>

    <div v-if="isGallery" class="mt-4 flex justify-center space-x-2">
      <div v-for="(image, index) in images"
           :key="index"
           :class="{[index === activeIndex ? 'bg-blue-200' : 'bg-gray-200']: true}"
           @click="activeIndex = index"
           class="w-2 h-2 rounded-full cursor-pointer">
      </div>
    </div>
  </div>
</template>

<script>
import VTextarea from '~/components/common/VTextarea';
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },

    storyMode: {
      type: Boolean,
      required: true,
    }
  },

  components: {
    VTextarea,
  },

  data() {
    return {
      activeIndex: 0,
    }
  },

  computed: {
    isGallery() {
      return this.images.length > 1;
    },
    activeImage() {
      return this.images[this.activeIndex];
    }
  },
}
</script>