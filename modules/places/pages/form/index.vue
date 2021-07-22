<template>
  <the-map-layout>
    <v-map
        slot="map"
        :lat-lng="[form.lat, form.lng]"
        :zoom="form.zoom"
        :name="form.parent_names"
        draggable
        clickable
        suggestion
        @zoom="form.zoom = $event"
        @select="form.parent_id = $event.id"
        @dragend="onDragEnd"
        @suggestion="onSuggestion"
    >
    </v-map>

    <!-- 1. Выбор страны. -->
    <div v-if="countrySelected === null">
      <h1 class="text-xl mb-2">Выбор страны</h1>
      <input type="search" v-model="countrySearchQuery" class="input mb-2" placeholder="Введите название страны">
      <ul v-if="countrySearchQuery.length > 0" class="flex flex-wrap">
        <li v-for="country in result"
            :key="country.item.id"
            @click="onSelectCountry(country.item)"
            :style="{opacity: `calc(1 - ${country.score})`}"
            class="mr-1 mb-1 py-1 px-3 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-400">{{ country.item.name }}</li>
      </ul>
    </div>
    <div v-else>
      <div class="mb-4 cursor-pointer" @click="countrySelected = null; form.type = null">&laquo; Назад</div>
      <h1 class="text-2xl mb-4">{{ countrySelected.name }}</h1>
      <label for="name" class="label">Что хотите добавить? <span class="asterisk"></span></label>
      <ul class="space-y-1 cursor-pointer">
        <li @click="onSelectType('regions')" :class="{'font-bold': form.type === 'regions'}">Регион</li>
        <li @click="onSelectType('localities')" :class="{'font-bold': form.type === 'localities'}">Населенный пункт</li>
        <li @click="onSelectType('poi')" :class="{'font-bold': form.type === 'poi'}">Место</li>
      </ul>

      <div v-if="form.type !== null" class="mt-4">
        <div v-if="isWarning" class="alert alert--warning">
          К сожалению, в выбранной вами стране, нет ни одного региона. Вы может добавить регион самостоятельно, а затем вернуться
          к добавлению {{ isLocality ? 'населенного пункта' : 'места' }}.
        </div>
        <form v-else @submit.prevent="onSubmit">
          <component
              class="mb-4"
              v-if="isLocality || isPoi"
              v-model="form"
              :is="form.type"
              :categories="categories[form.type]"
              :regions="countrySelected.regions">
          </component>

          <div class="mb-4">
            <label for="name" class="label">{{ inputName }} <span class="asterisk"></span></label>
            <input type="text" class="input" id="name" v-model="form.name">
          </div>

          <p v-if="submitStep > 0" class="alert alert--warning my-6">Еще раз проверьте введенные вами данные и если все указанно верно, нажмите "Подтверждаю"</p>
          <button class="button button-primary">
            {{ submitStep === 0 ? 'Добавить' : 'Подтверждаю'}}
          </button>
        </form>
      </div>
    </div>
  </the-map-layout>
</template>

<script>
import Fuse from 'fuse.js';
import Page from '~/modules/places/pages/form/composables/page';
import TheMapLayout from '../../components/TheMapLayout.vue';
import PlacesFormPoi from './partials/PlacesFormPoi';
import PlacesFormLocality from './partials/PlacesFormLocality';
let fuse = null;
export default {
  mixins: [Page],
  components: {
    TheMapLayout,
    poi: PlacesFormPoi,
    localities: PlacesFormLocality,
  },
  layout: 'only-header',
  created() {
    fuse = new Fuse(this.countries, {
      includeScore: true,
      keys: ['name']
    })
  },
  data() {
    return {
      countrySelected: null,
      countrySearchQuery: '',
      result: [],
      submitStep: 0,
    }
  },
  watch: {
    countrySearchQuery(newValue) {
      this.result = [];

      if (newValue.length > 0) {
        this.result = fuse.search(newValue);
      }
    }
  },
  computed: {
    isLocality() {
      return this.form.type === 'localities';
    },
    isPoi() {
      return this.form.type === 'poi';
    },
    isWarning() {
      return (this.isLocality || this.isPoi) && this.countrySelected.regions.length === 0;
    },
  },
  methods: {
    onSelectCountry(country) {
      this.countrySelected = country;
    },
    onSelectType(type) {
      this.form.type = type;

      if (type === 'regions') {
        this.form.parent_id = this.countrySelected.id;
      }
    },
    onSubmit() {
      if (this.submitStep <= 0) {
        this.submitStep++;
        return;
      }

      const options = {
        method: this.isEdit ? 'put' : 'post',
        url: `/api/places${this.isEdit ? `/${this.form.id}` : ''}`,
        data: this.form,
      };

      this.$axios(options)
          .then(({data}) => {
            this.$router.push({name: 'places.show', params: {placeType: data.type, placeId: data.id}});
          })
          .finally(() => {
            this.submitStep = 0;
          })
          .catch(error => this.confirmDialog = false);
    },
  }
}
</script>
