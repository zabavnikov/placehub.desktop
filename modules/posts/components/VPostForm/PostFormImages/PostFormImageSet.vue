<template>
  <div>
    <div class="flex space-x-2 justify-end mb-2">
      <v-dropdown>
        <div slot="trigger">
          <v-icon name="dots-horizontal"></v-icon>
        </div>
        <ul>
          <li @click="$emit('upload')">Добавить изображение в галлерею</li>
          <li @click="$emit('delete', activeIndex)">Удалить активное изображение</li>
        </ul>
      </v-dropdown>
    </div>

    <div v-if="activeImage" class="post-images-wrap handle" @click="$emit('click')">
      <div :style="{backgroundImage: `url(${activeImage.sizes[storyMode === true ? 'large' : 'small']})`}"
           class="form-images__image wh-ratio rounded">
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
import VDropdown from "~/components/ui/VDropdown";
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
    VDropdown,
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