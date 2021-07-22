import VMap from "~/modules/places/components/VMap";
import PlaceSearch from "../../../components/PlaceSearch/PlaceSearch";

const localityRegionState = {
  parent_id: null,
  category_id: null,
  name: '',
  lat: 0,
  lng: 0,
  is_capital: false,
  type: null,
  zoom: 2,
};

export default {
  middleware: 'auth',

  components: {
    VMap,
    PlaceSearch,
  },

  data() {
    return {
      success: false,
      confirmDialog: false,
      confirmDialogOk: false,
    }
  },

  async asyncData({$axios, params, error }) {
    const isEdit = params.placeId > 0;

    try {
      const {form, categories, countries} = await $axios.$post(`/api/places/form/${params.placeType}/${params.placeId ? params.placeId : ''}`);

      if (! isEdit) {
        localityRegionState.type = params.placeType;
      }

      return {
        isEdit,
        categories,
        countries,
        form,
      }
    } catch ({ response }) {
      error({statusCode: response.status, message: response.statusText });
    }
  },

  computed: {
    only() {
      let only = ['countries'];

      if (this.form.type === 'localities') {
        only = ['regions'];
      }

      if (this.form.type === 'poi') {
        only = ['regions', 'localities'];
      }

      return only;
    },

    suffix() {
      let suffix = 'региона';

      if (this.form.type === 'localities') {
        suffix = 'населенного пункта'
      }

      if (this.form.type === 'poi') {
        suffix = 'места'
      }

      return suffix;
    },

    inputName() {
      return `Название ${this.suffix}`;
    },

    heading() {
      if (! this.form.type) {
        return 'Выберите тип геообъекта';
      }

      return this.isEdit ? `Редактирование ${this.suffix}` : `Добавление ${this.suffix}`;
    }
  },

  methods: {

    onDragEnd(event) {
      this.form.lat = event[0]; this.form.lng = event[1];
    },
    onSuggestion(event) {
      console.log(event)
    }
  },
}
