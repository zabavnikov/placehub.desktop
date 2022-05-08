<template>
  <div class="node-control" :class="{[`node-control--position-${position}`]: true}">
    <slot></slot>
  </div>
</template>


<script>
import NodeControlItem from '../NodeControlItem';

export default {
  components: {
    NodeControlItem
  },
  props: {
    position: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style lang="scss">
.node-control {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  z-index: 10;
  padding: 12px;

  &--position-right {
    right: 0;
  }

  &--position-left {
    left: 0;
  }
}
</style>