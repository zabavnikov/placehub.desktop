<template>
  <button class="button" :class="classes">
    <slot></slot>
  </button>
</template>

<script>
export default {
  computed: {
    classes() {
      return {
        'rounded-full': this.circle === true,
      };
    }
  }
}
</script>