import VOverlay from '~/components/ui/VOverlay';
import VMap from '~/modules/places/components/VMap';
import VSearchPlace from '~/modules/places/components/VSearchPlace';

export default {
  components: {VOverlay, VMap, VSearchPlace},

  props: {
    value: Object
  },

  computed: {
    fields() {
      if (! this.value) {
        return {
          name: '',
          lat:  '',
          lng:  '',
          zoom: 2
        }
      }

      return this.value;
    }
  }
}