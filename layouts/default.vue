<template>
  <div>
    <TheHeader/>
    <Nuxt/>
    <Modals/>
    <ClientOnly>
      <VCookieAgreement
          :style="{display: cookies.get('cookie_agreement') === 'accepted' ? 'none' : 'block'}"
          @accepted="cookies.set('cookie_agreement', 'accepted', { expires: 365 })"/>
    </ClientOnly>

    <v-overlay v-if="$overlay.is()"></v-overlay>
  </div>
</template>
<script>
import TheHeader from '~/components/layout/TheHeader';
import Modals from './child/partials/Modals';
import VCookieAgreement from '~/components/common/VCookieAgreement';
import VOverlay from "../components/ui/VOverlay";

import Cookies from 'js-cookie';

export default {
  components: {VOverlay, TheHeader, Modals, VCookieAgreement},
  computed: {
    cookies: () => Cookies,
  }
}
</script>