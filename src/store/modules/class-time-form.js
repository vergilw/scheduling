import scheduleApi from '../../api/schedule.js';

const state = {
    positionIndex: null,
    weekdayIndex: null,
    timeItemIndex: null
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
        state.weekdayIndex = null;
        state.timeItemIndex = null;
    },
    assign(state, {positionIndex, weekdayIndex, timeItemIndex}) {
        state.positionIndex = positionIndex;
        state.weekdayIndex = weekdayIndex;
        state.timeItemIndex = timeItemIndex;
    },
    updateWeekdayIndex(state, int) {
        state.weekdayIndex = int;
    },
    updateTimeItemIndex(state, int) {
        state.timeItemIndex = int;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}