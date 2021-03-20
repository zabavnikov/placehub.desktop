<template>
  <the-layout>
    <template #content>
      <div v-if="status === true" class="p-4 bg-green-300 rounded">
        Адрес электроной почты успешно подтвержден
      </div>
    </template>
  </the-layout>
</template>
<script>
export default {
  middleware: 'auth',

  asyncData({ $axios, $auth, error, params, query, store }) {
    if ($auth.user.email_verified_at) {
      error(404)
    }

    return $axios
        .$get(`/api/users/verify/${params.userId}/${params.token}`, {
          params: {
            expires: query.expires,
            signature: query.signature,
          }
        })
        .then(response => {
          store.commit('UPDATE_USER', {key: 'email_verified_at', value: true})
          return {
            status: true,
          }
        })
        .catch(() => {
          return {
            status: false,
          }
        });
  }
}
</script>
