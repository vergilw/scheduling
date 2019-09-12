import Vue from 'vue';

const state = {
  positionIndex: null,
  title: null,
  formLoading: false,
  file_title: null,
  media_title: null,
  file_sign_id: null,
  media_sign_id: null,
}

const getters = {

}

const actions = {

}

const mutations = {
  reset(state) {
    state.positionIndex = null;
    state.title = null;
    state.file_title = null;
    state.media_title = null;
    state.file_sign_id = null;
    state.media_sign_id = null;
  },
  assign() {

  },
  updateTitle(state,string) {
    state.title = string;
  },
  updateFormLoading(state,boolean) {
    state.formLoading = boolean;
  },
  updateFileTitle(state,string) {
  // .substr(string.lastIndexOf("\\") + 1)
    state.file_title = string;
  },
  updateMediaTitle(state,string) {
    state.media_title = string;
  },
  updateFileSignId(state,string) {
    state.file_sign_id = string;
  },
  updateMediaSignId(state,string) {
    state.media_sign_id = string;
  },
  // updateLessonItems(state, {index, itemData}) {
  //   if (index === null) {
  //     state.lessonItems.push(itemData);
  //   } else if (index < state.periodItems.length) {
  //     Vue.set(state.lessonItems, index, itemData);
  //   }
  // },
  // deleteLessonItems(state, index) {
  //   if (index !== null) {
  //     state.lessonItems.splice(index, 1);
  //   }
  // }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations,
}
