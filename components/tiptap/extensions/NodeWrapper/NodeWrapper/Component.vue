<template>
  <node-view-wrapper class="node-wrapper"></node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';

export default {
  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,

  mounted() {
    this.$nextTick()
      .then(() => {
        for (let item of this.$el.children) {
          if (item.className === 'node-wrapper-control') {
            item.__vue__.$on('delete', () => this.deleteNode());
            break;
          }
        }
      })
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