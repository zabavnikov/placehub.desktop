<template>
  <div>
    <form @submit.prevent="onSubmit">
      <button class="button button-success">Отправить новое письмо</button>
    </form>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',

    methods: {
      onSubmit() {
        this.$axios
          .$post('/api/users/verification/resend');
      }
    }
  }
</script>
