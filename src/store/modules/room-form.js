import scheduleApi from '../../api/schedule.js';

const state = {
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
