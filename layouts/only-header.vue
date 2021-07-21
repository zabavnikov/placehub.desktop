<template>
  <div class="flex flex-col h-full">
    <the-header></the-header>
    <nuxt></nuxt>
    <v-overlay v-if="$overlay.is()"></v-overlay>
  </div>
</template>

<script>
import TheHeader from '~/components/layout/TheHeader';
import VOverlay from "../components/ui/VOverlay";

export default {
  components: {
    TheHeader,
    VOverlay,
  },
}
</script>