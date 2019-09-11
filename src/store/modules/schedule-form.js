import scheduleApi from '../../api/schedule.js';
import Vue from 'vue';
var dateFormat = require("dateformat");

const state = {
    formLoading: false,
    date: null,
    timeItemID: null,
    courseIndex: null,
    roomIndex: null,
    crowdIndex: null,
    transferStudentItems: [],
    teacherIndex: null,
    note: null
}

const getters = {}

const actions = {
    putSchedule({ state, commit, rootState }) {

        var paramItem = {};
        var key = dateFormat(state.date, 'yyyy-mm-dd');
        paramItem['repeat_days'] = {};
        paramItem['repeat_days'][key] = [state.timeItemID];
        paramItem['repeat_type'] = 'once';

        paramItem['plan_participants_attributes'] = [];
        paramItem['plan_participants_attributes'].push({ 'participant_type': 'Crowd', 'participant_id': rootState.global.crowdModels[state.crowdIndex].id });
        paramItem['plan_participants_attributes'].push({ 'participant_type': 'Member', 'participant_id': rootState.global.teacherModels[state.teacherIndex].id });
        for (var i=0; i<state.transferStudentItems.length; i++) {
            var studentID = state.transferStudentItems[i][1].ext;
            paramItem['plan_participants_attributes'].push({ 'participant_type': 'Profile', 'participant_id': studentID });
        }

        paramItem['place_id'] = rootState.global.roomModels[state.roomIndex].id;
        paramItem['planned_type'] = 'Event';
        paramItem['planned_id'] = rootState.global.courseModels[state.courseIndex].id;
        
        console.log(paramItem);
        commit('updateFormLoading', true);
        //FIXME: multiple param items
        scheduleApi.putSchedule({ 'plan': paramItem }, response => {
            console.log(response);
            commit('updateFormLoading', false);
        }, error => {
            console.log(error);
        })
    }
}

const mutations = {
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateScheduleTime(state, {date, timeItemID}) {
        state.date = date;
        state.timeItemID = timeItemID;
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
    updateTransferStudentItem(state, { positionIndex, itemData }) {
        if (positionIndex === null) {
            state.transferStudentItems.push(itemData);
        } else if (state.transferStudentItems.length > positionIndex) {
            Vue.set(state.transferStudentItems, positionIndex, itemData);
        }
    },
    deleteTransferStudentItem(state, positionIndex) {
        if (positionIndex !== null) {
            state.transferStudentItems.splice(positionIndex, 1);
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}