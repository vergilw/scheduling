import roomApi from '../../api/room.js';
import Vue from 'vue';


const state = {
  roomID: null,
  formLoading: false,
  title: null,
  capacity: null,
}

const getters = {}

const actions = {
  putRoom({ state, commit, rootState }) {
    let params = {};
    params["name"] = state.title;
    params["max_members"] = state.capacity;

    var store = this;
    roomApi.putRoom({ place: params }, response => {
      commit("updateFormLoading", false);
      store.dispatch("global/getRooms");
    }, error => {
      commit("updateFormLoading", false);
    });
  },

  getRoomByID({ state, commit, rootState }) {
    var store = this;

    commit("updateFormLoading", true);
    roomApi.getRoomByID(state.roomID, response => {
      commit("updateFormloading", false);

      var params = {
        title: response["data"]["places"]['name'],
        capacity: response["data"]["places"]["max_members"]
      };

      commit('assign', params);
    }, error => {
      console.log(error);
    });
  },

  patchRoomByID({ state, commit, rootState }) {
    let params = {};
    params["name"] = state.title;
    params["max_members"] = state.capacity;

    var store = this;
    roomApi.patchRoomByID(state.roomID, { place: params }, response => {
      commit("updateFormLoading", false);
      store.dispatch("global/getRooms");
    }, error => {
      commit("updateFormLoading", false);
    });
  },

  deleteRoomByID({ state, rootState }, roomID) {
    var store = this;

    roomApi.deleteRoomByID(roomID, response => {
      store.dispatch("global/getRooms");
    }, error => {
      console.log(error);
    });
  },

};

const mutations = {
  reset(state) {
    state.roomID = null;
    state.title = null;
    state.capacity = null;
  },
  assign(state, model) {
    state.roomID = model.id;
    state.title = model.name;
    state.capacity = model.max_members;
  },
  updateRoomID(state, int) {
    state.roomID = int;
  },
  updateFormLoading(state, boolean) {
    state.formLoading = boolean;
  },
  updateTitle(state, string) {
    state.title = string;
  },
  updateCapacity(state, int) {
    state.capacity = int;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
