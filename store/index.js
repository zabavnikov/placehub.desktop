import set from 'lodash/set';

export default {
  actions: {
    async nuxtServerInit({state, commit}, {app}) {
      const {visitTypes, complaintCategories} = await app.$axios.$get('/api/initial-state');
      commit('places/setVisitTypes', visitTypes);
      commit('complaints/setCategories', complaintCategories);
    }
  },
  mutations: {
    /**
     * Обновить данные авторизованного пользователя.
     *
     * @param {*} state
     * @param {*} payload
     */
    UPDATE_USER(state, payload) {
      for (let property in payload) {
        if (payload.hasOwnProperty(property)) {
          set(state.auth.user, property, payload[property]);
        }
      }
    }
  },
}
