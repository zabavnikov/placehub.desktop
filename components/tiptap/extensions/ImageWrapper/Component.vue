<template>
  <node-view-wrapper class="node-wrapper" :class="{'node-wrapper--selected': selected}">
    <node-control @delete="deleteNode">
      <node-control-item @click="$refs.file.click()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </node-control-item>
    </node-control>
    <input type="file" ref="file" style="display: none;" @change="onUpload" multiple>
    <node-view-content></node-view-content>
  </node-view-wrapper>
</template>

<script>
import {
  NodeViewWrapper,
  NodeViewContent,
  nodeViewProps
} from '@tiptap/vue-2';

import NodeControl from '../../components/NodeControl';
import NodeControlItem from '../../components/NodeControlItem';

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    NodeControl,
    NodeControlItem
  },

  props: nodeViewProps,

  methods: {
    onUpload(event) {
      const formData = new FormData();
      const images = event.target.files;

      if (images.length === 0) return;

      for (let image of images) {
        formData.append('images[]', image);
      }

      this.$axios
        .$post(`/api/images/posts`, formData)
        .then(images => {
          this.editor.commands.insertContentAt(this.getPos() + 1,
            images.map(image => {
              return {
                type: 'image',
                attrs: {
                  src:       image.url,
                  'data-id': image.id,
                }
              }
            })
          );
        })
        .finally(() => event.target.value = '');
    }
  }
}
</script>

<style lang="scss">
.node-wrapper {
  padding: 8px;
  border: 1px solid #f1f1f1;
  border-radius: 8px;

  &--selected {
    background-color: aliceblue;
  }
}
</style>