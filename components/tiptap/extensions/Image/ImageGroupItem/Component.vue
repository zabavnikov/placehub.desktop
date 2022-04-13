<template>
  <node-view-wrapper draggable="true" style="position: relative;">
    <div>image</div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
import NodeToolbar from '../../../toolbar/NodeToolbar';
import NodeToolbarItem from '../../../toolbar/NodeToolbarItem';
import 'swiper/swiper-bundle.min.css';
import VTextarea from '../../../../common/VTextarea';

export default {
  components: {
    NodeViewWrapper,
    NodeToolbar,
    NodeToolbarItem,
    VTextarea
  },

  props: nodeViewProps
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