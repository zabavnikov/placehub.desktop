<template>
  <the-layout :heading="country.name">
    <template #content>
      {{ country }}
    </template>
  </the-layout>
</template>

<script>
export default {
  asyncData({ $axios, params }) {
    return  $axios.$get('/api/places/countries/' + params.countryId).then(country => {
      return {
        country
      }
    })
  }
}
</script>
