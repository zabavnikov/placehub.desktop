<template>
  <node-view-wrapper draggable="true" data-drag-handle>
    <node-control position="right">
      <node-control-item @click="deleteNode">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </node-control-item>
    </node-control>
    <img :src="node.attrs.src" :alt="node.attrs.datacaption" style="border-radius: 8px; object-fit: cover; object-position: center; width: 100%; height: 100%; max-height: 480px;">
  </node-view-wrapper>
</template>

<script>
import {
  NodeViewWrapper,
  nodeViewProps
} from '@tiptap/vue-2';

import NodeControl from '../../components/NodeControl';
import NodeControlItem from '../../components/NodeControlItem';

export default {
  components: {
    NodeViewWrapper,
    NodeControl,
    NodeControlItem
  },

  props: nodeViewProps,
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