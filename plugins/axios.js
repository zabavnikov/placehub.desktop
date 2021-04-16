export default ({ app, $axios, error }) => {
  $axios.onError(({ response }) => {
    if (response && response.hasOwnProperty('status')) {
      const code = parseInt(response.status);

      if (app.hasOwnProperty('$toast') && code === 403 || code === 422) {
        app.$toast.error(response.data.message);
      }
    }
  });

  $axios.onResponse(({ data }) => {
    if (data.hasOwnProperty('errors')) {
      data.errors.forEach(graphqlError => {
        if (graphqlError.extensions.category === 'NOT_FOUND') error(404);
        if (graphqlError.extensions.category === 'FORBIDDEN') error(403);
      });
    }
  })
}
