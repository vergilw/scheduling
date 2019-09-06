import scheduleApi from '../../api/schedule.js';

const state = {
    positionIndex: null,
    periodItems: [],
    roomIndex: null,
    crowdIndex: null,
    teacherIndex: null
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
    reset(state) {
        state.positionIndex = null;
        state.periodItems = null;
        state.roomIndex = null;
        state.crowdIndex = null;
        state.teacherIndex = null;
    },
    assign(state, {positionIndex, roomIndex, crowdIndex, teacherIndex}) {
        state.positionIndex = positionIndex;
        // state.periodItems = null;
        state.roomIndex = roomIndex;
        state.crowdIndex = crowdIndex;
        state.teacherIndex = teacherIndex;
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}