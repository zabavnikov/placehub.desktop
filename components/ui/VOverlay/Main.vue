<template>
  <div class="v-overlay">
    <div @click="onClose" class="v-overlay-close"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'VOverlay',

    mounted() {
      document.addEventListener('keydown', this.handler);
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = '-17px';
      document.body.style.paddingRight = '34px';
    },

    beforeDestroy() {
      document.removeEventListener('keydown', this.handler)
      document.body.style.overflow = 'auto';
      document.body.style.marginRight = 'initial';
      document.body.style.paddingRight = 'initial';
    },

    methods: {
      handler(event) {
        if (event.key === 'Escape') {
          this.onClose();
        }
      },

      onClose() {
        this.$overlay.toggle();
        this.$emit('close');
      }
    }
  }
</script>

<style lang="scss">
  .v-overlay {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
    background-color: rgba(0,0,0,.4);
    overflow-y: auto;
    padding-right: 17px;
  }

  .v-overlay-close {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
