<template>
  <div :style="{width: `${progress}%`}" class="v-progress-bar">
    <div v-if="progress < 100">{{ progress }}</div>
    <div v-else>Почти все...</div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
    }
  }
}
</script>

<style>
.v-progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  background-color: #4caf50;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
}
</style>