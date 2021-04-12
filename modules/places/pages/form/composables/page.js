import VMap from "~/modules/places/components/VMap";
import PlaceSearch from "../../../components/PlaceSearch/PlaceSearch";
import VOverlay from "~/components/common/VOverlay/VOverlay";

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
    VOverlay,
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
      const {place, categories} = await $axios.$post(`/api/places/form/${params.placeType}/${params.placeId ? params.placeId : ''}`);

      if (! isEdit) {
        localityRegionState.type = params.placeType;
      }

      return {
        isEdit,
        categories,
        place: place || {...localityRegionState},
      }
    } catch ({ response }) {
      error({statusCode: response.status, message: response.statusText });
    }
  },

  computed: {
    parentLabel() {
      let result = 'К какой <b class="text-red-500">стране</b> превяжим регион?';

      if (this.place.type === 'localities') {
        result = 'К какому <b class="text-red-500">региону</b> превяжим населенный пункт?'
      }

      if (this.place.type === 'poi') {
        result = 'К какому <b class="text-red-500">населенному пункту</b> или <b class="text-red-500">региону</b> превяжим место?'
      }

      return result;
    },

    only() {
      let only = ['countries'];

      if (this.place.type === 'localities') {
        only = ['regions'];
      }

      if (this.place.type === 'poi') {
        only = ['regions', 'localities'];
      }

      return only;
    },

    suffix() {
      let suffix = 'региона';

      if (this.place.type === 'localities') {
        suffix = 'населенного пункта'
      }

      if (this.place.type === 'poi') {
        suffix = 'места'
      }

      return suffix;
    },

    inputName() {
      return `Название ${this.suffix}`;
    },

    heading() {
      if (! this.place.type) {
        return 'Выберите тип геообъекта';
      }

      return this.isEdit ? `Редактирование ${this.suffix}` : `Добавление ${this.suffix}`;
    }
  },

  methods: {
    onSubmit() {
      const options = {
        method: this.isEdit ? 'put' : 'post',
        url: `/api/places${this.isEdit ? `/${this.place.id}` : ''}`,
        data: this.place,
      };

      this.$axios(options)
        .then(({data}) => {
          this.$router.push({name: 'places.show', params: {placeType: data.type, placeId: data.id}});
        })
        .catch(error => this.confirmDialog = false);
    },
    onDragEnd(event) {
      this.place.lat = event[0]; this.place.lng = event[1];
    },
    onSuggestion(event) {
      console.log(event)
    }
  },
}
