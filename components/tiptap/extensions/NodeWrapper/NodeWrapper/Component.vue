<template>
  <node-view-wrapper :class="{[selected ? 'bg-green-50' : 'bg-gray-100']: true, 'p-4': true}"></node-view-wrapper>
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