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
