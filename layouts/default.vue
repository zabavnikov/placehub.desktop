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
    <the-login-overlay v-if="$overlay.is('auth:login') && !$auth.loggedIn"></the-login-overlay>
  </div>
</template>
<script>
import TheHeader from '~/components/layout/TheHeader';
import Modals from './child/partials/Modals';
import VCookieAgreement from '~/components/common/VCookieAgreement';
import TheLoginOverlay from '~/components/layout/TheLoginOverlay';

import Cookies from 'js-cookie';

export default {
  components: {TheHeader, Modals, TheLoginOverlay, VCookieAgreement},
  computed: {
    cookies: () => Cookies,
  }
}
</script>