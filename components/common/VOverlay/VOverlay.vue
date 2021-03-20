<template>
  <div class="v-overlay">
    <div @click="onClose" class="v-overlay-close"></div>
    <div class="v-overlay-content">
      <div class="container"><slot></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VOverlay',

    props: {
      name: {
        type: String,
        required: true,
      }
    },

    mounted() {
      document.addEventListener('keydown', this.handler);
    },

    beforeDestroy() {
      document.removeEventListener('keydown', this.handler)
    },

    methods: {
      handler(event) {
        if (event.key === 'Escape') {
          this.onClose();
        }
      },

      onClose() {
        this.$overlay.toggle(this.name);
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
  }

  .v-overlay-close {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .v-overlay-content {
    position: relative;
    padding: 64px 16px 16px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
