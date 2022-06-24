import set from 'lodash/set';

const state = () => ({
  // ID редактируемого поста.
  editableId: 0,
  replies: [],
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
  },
  ADD_REPLIES(state, replies) {
    replies.forEach(reply => state.replies.push(reply));
  },
  ADD_REPLY(state, reply) {
    state.replies.unshift(reply);
  }
};

export default {
  state,
  mutations
}
