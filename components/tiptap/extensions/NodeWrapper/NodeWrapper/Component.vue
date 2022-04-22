<template>
  <node-view-wrapper class="node-wrapper">
    <input type="file" ref="file" style="display: none;" @change="addImage">
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';

export default {
  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,

  data() {
    return {
      insertContentAt: 0
    }
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        for (let item of this.$el.children) {
          if (item.className === 'node-wrapper-control') {
            item.__vue__.$on('delete', () => this.deleteNode());

            item.__vue__.$on('upload', getPos => {
              this.insertContentAt = getPos;
              this.$refs.file.click();
            });

            break;
          }
        }
      })
  },

  methods: {
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
          this.editor.commands.insertContentAt(this.insertContentAt + 1,
            images.map(image => {
              return {
                type: 'ImageGroupItem',
                attrs: {
                  src:       image.url,
                  'data-id': image.id,
                }
              }
            })
          );
        });
    }
  }
}
</script>

<style>
.node-wrapper {
  position: relative;
  padding: 8px;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
}
</style>