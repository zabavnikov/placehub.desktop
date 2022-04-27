<template>
  <div class="node-wrapper-control-tool" @click="$emit('click')" :title="title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
<style lang="scss">
.node-wrapper-control-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,.8);
  border-radius: 99px;
  width: 28px;
  height: 28px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
}

.node-wrapper-control-tool + .node-wrapper-control-tool {
  margin-left: 8px;
}
</style>