<template>
  <component :is="tag" @click="onClick">
    <slot></slot>
  </component>
</template>

<script>
  export default {
    props: {
      tag: {
        type: String,
        default: 'div',
      }
    },

    methods: {
      onClick() {
        if (this.$auth.loggedIn) {
          this.$emit('click');
        } else {
          this.$overlay.show(() => import('~/components/layout/TheLoginOverlay'));
        }
      }
    }
  }
</script>
