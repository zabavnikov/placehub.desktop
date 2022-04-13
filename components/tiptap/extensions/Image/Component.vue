<template>
  <node-view-wrapper draggable="true" style="position: relative;">
    <node-toolbar @delete="deleteNode">
      <template #prepend>
        <node-toolbar-item
            title="Создать слайдер"
            icon="plus-circle"
            @click="onUpload">
        ></node-toolbar-item>
      </template>
    </node-toolbar>
    {{ total }}

    <div :class="{'ring-offset-2 ring-2': selected}">
      <div class="relative">
        <img :src="image.src" :data-id="image['data-id']" alt="" style="display: block">
        <div v-if="total > 1" class="tiptap-slider-arrow tiptap-slider-arrow--previous" @click="onClickPrevious"></div>
        <div v-if="total > 1" class="tiptap-slider-arrow tiptap-slider-arrow--next" @click="onClickNext"></div>
      </div>
      <v-textarea @input="updateAttributes" v-model="image['data-caption']" placeholder="Добавить описание"></v-textarea>
    </div>

    <input type="file" style="display: none;" @change="addImage" multiple>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
import NodeToolbar from '../../toolbar/NodeToolbar';
import NodeToolbarItem from '../../toolbar/NodeToolbarItem';
import 'swiper/swiper-bundle.min.css';
import VTextarea from '../../../common/VTextarea';

export default {
  components: {
    NodeViewWrapper,
    NodeToolbar,
    NodeToolbarItem,
    VTextarea
  },
  props: nodeViewProps,

  data() {
    return {
      activeImageIndex: 0,
    }
  },

  computed: {
    image() {
      return this.node.attrs.images[this.activeImageIndex];
    },
    total() {
      return this.node.attrs.images.length;
    }
  },

  methods: {
    onUpload() {
      this.$el.querySelector('input[type=file]').click();
    },

    addImage(event) {
      const formData = new FormData();
      const images = event.target.files;

      if (images.length === 0) return;

      for (let image of images) {
        formData.append('images[]', image);
      }

      this.$axios
        .$post(`/api/images/posts`, formData)
        .then(images => {
          images.forEach(image => {
            this.node.attrs.images.push({
              src:            image.url,
              'data-id':      image.id,
              'data-caption': '',
            });
          });

          this.updateAttributes();
        });
    },

    onClickPrevious() {
      if (this.activeImageIndex > 0) {
        this.activeImageIndex--;
      }
    },

    onClickNext() {
      if (this.activeImageIndex < this.total - 1) {
        this.activeImageIndex++;
      }
    },

    onDeleteImage(index) {
      this.node.attrs.images.splice(index, 1);

      if (this.node.attrs.images.length === 0) {
        this.deleteNode();
      }
    }
  }
}
</script>

<style lang="scss">
.tiptap-slider-arrow {
  z-index: 10;
  position: absolute;
  top: 50%;
  margin-top: -12px;
  width: 24px;
  height: 24px;
  background-color: rgba(0,0,0,.4);
  border-radius: 12px;

  &--previous {
    left: 12px;
  }

  &--next {
    right: 12px;
  }
}
</style>