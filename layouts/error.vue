<template>
  <div class="nuxt-error">
    <div class="p-4 rounded bg-red-200">
      <h1 v-if="statusCode === 404">Страница не найдена</h1>
      <h1 v-if="statusCode === 403">Нет доступа</h1>
      <h1 v-if="statusCode === 503">Ведуться технические работы</h1>
    </div>

    <div class="mt-4" v-if="statusCode === 404 || statusCode === 403"><n-link to="/">Вернуться на главную</n-link></div>
  </div>
</template>

<style lang="scss">
  .nuxt-error {
    max-width: 640px;
    margin: auto;
  }
</style>

<script>
  export default {
    name: 'NuxtError',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    computed: {
      statusCode () {
        return (this.error && this.error.statusCode) || 500
      },
      message () {
        return this.error.message;
      }
    },
    head () {
      return {
        title: this.message,
        meta: [
          {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
          }
        ]
      }
    }
  }
</script>
