import set from 'lodash/set';

const state = () => ({
  // ID редактируемого поста.
  editableId: 0
});

const mutations = {
  UPDATE(state, payload) {
    for (let property in payload) {
      if (payload.hasOwnProperty(property)) {
        set(state.auth.user, property, payload[property]);
      }
    }
  },
  EDIT(state, postId) {
    state.editableId = postId;
  }
};

export default {
  state,
  mutations
}
