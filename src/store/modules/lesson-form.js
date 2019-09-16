import Vue from 'vue';

const state = {
  positionIndex: null,
  title: null,
  formLoading: false,
  fileTitle: null,
  mediaTitle: null,
  fileSignId: null,
  mediaSignId: null,
}

const getters = {

}

const actions = {

}

const mutations = {
  reset(state) {
    state.positionIndex = null;
    state.title = null;
    state.fileTitle = null;
    state.mediaTitle = null;
    state.fileSignId = null;
    state.mediaSignId = null;
  },
  assign(state, {positionIndex, title, fileTitle, mediaTitle}) {
    state.positionIndex = positionIndex;
    state.title = title;
    state.fileTitle = fileTitle;
    state.mediaTitle = mediaTitle;
  },
  updateTitle(state,string) {
    state.title = string;
  },
  updateFormLoading(state,boolean) {
    state.formLoading = boolean;
  },
  updateFileTitle(state,string) {
    state.fileTitle = string;
  },
  updateMediaTitle(state,string) {
    state.mediaTitle = string;
  },
  updateFileSignId(state,string) {
    state.fileSignId = string;
  },
  updateMediaSignId(state,string) {
    state.mediaSignId = string;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
