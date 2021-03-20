export default {
  asyncData({ $axios, params }) {
    return $axios.$get('/api/reviews/' + params.reviewId)
      .then(({review, comments}) => {
        return { review, comments }
      })
  }
}
