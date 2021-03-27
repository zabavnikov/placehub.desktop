import cloneDeep from 'lodash/cloneDeep';

const initialState = {
  list: [],
  mode: null,
  selectedComment: {}
}

const state = () => (cloneDeep(initialState));

const mutations = {
  SET(state, comments) {
    state.list = comments;
  },

  MODE_EDIT(state, selectedComment) {
    state.mode = 'edit';
    state.selectedComment = selectedComment;
  },

  MODE_REPLY(state, selectedComment) {
    state.mode = 'reply';
    state.selectedComment = selectedComment;
  },

  MODE_RESET(state) {
    state.mode = null;
    state.selectedComment = {};
  },

  ADD_COMMENT(state, newComment) {
    const list = state.list;

    if (newComment.branch_id > 0) {
      list.forEach(comment => {
        if (comment.id === newComment.branch_id) {
          if (! comment.hasOwnProperty('branch')) {
            comment.branch = [];
          }
          comment.branch.unshift(newComment);
        }
      })
    } else {
      list.unshift(newComment);
    }
  },

  /**
   * @param state
   * @param newComment
   * @constructor
   */
  UPDATE_COMMENT(state, newComment) {
    const list = state.list;

    list.forEach(comment => {
      if (newComment.branch_id > 0 && newComment.branch_id === comment.id) {
        comment.branch.forEach(reply => {
          if (reply.id === newComment.id) {
            Object.assign(reply, newComment);
          }
        })
      } else if (newComment.id === comment.id) {
        Object.assign(comment, newComment);
      }
    });
  }
}

export default {
  state,
  mutations
}
