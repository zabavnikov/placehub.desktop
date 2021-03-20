<template>
  <div class="p-4 bg-white rounded shadow-sm">
    <div class="mb-4">
      <label>Сезон:</label>
      <v-season-selector v-model="form.season"></v-season-selector>
    </div>

    <div class="mb-4">
      <label>Оценка:</label>
      <v-rating-stars v-model="form.rating" editable></v-rating-stars>
    </div>

    <div>
      <label for="visit-type">С кем были?</label>
      <select v-model="form.visit_type_id" id="visit-type" class="input">
        <option v-for="visitType in visitTypes" :key="visitType.id" :value="visitType.id">{{ visitType.name }}</option>
      </select>
    </div>

    <div class="mt-4">
      <label for="pluses">Достоинства:</label>
      <v-textarea v-model="form.pluses" id="pluses" placeholder="Что вам понравилось"></v-textarea>
    </div>

    <div class="mt-4">
      <label for="minuses">Недостатки:</label>
      <v-textarea v-model="form.minuses" id="minuses" placeholder="Что не оправдало ваших ожиданий"></v-textarea>
    </div>

    <div class="mt-4">
      <label for="text">Комментарий:</label>
      <v-textarea v-model="form.text" id="text" placeholder="Другие впечатления"></v-textarea>
    </div>

    <div class="mt-4">
      <button type="button" class="button" @click="onSubmit">Отправить</button>
    </div>
  </div>
</template>

<script>
  import VSeasonSelector from '~/components/common/VSeasonSelector';
  import VRatingStars from '~/components/common/VRatingStars';
  import VTextarea from '~/components/common/VTextarea';

  const formInitialState = {
    visit_type_id: null,
    rating: 0,
    season: 'summer',
    pluses: '',
    minuses: '',
    comment: '',
  };

  export default {
    props: {
      placeId: {
        type: Number,
        required: true,
      },

      review: {
        type: Object,
        default() {
          return {...formInitialState}
        }
      },

      isEdit: {
        type: Boolean,
        default: false,
      }
    },

    components: { VSeasonSelector, VRatingStars, VTextarea },

    data() {
      return {
        form: { ...this.review, place_id: this.placeId},
        plusMinusText: ''
      }
    },

    computed: {
      visitTypes() {
        return this.$store.state.places.visitTypes;
      },
    },

    methods: {
      onSubmit() {
        const options = {
          url: '/api/reviews' + (this.isEdit ? `/${this.review.id}` : ''),
          data: this.form,
          method: this.isEdit ? 'put' : 'post',
        };

        this.$axios(options)
          .then(() => this.$emit('updated', this.form));
      }
    }
  }
</script>
