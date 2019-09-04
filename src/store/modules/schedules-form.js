import scheduleApi from '../../api/schedule.js';

const state = {
    formLoading: false,
    courseIndex: null,
    capacity: null,
    startDate: null,
    endDate: null
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
    updateCourseIndex(state, int) {
        state.courseIndex = int;
    },
    updateCapacity(state, int) {
        state.capacity = int;
    },
    updateStartDate(state, date) {
        state.startDate = date;
    },
    updateEndDate(state, date) {
        state.endDate = date;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}