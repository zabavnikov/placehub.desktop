const state = () => ({
  categories: {},
});

const mutations = {
  setCategories(state, reasons) {
    state.categories = reasons;
  },
};

export default {
  state,
  mutations,
}
