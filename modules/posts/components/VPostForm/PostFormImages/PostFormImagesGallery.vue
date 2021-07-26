<template>
  <div>
    <div class="handle">handle</div>
    <div @click="$emit('upload')">add photo</div>

    <div class="post-images-wrap" @click="$emit('click')">
      <div :style="{backgroundImage: `url(${activeImage.sizes[storyMode === true ? 'large' : 'small']})`}" class="form-images__image wh-ratio rounded">
        <div class="form-images__delete"
             @click="$emit('delete', activeIndex)">
          <v-icon name="trash" stroke="white" width="16px"></v-icon>
        </div>
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

  watch: {
    images() {
      // Если добавлено новое изображение, то переходим к нему.
      this.activeIndex = this.images.length - 1;
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