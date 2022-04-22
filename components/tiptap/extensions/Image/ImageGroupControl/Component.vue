<template>
  <node-view-wrapper>
    <div  @click="onClick">
      add to group
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

  methods: {
    onClick() {
      this.editor.commands.insertContentAt(this.getPos() + 1, '<imagegroupitem data-id="214" data-caption="" data-src="" src="http://127.0.0.1:1000/storage/c4/ca/1/2022/04/13/laB44Sc5.jpg"></imagegroupitem>')
    }
  }
}
</script>