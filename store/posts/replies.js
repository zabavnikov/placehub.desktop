const state = () => ({
  postId:   null,
  parentId: null,

  selected: {},
  list: [],
  mode: null
});

const mutations = {
  SET_POST_ID(state, postId) {
    state.postId = postId;
  },
  SET_PARENT_ID(state, parentId) {
    state.parentId = parentId;
  },

  MODE_EDIT(state, selected) {
    state.mode = 'edit';
    state.selected = selected;
  },

  MODE_REPLY(state, selected) {
    state.mode = 'reply';
    state.selected = selected;
  },

  RESET_FORM(state) {
    state.mode = null;
    state.selected = {};
  },

  ADD(state, replies) {
    if (Array.isArray(replies)) {
      replies.forEach(reply => state.list.push(reply));
    } else {
      state.list.unshift(replies);
    }
  },
};

export default {
  state,
  mutations
}
