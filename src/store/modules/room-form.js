import roomApi from '../../api/room.js';

const state = {
    positionIndex: null,
    formLoading: false,
    title: null,
    capacity: null
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
        console.log(state.title);
        var store = this;
        roomApi.putRoom({ "place": params }, response => {
            console.log("Room response: " + response['data']['place']['name']);
            commit('updateFormLoading', false);
            store.dispatch('global/getRooms');
        }, error => {
            commit('updateFormLoading', false);
        })
    }
}

const mutations = {
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateTitle(state, string) {
        state.title = string;
    },
    updateCapacity(state, int) {
        state.capacity = int;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
