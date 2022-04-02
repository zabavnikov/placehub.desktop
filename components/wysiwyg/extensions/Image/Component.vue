<template>
  <node-view-wrapper draggable="true" style="position: relative;">
    <node-toolbar @delete="deleteNode">
      <template #prepend>
        <node-toolbar-item
            title="Установить на обложку"
            icon="check"
            :class="{'bg-green hover:bg-green': parseInt(editor.contentComponent.$parent.coverId) === parseInt(node.attrs['data-id'])}"
            @click="editor.contentComponent.$emit('cover', node.attrs['data-id'])"
        >
        </node-toolbar-item>
      </template>
    </node-toolbar>

    <div class="p-5 bg-blue-50 rounded-lg">
      <img :src="node.attrs.src" :data-id="node.attrs['data-id']" alt="" style="display: block">
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';
import NodeToolbar from '../../toolbar/NodeToolbar';
import NodeToolbarItem from '../../toolbar/NodeToolbarItem';

export default {
  components: {
    NodeViewWrapper,
    NodeToolbar,
    NodeToolbarItem
  },
  props: nodeViewProps,
}
</script>