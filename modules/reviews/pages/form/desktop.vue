<template>
  <the-layout :heading="isEdit ? 'Редактирование отзыва' : 'Новый отзыв'" :subheading="place.full_name">
    <template #sidebar>
      <div>123</div>
    </template>

    <template #content>
      <div class="p-4 bg-white rounded shadow-sm">
        <label class="label">Ваша оценка <span class="asterisk"></span></label>
        <v-rating-stars v-model="form.rating" @input="errors.clear('rating')" editable></v-rating-stars>
        <div v-show="errors.has('rating')" class="mt-2 text-red-500">{{ errors.first('rating') }}</div>

        <div class="mt-4">
          <label class="label">Сезон <span class="asterisk"></span></label>
          <v-season-selector v-model="form.season" @input="errors.clear('season')"></v-season-selector>
          <div v-show="errors.has('season')" class="mt-2 text-red-500">{{ errors.first('season') }}</div>
        </div>

        <div class="mt-4">
          <label for="visit-type" class="label">С кем были? <span class="asterisk"></span></label>
          <select v-model="form.visit_type_id" @input="errors.clear('visit_type_id')" class="input" id="visit-type">
            <option v-for="visitType in visitTypes" :key="visitType.id" :value="visitType.id">{{ visitType.name }}</option>
          </select>
          <div v-show="errors.has('visit_type_id')" class="mt-2 text-red-500">{{ errors.first('visit_type_id') }}</div>
        </div>

        <div class="mt-4">
          <label for="pluses" class="label">Достоинства:</label>
          <v-textarea rows="2" v-model="form.pluses" id="pluses" placeholder="Что вам понравилось"></v-textarea>
          <div v-show="errors.has('pluses')" class="mt-2 text-red-500">{{ errors.first('pluses') }}</div>
        </div>

        <div class="mt-4">
          <label for="minuses" class="label">Недостатки:</label>
          <v-textarea rows="2" v-model="form.minuses" id="minuses" placeholder="Что не оправдало ваших ожиданий"></v-textarea>
          <div v-show="errors.has('minuses')" class="mt-2 text-red-500">{{ errors.first('minuses') }}</div>
        </div>

        <div class="mt-4">
          <label for="text" class="label">Комментарий:</label>
          <v-textarea rows="2" v-model="form.text" id="text" placeholder="Другие впечатления"></v-textarea>
          <div v-show="errors.has('text')" class="mt-2 text-red-500">{{ errors.first('text') }}</div>
        </div>

        <div class="mt-4">
          <label for="text" class="label">Изображения:</label>
          <VAttachments v-model="form.images"/>
          <VUpload v-model="form.images" show-progress to="reviews"/>
        </div>

        <div class="flex items-center space-x-4 mt-4">
          <button type="button" class="button button-success" @click="onSubmit">Создать отзыв</button>
          <label for="is-draft">
            <input v-model="form.is_draft" id="is-draft" type="checkbox">
            Сохранить в черновик
          </label>
        </div>
      </div>
    </template>
  </the-layout>
</template>

<script>
import VSeasonSelector from '~/components/common/VSeasonSelector';
import VRatingStars from '~/components/common/VRatingStars';
import VTextarea from '~/components/common/VTextarea/VTextarea';
import VAttachments from '~/components/common/VAttachments';
import VUpload from '~/components/common/VUpload';
import Errors from '~/utils/errors'
import cloneDeep from 'lodash/cloneDeep';

const formInitialState = {
  visit_type_id: null,
  rating: 0,
  season: null,
  pluses: '',
  minuses: '',
  comment: '',
  images: [],
  is_draft: false,
};

export default {
  components: { VUpload, VSeasonSelector, VRatingStars, VTextarea, VAttachments },

  data() {
    return {
      form: {...cloneDeep(formInitialState), place_id: this.$route.params.placeId},
      errors: new Errors
    }
  },

  asyncData({ $axios, params, error }) {
    const isEdit = params.reviewId > 0;

    let url = '/api/reviews/form/' + params.placeId;

    if (isEdit) {
      url += '/' + params.reviewId;
    }

    return $axios
        .$get(url)
        .then(({ place, review }) => {
          return { place, form: review || cloneDeep(formInitialState), isEdit }
        })
  },

  computed: {
    visitTypes() {
      return this.$store.state.places.visitTypes;
    }
  },

  methods: {
    onSubmit() {
      if (! this.isEdit) {
        this.form.place_id = this.$route.params.placeId;
      }

      const options = {
        url: '/api/reviews' + (this.isEdit ? `/${this.form.id}` : ''),
        data: this.form,
        method: this.isEdit ? 'put' : 'post',
      };

      this.$axios(options)
          .then(({ data }) => {
            if (data.id) {
              this.$router.push(`/reviews/${data.id}`)
            }
          })
          .catch(error => this.errors.record(error));
    }
  }
}
</script>
