<template>
  <node-view-wrapper class="node-wrapper-control">
    <div class="node-wrapper-control-tools">
      <div class="node-wrapper-control-tool node-wrapper-control-tool--delete" @click="$emit('delete')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    </div>
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

<style lang="scss">
.node-wrapper-control {
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
}
.node-wrapper-control-tools {
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: rgba(0,0,0,.4);
  border-radius: 8px;

  svg {
    width: 16px;
    height: 16px;
  }
}

.node-wrapper-control-tool--delete {
  cursor: pointer;
}
</style>