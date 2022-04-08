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

    <div class="p-6 bg-blue-50 rounded-lg" :class="{'ring-offset-2 ring-2': selected}">
      <figure v-for="(image, index) in node.attrs.images" ><!-- @click="onDeleteImage(index)" -->
        <img :src="image.src" :data-id="image['data-id']" alt="" style="display: block">
        <figcaption contenteditable="plaintext-only" @input="updateCaption(image, $event)">{{ image.caption }}</figcaption>
      </figure>
    </div>

    <input type="file" style="display: none;" @change="addImage" multiple>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
import NodeToolbar from '../../toolbar/NodeToolbar';
import NodeToolbarItem from '../../toolbar/NodeToolbarItem';

export default {
  components: {
    NodeViewWrapper,
    NodeToolbar,
    NodeToolbarItem
  },
  props: nodeViewProps,
  methods: {
    onUpload() {
      this.$el.querySelector('input[type=file]').click();
    },

    addImage(event) {
      const files = event.target.files;
      if (files.length === 0) return;

      for (let image of files) {
        this.node.attrs.images.push({
          src: 'https://sun9-14.userapi.com/impg/v6sLzwLolWiBcEjXq2KIaakdw0XNmiAA4FbdbQ/3SR4hf70N9I.jpg?size=1080x1080&quality=96&sign=1ed5ce4db19d82feb77a5552e66c932d&type=album',
          dataId: 1,
          caption: '',
        });
      }

      this.updateAttributes();
    },
    updateCaption(image, { target }) {
      image.caption = target.innerText;
      this.updateAttributes();
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