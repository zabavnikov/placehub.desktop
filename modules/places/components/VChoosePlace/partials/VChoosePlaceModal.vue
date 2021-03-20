<template>
  <v-overlay @close="$eventBus.$emit('modal', ['places', 'choose'])">
    <div class="choose-place rounded overflow-hidden">
      <div class="choose-place-map">
        <place-search
          :value="payload.name"
          class="absolute p-4 z-10"
          style="width: 640px;"
          @select="$emit('select', $event)"
        >
        </place-search>
        <v-map
          :lat-lng="payload.latLng"
          :zoom="zoom"
          @dragend="$emit('dragend', $event)"
        >
        </v-map>
      </div>
      <div class="choose-place-panel p-4">
        <div class="text-lg mb-4 font-bold">
          Не нашли подходящего места?
          <a href="/places/create" target="_blank" class="underline">Добавьте его сами.</a>
          <div class="mt-2">После добавления места, <b>повторите поиск</b>.</div>
        </div>

        <!--<div v-if="isPlaceSelected" class="mb-4 p-2 rounded bg-blue-200">
          Уточнить местоположение можно перетаскиванием маркера на карте.
        </div>
        <div v-if="isCustomLatLng" class="mb-4 cursor-pointer underline" @click="$emit('reset')">
          Нажмите, чтобы сбросить координаты выбранные в ручную.
        </div>-->
        <button type="button" @click="$eventBus.$emit('modal', ['places', 'choose'])" class="button button-success w-full">Готово</button>
      </div>
    </div>
  </v-overlay>
</template>

<script>
  import VOverlay from '~/components/common/VOverlay';
  import VMap from "../../VMap";
  import PlaceSearch from "../../PlaceSearch/PlaceSearch";
  import { zoom } from '~/modules/places/config';

  export default {
    components: { PlaceSearch, VOverlay, VMap },

    props: {
      isCustomLatLng: {
        type: Boolean,
        default: false,
      }
    },

    computed: {
      payload() {
        return this.$eventBus.modals.places.choose.data;
      },
      isPlaceSelected() {
        return this.payload.hasOwnProperty('name')
      },
      zoom() {
        if (Object.hasOwnProperty.call(zoom, this.payload.type)) {
          return zoom[this.payload.type]
        }

        return 2;
      }
    },
  }
</script>

<style lang="scss">
  .choose-place {
    display: flex;
    background-color: #fff;
  }

  .choose-place-map {
    width: 640px;
    height: 640px;
  }

  .choose-place-panel {
    width: 320px;
  }
</style>
