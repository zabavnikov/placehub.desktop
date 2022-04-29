<template>
  <node-view-wrapper class="swiper-slide" draggable="true">
    <div data-drag-handle>pe</div>
    <div @click="deleteNode">уд</div>
    <img :src="node.attrs.src" :alt="node.attrs.datacaption" style="border-radius: 8px; object-fit: cover; object-position: center; width: 100%; height: 100%; max-height: 480px;">
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';

export default {
  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,

  mounted() {
    console.log(this.node)
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