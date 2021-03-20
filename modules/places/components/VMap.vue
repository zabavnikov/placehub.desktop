<template>
  <div class="relative w-full h-full">
    <client-only>
      <l-map
          ref="map"
          :zoom="zoom"
          :center="latLng"
          :options="options"
          no-blocking-animations
          @click="onClick"
          @zoom="$emit('zoom', $event.target.getZoom())"
          class="z-0"
      >
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
        <l-marker :lat-lng="latLng" :draggable="draggable" @moveend="onDragEnd"></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
let LMap = null, LTileLayer = null, LMarker = null;

if (process.client) {
  const Leaflet = {LMap, LTileLayer, LMarker} = require('vue2-leaflet');
  const {Icon} = require('leaflet');

  delete Icon.Default.prototype._getIconUrl;

  Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  LMap = Leaflet.LMap;
  LTileLayer = Leaflet.LTileLayer;
  LMarker = Leaflet.LMarker;
}

export default {
  name: 'VMap',
  props: {
    latLng: {
      type: Array,
      default() {
        return [0, 0]
      }
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    zoom: {
      type: Number,
      default: 2,
    }
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  computed: {
    options() {
      return {
        zoomControl: false,
      }
    },
  },

  watch: {
    latLng(newValue) {
      this.$nextTick().then(() => this.$refs.map.setCenter(newValue))
    },
    zoom(newValue) {
      this.$refs.map.setZoom(newValue)
    },
  },

  methods: {
    onDragEnd(event) {
      const {lat, lng} = event.target.getLatLng();

      this.$emit('dragend', [
        lat.toFixed(6),
        lng.toFixed(6)
      ]);
    },

    onClick(event) {
      if (!this.clickable) return;

      const {lat, lng} = event.latlng;

      this.$emit('dragend', [
        lat.toFixed(6),
        lng.toFixed(6)
      ]);
    },
  }
}
</script>

<style src="leaflet/dist/leaflet.css"></style>
