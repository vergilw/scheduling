import scheduleApi from '../../api/schedule.js';
var dateFormat = require("dateformat");

const state = {
    weekStart: null,
    scheduleModels: null,
    scheduleLoading: false,
    courseIndex: null,
    crowdIndex: null,
    teacherIndex: null,
    roomIndex: null
}

const getters = {}

const actions = {
    getSchedule({ state, commit, rootState }) {
        var rangeStart = dateFormat(state.weekStart, 'yyyy-mm-dd');
        var weekEnd = new Date(
            state.weekStart.getTime() + 3600 * 24 * 1000 * 7
        );
        var rangeEnd = dateFormat(weekEnd, 'yyyy-mm-dd');
        var params = { 'start_on': rangeStart, 'finish_on': rangeEnd };

        commit('scheduleLoadingUpdated', true);
        scheduleApi.getSchedule(params, response => {
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
    updateCourseIndex(state, int) {
        state.courseIndex = int;
    },
    updateCrowdIndex(state, int) {
        state.crowdIndex = int;
    },
    updateTeacherIndex(state, int) {
        state.teacherIndex = int;
    },
    updateRoomIndex(state, int) {
        state.roomIndex = int;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
