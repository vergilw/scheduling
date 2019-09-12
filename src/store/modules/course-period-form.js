import scheduleApi from '../../api/schedule.js';
import Vue from 'vue';

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
        state.periodItems = [];
        state.roomIndex = null;
        state.crowdIndex = null;
        state.teacherIndex = null;
    },
    assign(state, {positionIndex, periodItems, roomIndex, crowdIndex, teacherIndex}) {
        state.positionIndex = positionIndex;
        state.periodItems = periodItems;
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
    updatePeriodItem(state, {positionIndex, itemData}) {
        if (positionIndex === null) {
            state.periodItems.push(itemData);
        } else if (state.periodItems.length > positionIndex) {
            Vue.set(state.periodItems, positionIndex, itemData);
        }
    },
    deletePeriodItem(state, positionIndex) {
        if (positionIndex !== null) {
            state.periodItems.splice(positionIndex, 1);
        }
    },
    updateRoomItem(state, itemData) {
        Vue.set(state.roomModels,0,itemData);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
