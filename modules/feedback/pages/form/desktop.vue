<template>
  <the-layout heading="Обратная связь">
    <template #sidebar>.</template>
    <template #content>
      <form v-if="!success" @submit.prevent="onSubmit" :class="{loading}">
        <label for="category" class="label">Категория <span class="asterisk"></span></label>
        <select v-model="form.category" class="input" id="category">
          <option v-for="(category, key) in categories" :key="key" :value="key">{{ category }}</option>
        </select>
        <div v-if="errors.has('category')" class="text-red-500 mt-1">{{ errors.first('category') }}</div>

        <div class="mt-4">
          <label for="name" class="label">Ваше имя <span class="asterisk"></span></label>
          <input v-model="form.name" type="text" id="name" class="input">
          <div v-if="errors.has('name')" class="text-red-500 mt-1">{{ errors.first('name') }}</div>
        </div>

        <div class="mt-4">
          <label for="email" class="label">Адрес электронной почты <span class="asterisk"></span></label>
          <input v-model="form.email" type="email" id="email" class="input">
          <div v-if="errors.has('email')" class="text-red-500 mt-1">{{ errors.first('email') }}</div>
        </div>

        <div class="mt-4">
          <label for="text" class="label">Текст <span class="asterisk"></span></label>
          <v-textarea v-model="form.text" rows="2" id="text"></v-textarea>
          <div v-if="errors.has('text')" class="text-red-500 mt-1">{{ errors.first('text') }}</div>
        </div>

        <button class="button button-success mt-6">Отправить</button>
      </form>

      <div v-else class="p-4 bg-green-300">
        {{ form.name }}, спасибо!
      </div>
    </template>
  </the-layout>
</template>

<script>
import VTextarea from "~/components/common/VTextarea";
import Errors from "~/utils/errors";

export default {
  components: {VTextarea},

  data() {
    return {
      form: {
        category: '',
        name: '',
        email: '',
        text: '',
      },

      loading: false,
      success: false,
      errors: new Errors()
    }
  },

  created() {
    if (this.$auth.loggedIn) {
      this.form.name = this.$auth.user.one_of_names;
      this.form.email = this.$auth.user.email;
    }
  },

  computed: {
    categories() {
      return {
        bug: 'Ошибка',
        offer: 'Предложение',
        advertising: 'Реклама',
      }
    }
  },

  methods: {
    onSubmit() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      this.$axios.$post('/api/feedback', this.form)
          .then(response => {
            this.success = response.status === true || response.status === 1
          })
          .catch(error => this.errors.record(error))
          .finally(() => this.loading = false)
    }
  }
}
</script>
