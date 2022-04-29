<template>
  <div class="node-wrapper-control">
    <slot></slot>
  </div>
</template>


<script>
import NodeControlItem from '../NodeControlItem';

export default {
  components: {
    NodeControlItem
  }
}
</script>

<style lang="scss">
.node-wrapper-control {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}
</style>