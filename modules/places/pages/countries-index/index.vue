<template>
  <the-layout>
    <ul slot="content" class="grid grid-cols-3 gap-4">
      <li v-for="(countries, letter) in alphabet" :key="letter">
        <h3 class="font-bold text-lg">{{ letter }}</h3>
        <ul class="mb-4">
          <li v-for="country in countries" :key="country.id">
            <n-link :to="{name: 'countries.show', params: {countryId: country.id}}" class="hover:underline">{{ country.name }}</n-link>
          </li>
        </ul>
      </li>
    </ul>
  </the-layout>
</template>

<script>
import alphabet from '~/utils/alphabet';

export default {
  asyncData({ $axios }) {
    return $axios.$get('/api/places/countries')
        .then(countries => {
          return {
            alphabet: alphabet(countries)
          }
        });
  }
}
</script>
