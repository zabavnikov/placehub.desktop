export default ({ app, $axios, error }) => {
  $axios.onError(({ response }) => {
    if (response && response.hasOwnProperty('status')) {
      const code = parseInt(response.status);

      if (app.hasOwnProperty('$toast') && code === 403 || code === 422) {
        app.$toast.error(response.data.message);
      }
    }
  });
}
