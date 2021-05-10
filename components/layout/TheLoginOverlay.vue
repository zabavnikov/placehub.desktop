<template>
  <div class="p-4 rounded-lg bg-white" style="width: 400px;">
    <div v-if="attemptToConfirmMail" class="p-4 mb-4 bg-red-300">
      Для подтверждения адреса электронной почты,
      войдите в свой профиль, используя адреса электронной почты и пароль указнные при регистрации.
    </div>

    <form @submit.prevent="onSubmit" autocomplete="off" :class="{loading}">
      <div class="mb-2 bg-red-300 p-4 ronded" v-if="isBanned">
        Пользователь заблокирован
      </div>

      <div :class="{'is-invalid': errors.has('email')}">
        <label for="email" class="label">Электронная почта: <span class="asterisk"></span></label>
        <input v-model="form.email" class="input" type="email" id="email">
        <div v-if="errors.has('email')" class="help mt-1">{{ errors.first('email') }}</div>
      </div>

      <div class="mt-2" :class="{'is-invalid': errors.has('password')}">
        <div class="flex justify-between">
          <label for="password" class="label">Пароль: <span class="asterisk"></span></label>
          <n-link :to="{name: 'users.password.email'}">Забыли пароль?</n-link>
        </div>
        <input v-model="form.password" class="input" type="password" id="password">
        <div v-if="errors.has('password')" class="help mt-1">{{ errors.first('password') }}</div>
      </div>

      <div class="mt-4">
        Авторизуясь, вы соглашаетесь с
        <n-link to="/terms" class="underline">правилами пользования сайтом</n-link>
        и даете согласие на
        <n-link class="underline" to="/privacy">обработку персональных данных</n-link>
        .
      </div>

      <div class="mt-4">
        <button class="button button-success">Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
import Errors from '~/utils/errors';

const initialState = {
  email: '',
  password: '',
};

export default {
  data() {
    return {
      form: {...initialState},
      loading: false,
      isBanned: false,
      errors: new Errors,
    }
  },
  methods: {
    onSubmit() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      this.$auth.loginWith('local', {data: this.form})
          .then(response => {
            this.form = {...initialState};
            this.$overlay.hide();
            this.isBanned = response.data.hasOwnProperty('ban');
            if (!this.isBanned) {
              window.location.reload();
            }
          })
          .catch(error => this.errors.record(error))
          .finally(() => this.loading = false);
    }
  },

  computed: {
    /**
     * Если пользователь не авторизованный прошел по ссылки подтверждения пароля.
     * @returns {boolean|boolean}
     */
    attemptToConfirmMail() {
      return this.$route.query.hasOwnProperty('expires')
          && this.$route.query.hasOwnProperty('signature');
    }
  }
}
</script>