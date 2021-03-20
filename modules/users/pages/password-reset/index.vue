<template>
  <the-layout heading="Восстановление пароля">
    <template #content>
      <form @submit.prevent="onSubmit" class="space-y-2">
        <div>
          <label for="email">Адрес электронной почты <span class="asterisk"></span></label>
          <input v-model="form.email" type="email" class="input" id="email">
        </div>

        <div>
          <label for="password">Пароль <span class="asterisk"></span></label>
          <input v-model="form.password" type="password" class="input" id="password">
        </div>

        <div>
          <label for="password-confirmation">Повторите пароль <span class="asterisk"></span></label>
          <input v-model="form.password_confirmation" type="password" class="input" id="password-confirmation">
        </div>

        <div class="mt-4">
          <button :class="{loading}" class="button button-success">Сохранить</button>
        </div>
      </form>
    </template>
  </the-layout>
</template>

<script>
  export default {
    middleware: 'auth',
    auth: 'guest',
    
    data() {
      return {
        form: {
          email: '',
          password: '',
          password_confirmation: '',
          token: this.$route.params.token
        },
        loading: false
      }
    },

    methods: {
      onSubmit() {
        if (this.loading) {
          return;
        }

        this.loading = false;

        this.$axios.$post('/api/users/password/reset', this.form)
          .then(response => {
            this.$router.push({name: 'users.login'})
          })
          .finally(() => this.loading = false);
      }
    }
  }
</script>

