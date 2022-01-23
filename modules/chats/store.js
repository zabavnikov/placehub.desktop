export const state = () => ({
  list: [],
  chat: {},
});

export const mutations = {
  SET_LIST(state, list) {
    state.list = list;
  },
  SET_CHAT(state, chat) {
    state.chat = chat;
  },
}
