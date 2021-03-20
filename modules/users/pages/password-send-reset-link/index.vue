<template>
  <the-layout heading="Восстановление пароля">
    <template #content>
      <div v-if="success === true" class="p-4 mb-4 bg-green-300 rounded">
        Ссылка для сброса пароля отправлена на вашу почту
      </div>
      
      <div v-else>
        <div>
          <label for="email">Адрес электронной почты <span class="asterisk"></span></label>
          <input v-model="email" type="email" class="input" id="email">
        </div>

        <div class="mt-4">
          <button @click="onSubmit" :class="{loading}" class="button button-success">Отправить</button>
        </div>
      </div>
    </template>
  </the-layout>
</template>

<script>
  export default {
    middleware: 'auth',
    auth: 'guest',

    data() {
      return {
        email: '',
        loading: false,
        success: false
      }
    },

    methods: {
      onSubmit() {
        if (this.loading) {
          return;
        }

        this.loading = true;

        this.$axios
          .$post('/api/users/password/email', {email: this.email})
          .then(response => {
            this.success = true;
          })
          .catch(() => this.success = false)
          .finally(() => this.loading = false);
      }
    }
  }
</script>

