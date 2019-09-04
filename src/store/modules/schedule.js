import scheduleApi from '../../api/schedule.js';

const state = {
    weekStart: null,
    scheduleModels: null,
    scheduleLoading: false,
}

const getters = {}

const actions = {
    getSchedule({ state, commit, rootState }) {
        commit('scheduleLoadingUpdated', true);
        scheduleApi.getSchedule(response => {
            commit('scheduleModelsUpdated', response['data']);
            commit('scheduleLoadingUpdated', false);
        }, error => {

        })
    }
}

const mutations = {
    scheduleLoadingUpdated(state, boolean) {
        state.scheduleLoading = boolean;
    },
    scheduleModelsUpdated(state, models) {
        state.scheduleModels = models;
    },
    weekStartUpdated(state, weekStart) {
        state.weekStart = new Date(weekStart.getTime());
    },
    dateRangeBack(state) {
        state.weekStart = new Date(state.weekStart.getTime() - 3600 * 24 * 1000 * 7);
    },
    dateRangeFront(state) {
        state.weekStart = new Date(state.weekStart.getTime() + 3600 * 24 * 1000 * 7);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
