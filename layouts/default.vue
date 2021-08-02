<template>
  <div>
    <the-header></the-header>
    <nuxt></nuxt>
    <v-overlay v-if="$overlay.is"></v-overlay>
  </div>
</template>
<script>
import TheHeader from '~/components/layout/TheHeader';
import VOverlay from "~/placehub-ui/modules/overlay/Component.vue";

export default {
  components: {
    TheHeader,
    VOverlay
  },
}
</script>