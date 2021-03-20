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
          this.$toast.info('Войдите в профиль')
        }
      }
    }
  }
</script>
