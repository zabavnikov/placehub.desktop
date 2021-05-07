<template>
  <button class="button" :class="classes" @click="$emit('click', test)">
    {{ test }}
  </button>
</template>

<script>
export default {
  props: {
    test: String
  },
  computed: {
    classes() {
      return {
        'rounded-full': this.circle === true,
      };
    }
  }
}
</script>