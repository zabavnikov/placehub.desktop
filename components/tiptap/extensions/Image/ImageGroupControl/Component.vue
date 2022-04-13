<template>
  <node-view-wrapper>
    <div  @click="onClick">
      add to group
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
import NodeToolbar from '../../../toolbar/NodeToolbar';
import NodeToolbarItem from '../../../toolbar/NodeToolbarItem';

export default {
  components: {
    NodeViewWrapper,
    NodeToolbar,
    NodeToolbarItem
  },

  props: nodeViewProps,

  methods: {
    onClick() {
      console.log(this.$parent.$data)
      // this.editor.commands.insertContentAt(this.$parent.props.getPos(), '<imagegroupitem data-id="214" data-caption="" data-src="" src="http://127.0.0.1:1000/storage/c4/ca/1/2022/04/13/laB44Sc5.jpg"></imagegroupitem>')
    }
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