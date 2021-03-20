<template>
  <div></div>
</template>
<script>
export default {
  middleware: 'auth',
  auth: 'guest',

  async asyncData({ app, $axios, params, query }) {
    await $axios
        .$get(`/api/users/token/${params.providerName}/callback?code=${query.code}`)
        .then(async (response) => {
          await app.$auth.setUserToken(response.token)
          console.log(1)
        })
  },

  mounted() {
    let authBack = localStorage.getItem('authBack');
    localStorage.removeItem('authBack');
    if (authBack) {
      this.$router.push(authBack);
    } else {
      this.$router.push('/');
    }
  }
}
</script>
