<template>
  <v-overlay @close="$overlay.hide()" placement="custom">
    <slot></slot>
  </v-overlay>
</template>

<style>
.v-overlay-placement--custom .v-overlay-content {
  margin-top: var(--header-hegiht);
  margin-right: auto;
  margin-left: var(--d-overlay-margin-left);
}
</style>

<script>
import VOverlay from '~/components/ui/VOverlay';

export default {
  components: {
    VOverlay
  },

  mounted() {
    const { left } = document.querySelector('.layout-content')
        .getBoundingClientRect();

    document.documentElement
        .style
        .setProperty('--d-overlay-margin-left', left + 'px');
  }
}
</script>