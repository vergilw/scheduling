const state = {
  title: null,
  formLoading:false,
  file_title:null,
  meida_title:null,
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
  updateFormFileTitle(state,string) {
    state.file_title = string;
  },
  updateFormMediaFileTitle(state,string) {
    state.nedia_title=string;
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
