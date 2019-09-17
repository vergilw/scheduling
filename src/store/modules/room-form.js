import roomApi from '../../api/room.js';
import Vue from 'vue';


const state = {
    // roomIndex: null,
    roomID: null,
    formLoading: false,
    title: null,
    capacity: null,
    // roomItems:[],
}

const getters = {}

const actions = {
  // getSchedule({ state, commit, rootState }) {
  //     commit('scheduleLoadingUpdated', true);
  //     scheduleApi.getSchedule(response => {
  //         commit('scheduleModelsUpdated', response['data']);
  //         commit('scheduleLoadingUpdated', false);
  //     }, error => {

  //     })
  // }
  putRoom({ state, commit, rootState }) {
    let params = {};
    params["name"] = state.title;
    params["max_members"] = state.capacity;
    console.log(params["max_members"]);

    var store = this;
    roomApi.putRoom({ place: params },response => {
        console.log(
          "Room response: " + response["data"]["place"]["max_members"]
        );
        commit("updateFormLoading", false);
        store.dispatch("global/getRooms");

        Vue.notify({
            group: 'hud',
            title: '创建成功',
            duration: 2000
        });
        completeCallback();
      },
      error => {
        commit("updateFormLoading", false);
      }
    );
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

      console.log(params);
      commit('assign',params);
    }, error => {
        console.log(error);
    });
  },

  patchRoomByID({ state, commit, rootState }) {
    let params = {};
    params["name"] = state.title;
    params["max_members"] = state.capacity;
    console.log("123");

    var store = this;
    roomApi.patchRoomByID(state.roomID, { place: params }, response => {
        console.log("Room response: " + response["data"]["place"]["max_members"]);
        commit("updateFormLoading", false);
        store.dispatch("global/getRooms");

        Vue.notify({
            group: 'hud',
            title: '修改成功',
            duration: 1500
        });
        completeCallback();
      },
      error => {
        commit("updateFormLoading", false);
      }
    );
  },

  deleteRoomByID({ state, rootState }) {
    var store = this;

    roomApi.deleteScheduleByID(state.roomID, response => {
        store.dispatch("global/getRooms");
        Vue.notify({
            group: 'hud',
            title: '删除成功',
            duration: 1500
        })
      },
      error => {
        console.log(error);
      }
    );
  },

  moveRoomByID({ state, commit, rootState }, { roomID, title, capacity }) {
       var params = {};
       params['name'] = title;
       params['max_members'] = capacity;

       var store = this;
       console.log(params);
       roomApi.patchRoomByID(state.roomID, { place: params }, response => {
           store.dispatch("global/getRoom");
           Vue.notify({
               group: 'hud',
               title: '移动成功',
               duration: 1500
           });

       }, error => {
               console.log(error.response);
       });
  }
};

const mutations = {
    reset(state) {
        state.roomID = null;
        // state.roomItems = [];
        state.title = null;
        state.capacity = null;
    },
    assign( state,{ title, capacity }) {
        state.title = title;
        state.capacity = capacity;
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
    // updataRoomItem(state,{roomIndex, itemData}) {
    //     if (roomIndex === null) {
    //         state.roomItems.push(itemData);
    //     } else if (state.roomItems.length > roomIndex) {
    //         Vue.set(state.roomItems,roomIndex,itemData);
    //     }
    // },
    // deleteRoomItem(state, roomIndex) {
    //     if(roomIndex !== null) {
    //         state.roomItems.splice(roomIndex, 1);
    //     }
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
