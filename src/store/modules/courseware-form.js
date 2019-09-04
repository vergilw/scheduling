const state = {
  name: "123"
}

const getters = {

}

const actions = {

}

const mutations = {
  updateName(state,name) {
    state.name = name;
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
