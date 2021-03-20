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
  </div>
</template>
<script>
import TheHeader from '~/components/layout/TheHeader';
import Modals from './child/partials/Modals';
import VCookieAgreement from '~/components/common/VCookieAgreement';
import Cookies from 'js-cookie';

export default {
  components: {TheHeader, Modals, VCookieAgreement},
  computed: {
    cookies: () => Cookies,
  }
}
</script>