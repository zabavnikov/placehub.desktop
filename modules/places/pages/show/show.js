import VImagesBrowser from "~/modules/places/components/VImagesBrowser/Index";

export default {
  components: {VImagesBrowser},

  head() {
    return {
      title: this.place.full_name
    }
  },

  asyncData({ $axios, params }) {
    return $axios.$get('/api/places/' + params.placeId).then(({ place, reviews, images }) => {
      return {
        place,
        reviews,
        images,
      }
    })
  }
}
