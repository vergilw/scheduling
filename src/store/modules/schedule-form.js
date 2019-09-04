import scheduleApi from '../../api/schedule.js';

const state = {
    formLoading: false,
    courseIndex: null,
    roomIndex: null,
    crowdIndex: null,
    teacherIndex: null,
    capacity: null,
    note: null
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
    updateRoomIndex(state, int) {
        state.roomIndex = int;
    },
    updateCrowdIndex(state, int) {
        state.crowdIndex = int;
    },
    updateTeacherIndex(state, int) {
        state.teacherIndex = int;
    },
    updateCapacity(state, int) {
        state.capacity = int;
    },
    updateNote(state, string) {
        state.note = string;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}