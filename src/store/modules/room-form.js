import roomApi from '../../api/room.js';

const state = {
    roomIndex: null,
    formLoading: false,
    title: null,
    capacity: null,
    roomItems:[],
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
        params['name'] = state.title;
        params['max_members'] = state.capacity;
        console.log(params["max_members"]);

        var store = this;
        roomApi.putRoom({ "place": params }, response => {
            console.log("Room response: " + response['data']['place']['max_members'] );
            commit('updateFormLoading', false);
            store.dispatch('global/getRooms');
        }, error => {
            commit('updateFormLoading', false);
        })
    }
}

const mutations = {
    reset(state) {
        state.roomIndex = null;
        state.roomItems = [];
        state.title = null;
        state.capacity = null;
    },
    assign(state,{roomIndex, roomItems, title, capacity}){
        state.roomIndex = roomIndex;
        state.roomItems = roomItems;
        state.title = title;
        state.capacity = capacity;
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
    updataRoomItem(state,{roomIndex, itemData}) {
        if (roomIndex === null) {
            state.roomItems.push(itemData);
        } else if (state.roomItems.length > roomIndex) {
            Vue.set(state.roomItems,roomIndex,itemData);
        }
    },
    deleteRoomItem(state, roomIndex) {
        if(roomIndex !== null) {
            state.roomItems.splice(roomIndex, 1);
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
