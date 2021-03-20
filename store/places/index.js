const state = () => ({
  visitTypes: [],
});

const mutations = {
  setVisitTypes(state, visitTypes) {
    state.visitTypes = visitTypes;
  },
};

export default {
  state,
  mutations,
}
