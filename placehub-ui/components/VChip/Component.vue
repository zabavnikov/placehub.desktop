<template>
  <div class="v-chip" :class="{[`v-chip--${size}`]: true, [`v-chip--${theme}`]: true}">
    <div v-if="!!$slots['thumbnail']">
      <slot name="thumbnail"></slot>
    </div>
    <div class="v-chip-text">{{ text }}</div>
    <div v-if="deletable" class="v-chip-delete" @click="$emit('delete')" role="button">
      <slot name="delete">
        <v-icon name="x" width="12" height="12"></v-icon>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'base'
    },
    theme: {
      type: String,
      default: 'base'
    },
    text: {
      type: String,
      required: true,
    },
    deletable: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
.v-chip {
  @apply bg-gray-100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  > * + * {
    margin-left: 8px;
  }
}
// sizes
.v-chip--base {
  height: 32px;
  border-radius: 16px;
}
// themes
.v-chip-text {
  font-size: 12px;
}
.v-chip-delete {
  @apply bg-gray-200 text-gray-400;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
}
</style>