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

    <div>
      <label for="name" class="label">Что хотите добавить? <span class="asterisk"></span></label>
      <ul class="flex space-x-2">
        <li
            v-for="(tab, key) in tabs"
            :class="{[key === form.type ? 'bg-gray-400' : 'bg-gray-200']: true}"
            class="flex-auto mr-1 mb-1 py-1 px-3 rounded-full cursor-pointer hover:bg-gray-400 text-center cursor-pointer"
            :key="key"
            @click="onSelectType(key)">
          {{ tab }}
        </li>
      </ul>

      <div v-if="form.type !== null" class="mt-4">
        <div v-if="isWarning" class="alert alert--warning">
          К сожалению, в выбранной вами стране, нет ни одного региона. Вы может добавить регион самостоятельно, а затем вернуться
          к добавлению {{ isLocality ? 'населенного пункта' : 'места' }}.
        </div>
        <form v-else @submit.prevent="onSubmit">

          <label class="label asterisk">{{ text.searchLabel[form.type] }}</label>
          <div class="mb-2">
            <place-search
                :only="['regions']"
                :value="form.parent_names"
                :placeholder="text.searchPlaceholder[form.type]"
                @select="form.parent_id = $event.parent_id; form.lat = $event.lat; form.lng = $event.lng"></place-search>
          </div>

          <div class="mb-4">
            <label for="name" class="label">{{ inputName }} <span class="asterisk"></span></label>
            <input type="text" class="input" id="name" v-model="form.name">
          </div>

          <component
              class="mb-4"
              v-if="isLocality || isPoi"
              v-model="form"
              :is="form.type"
              :categories="categories[form.type]">
          </component>

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
import PlaceSearch from '~/modules/places/components/PlaceSearch';
let fuse = null;
export default {
  mixins: [Page],
  components: {
    PlaceSearch,
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
    tabs() {
      return {
        regions: 'Регион',
        localities: 'Населенный пункт',
        poi: 'Место'
      }
    },
    isLocality() {
      return this.form.type === 'localities';
    },
    isPoi() {
      return this.form.type === 'poi';
    },

    text() {
      return {
        searchLabel: {
          poi: 'Название населенного пункта или региона',
          regions: 'Название страны',
          localities: 'Название региона',
        },
        searchPlaceholder: {
          poi: 'Например, Красноярск или Красноярский край',
          regions: 'Например, Россия',
          localities: 'Например, Красноярский край',
        },
      }
    },

  },
  methods: {
    onSelectType(type) {
      this.form.type = type;
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
            this.$router.push({name: 'places.show', params: {placeId: data.id}});
          })
          .finally(() => {
            this.submitStep = 0;
          })
          .catch(error => this.confirmDialog = false);
    },
  }
}
</script>
