<template>
  <div class="node-toolbar">
    <div class="node-toolbar-tools">
      <slot name="prepend"></slot>
      <button type="button" data-drag-handle title="Перетащить">
        <v-icon name="hand" class="node-toolbar-tool"></v-icon>
      </button>
      <node-toolbar-item title="Удалить" icon="x" @click="$emit('delete')"></node-toolbar-item>
    </div>
  </div>
</template>

<script>
import NodeToolbarItem from './NodeToolbarItem';
export default {
  components: {
    NodeToolbarItem
  },
}
</script>

<style lang="scss">
.node-toolbar {
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
}
.node-toolbar-tools {
  display: flex;
  align-items: center;
  margin-left: auto;
  background-color: rgba(0,0,0,.72);
  border-radius: 99px;
  overflow: hidden;
}
.node-toolbar-tool {
  color: #fcfcfc;
  width: 28px;
  height: 28px;
  padding: 4px;
}
</style>