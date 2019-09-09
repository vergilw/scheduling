const state = {
  title: null,
  formLoading: false,
  file_title: null,
  Media_title: null,
}

const getters = {

}

const actions = {

}

const mutations = {
  updateTitle(state,string) {
    state.title = string;
  },
  updateFormLoading(state,boolean) {
    state.formLoading = boolean;
  },
  updateFileTitle(state,string) {
    state.file_title = string;
  },
  updateMediaFileTitle(state,string) {
    state.Media_title = string;
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
