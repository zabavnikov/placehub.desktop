<template>
  <the-layout heading="Регистрация">
    <div slot="sidebar">&nbsp;</div>
    <form @submit.prevent="onSubmit" autocomplete="off" class="space-y-4" slot="content">
      <div :class="{'is-invalid': errors.has('email')}">
        <label for="email" class="label">Электронная почта: <span class="asterisk"></span></label>
        <input v-model="form.email" @input="errors.clear('email')" class="input" type="email" id="email" maxlength="50">
        <div v-show="errors.has('email')" class="help mt-1">{{ errors.first('email') }}</div>
      </div>

      <div :class="{'is-invalid': errors.has('username')}">
        <label for="username" class="label">Имя пользователя: <span class="asterisk"></span></label>
        <input v-model="form.username" @input="errors.clear('username')" class="input" type="text" id="username" maxlength="25" placeholder="Разрешены цифры и символы латинского алфавита">
        <div v-if="errors.has('username')" class="help mt-1">{{ errors.first('username') }}</div>
      </div>

      <div :class="{'is-invalid': errors.has('password')}">
        <label for="password" class="label">Придумайте пароль: <span class="asterisk"></span></label>
        <input v-model="form.password" @input="errors.clear('password')" class="input" type="password" id="password" placeholder="Не менее 6 символов">
        <div v-if="errors.has('password')" class="help mt-1">{{ errors.first('password') }}</div>
      </div>

      <div>
        <label for="password-confirmation" class="label">Повторие пароль: <span class="asterisk"></span></label>
        <input v-model="form.password_confirmation" class="input" type="password" id="password-confirmation">
      </div>

      <div>
        Регистрируясь, вы соглашаетесь с <n-link to="/terms" class="underline">правилами пользования сайтом</n-link> и даете согласие на <n-link class="underline" to="/privacy">обработку персональных данных</n-link>.
      </div>

      <div class="mt-6">
        <button class="button button-success">Зарегистрироватся</button>
      </div>
    </form>
  </the-layout>
</template>

<script>
import Errors from '~/utils/errors';

const formInitialState = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
};


export default {
  middleware: 'auth',
  auth: 'guest',

  data() {
    return {
      form: {...formInitialState},
      errors: new Errors,
      loading: false,
    }
  },

  methods: {
    onSubmit() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      this.$axios
          .$post('/api/users/register', this.form)
          .then(({ token }) => {
            this.$auth.setUserToken(token)
                .then(() => {
                  this.form = {...formInitialState};
                  this.$router.push({name: 'users.show', params: {username: this.$auth.user.username }})
                })
          })
          .catch(error => this.errors.record(error))
          .finally(() => this.loading = false);
    }
  }
}
</script>
