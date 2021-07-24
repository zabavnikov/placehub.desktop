<template>
  <div class="post-images-wrap" @click="$emit('click')">
    <div :style="{backgroundImage: `url(${image.sizes[storyMode === true ? 'large' : 'small']})`}" class="form-images__image wh-ratio rounded">
      <div class="form-images__delete"
           @dblclick="$emit('delete')">
        <v-icon name="trash" stroke="white" width="16px"></v-icon>
      </div>
    </div>

    <VTextarea v-if="storyMode" v-model="image.text" @input="onInput($event, image)" maxlength="2000" placeholder="Добавьте текст" class="mt-2"/>
  </div>
</template>

<script>
import VTextarea from '~/components/common/VTextarea';
export default {
  name: 'VPostFormImage',
  components: {
    VTextarea,
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
    storyMode: {
      type: Boolean
    }
  },
}
</script>