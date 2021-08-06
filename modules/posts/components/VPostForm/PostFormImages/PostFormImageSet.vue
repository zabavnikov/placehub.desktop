<template>
  <div>
    <div v-if="activeImage" class="post-images-wrap handle" @click="$emit('click')">
      <div :style="{backgroundImage: `url(${activeImage.sizes[storyMode === true ? 'large' : 'small']})`}"
           class="form-images__image wh-ratio rounded">
      </div>

      <VTextarea v-if="storyMode" v-model="activeImage.text" @input="$emit('text', activeImage)" maxlength="2000" placeholder="Добавьте текст" class="mt-2"/>
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
      isEdit: false,
    }
  },

  computed: {
    activeImage() {
      return this.images[this.activeIndex];
    }
  },
}
</script>