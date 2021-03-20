<template>
  <div class="v-choose-place" :style="{maxWidth}">
    <div v-if="isSelected" class="cursor-pointer">
      <div class="flex items-center underline">
        <div title="Изменить место" class="mr-1 truncate" @click="onClick">{{ value.name }}</div>
        <v-icon style="flex-shrink: 0" title="Удалить" name="x" width="16px" height="16px" @click="onReset"></v-icon>
      </div>
      <div class="help truncate">{{ value.parent_names }}</div>
    </div>
    <div v-else @click="onClick" class="cursor-pointer">
      <div class="flex items-center underline">
        <div class="mr-1 truncate">Нажмите для выбора места</div>
      </div>
      <div class="help truncate">Место не выбрано</div>
    </div>

    <!--
      @reset="onChangeLatLng([value.lat, value.lng])" - сбрасывает кастомные широту и долготу.
      возвращается к координатам места.
    -->
    <v-choose-place-modal
      v-if="modal.show === true"
      :is-custom-lat-lng="isCustomLatLng"
      @select="onSelect"
      @dragend="onChangeLatLng"
      @reset="onChangeLatLng([0, 0])"
    >
    </v-choose-place-modal>
  </div>
</template>

<script>
  import VChoosePlaceModal from "./partials/VChoosePlaceModal";

  const placeInitialState = {name: '', full_name: '', lat: 0, lng: 0, type: ''};

  export default {
    props: {
      value: {
        type: Object,
        default() {
          return {...placeInitialState};
        }
      },

      customLatLng: {
        type: Array,
        default() {
          return [0, 0]
        }
      },

      maxWidth: {
        type: String,
        default: 'none'
      }
    },

    components: { VChoosePlaceModal },

    computed: {
      isSelected() {
        return Object.hasOwnProperty.call(this.value, 'id') && this.value.id > 0;
      },

      isCustomLatLng() {
        return this.customLatLng[0] !== 0 && this.customLatLng[1] !== 0;
      },

      modal() {
        return this.$eventBus.modals.places.choose;
      },
    },

    methods: {
      onSelect(place) {
        this.modal.data.latLng = [place.lat,place.lng];
        this.$emit('reset');
        this.$emit('input', place);
      },

      onClick() {
        const data = {
          name: this.value.full_name,
          type: this.value.type,
          latLng: this.isCustomLatLng ? this.customLatLng : [this.value.lat, this.value.lng],
        };

        this.$eventBus.$emit('modal', ['places', 'choose', data]);
      },

      onReset() {
        this.$emit('input', placeInitialState);
        this.$emit('reset');
        this.modal.data.latLng = [0,0];
      },

      onChangeLatLng(latLng) {
        this.$emit('change:latLng', latLng);

        if (latLng.toString() === '0,0') {
          // onChangeLatLng был вызван в для события @reset.
          this.modal.data.latLng = [this.value.lat, this.value.lng];
        } else {
          // onChangeLatLng был вызван в для события @dragend.
          this.modal.data.latLng = latLng;
        }
      },
    }
  }
</script>
