<template>
  <node-view-wrapper draggable="true" class="tiptap-image">
    <img :src="node.attrs.src" :data-id="node.attrs['data-id']" alt="" style="display: block">
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
export default {
  components: {
    NodeViewWrapper,
  },
  props: nodeViewProps,
}
</script>