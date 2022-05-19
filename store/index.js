import set from 'lodash/set';
import { gql } from 'nuxt-graphql-request';

export default {
  actions: {
    async nuxtServerInit({ state, commit }, { app }) {
      //const {visitTypes, complaintCategories} = await app.$axios.$get('/api/initial-state');
      //commit('places/setVisitTypes', visitTypes);
      //commit('complaints/setCategories', complaintCategories);

      const query = gql`
        query {
          comments(modelType: "posts", limit: 5) {
            id
            text
            model_id
            user_id
            created_at(relative: true)
            user {
              id
              name
              avatar
            }
          }
        }
      `;

      const { comments } = await app.$graphql.default.request(query);

      if (comments.length) {
        commit('comments/SET_LATEST', comments);
      }
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
