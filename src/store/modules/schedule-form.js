import scheduleApi from '../../api/schedule.js';
import Vue from 'vue';
var dateFormat = require("dateformat");

const state = {
    formLoading: false,
    scheduleID: null,
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
    putSchedule({ state, commit, rootState }, completeCallback) {

        var paramItem = {};
        console.log('dateFormat store date', state.date);
        paramItem['plan_on'] = dateFormat(state.date, 'yyyy-mm-dd');
        paramItem['time_item_id'] = state.timeItemID;

        paramItem['plan_participants_attributes'] = [];
        paramItem['plan_participants_attributes'].push({ 'participant_type': 'Crowd', 'participant_id': rootState.global.crowdModels[state.crowdIndex].id });
        paramItem['plan_participants_attributes'].push({ 'participant_type': 'Member', 'participant_id': rootState.global.teacherModels[state.teacherIndex].id });
        for (var i = 0; i < state.transferStudentItems.length; i++) {
            var studentID = state.transferStudentItems[i][1].ext;
            paramItem['plan_participants_attributes'].push({ 'participant_type': 'Profile', 'participant_id': studentID });
        }

        paramItem['place_id'] = rootState.global.roomModels[state.roomIndex].id;
        paramItem['planned_type'] = 'Event';
        paramItem['planned_id'] = rootState.global.courseModels[state.courseIndex].id;

        console.log(paramItem);
        
        var store = this;

        commit('updateFormLoading', true);
        scheduleApi.putSchedule({ 'plan_item': paramItem }, response => {
            console.log(response);
            commit('updateFormLoading', false);
            store.dispatch("schedule/getSchedule");

            Vue.notify({
                group: 'hud',
                title: '创建成功',
                duration: 2000
            });
            completeCallback();

        }, error => {
            commit('updateFormLoading', false);
            console.log(error);
        })
    },

    getScheduleByID({ state, commit, rootState }) {
        var store = this;

        commit('updateFormLoading', true);
        scheduleApi.getScheduleByID(state.scheduleID, response => {

            commit('updateFormLoading', false);

            var params = {
                date: new Date(response['data']['plan_item']['start_at']),
                courseID: response['data']['plan_item']['planned_id'],
                roomID: response['data']['plan_item']['place_id']
            };
            for (var i = 0; i < response['data']['plan_item']['plan_participants'].length; i++) {
                var obj = response['data']['plan_item']['plan_participants'][i];
                if (obj['participant_type'] === 'Crowd') {
                    params['crowdID'] = obj['participant_id'];
                } else if (obj['participant_type'] === 'Member') {
                    params['teacherID'] = obj['participant_id'];
                    // } else if (obj['participant_type'] === 'Profile') {
                    //     params['teacherID'] = obj['participant_id'];
                }
            }
            console.log(params);
            commit('assign', params);

        }, error => {
            console.log(error);
        })
    },

    patchScheduleByID({ state, commit, rootState }, completeCallback) {
        var paramItem = {};
        paramItem['plan_on'] = dateFormat(state.date, 'yyyy-mm-dd');
        paramItem['time_item_id'] = state.timeItemID;

        paramItem['plan_participants_attributes'] = [];
        paramItem['plan_participants_attributes'].push({ 'participant_type': 'Crowd', 'participant_id': rootState.global.crowdModels[state.crowdIndex].id });
        paramItem['plan_participants_attributes'].push({ 'participant_type': 'Member', 'participant_id': rootState.global.teacherModels[state.teacherIndex].id });
        for (var i = 0; i < state.transferStudentItems.length; i++) {
            var studentID = state.transferStudentItems[i][1].ext;
            paramItem['plan_participants_attributes'].push({ 'participant_type': 'Profile', 'participant_id': studentID });
        }

        paramItem['place_id'] = rootState.global.roomModels[state.roomIndex].id;
        paramItem['planned_type'] = 'Event';
        paramItem['planned_id'] = rootState.global.courseModels[state.courseIndex].id;

        var store = this;

        console.log(paramItem);
        commit('updateFormLoading', true);
        scheduleApi.patchScheduleByID(state.scheduleID, { 'plan_item': paramItem }, response => {
            commit('updateFormLoading', false);
            store.dispatch("schedule/getSchedule");

            Vue.notify({
                group: 'hud',
                title: '修改成功',
                duration: 1500
            });
            completeCallback();

        }, error => {
            commit('updateFormLoading', false);
            console.log(error);
        });
    },

    deleteScheduleByID({ state, commit, rootState }) {

        var store = this;

        // commit('updateFormLoading', true);
        scheduleApi.deleteScheduleByID(state.scheduleID, response => {
            // commit('updateFormLoading', false);
            store.dispatch("schedule/getSchedule");
            Vue.notify({
                group: 'hud',
                title: '删除成功',
                duration: 1500
            });

        }, error => {
            // commit('updateFormLoading', false);
            console.log(error);
        });
    },

    moveScheduleByID({ state, commit, rootState }, { scheduleID, targetDate, targetTimeItemID }) {

        var paramItem = {};
        paramItem['plan_on'] = targetDate;
        paramItem['time_item_id'] = targetTimeItemID;

        var store = this;

        console.log(paramItem);
        // commit('updateFormLoading', true);
        scheduleApi.patchScheduleByID(scheduleID, { 'plan_item': paramItem }, response => {
            // commit('updateFormLoading', false);
            store.dispatch("schedule/getSchedule");
            Vue.notify({
                group: 'hud',
                title: '移动成功',
                duration: 1500
            });

        }, error => {
            // commit('updateFormLoading', false);
            console.log(error.response);
        });
    }
}

const mutations = {
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    reset(state) {
        state.scheduleID = null;
        state.date = null;
        state.timeItemID = null;
        state.courseIndex = null;
        state.roomIndex = null;
        state.crowdIndex = null;
        state.transferStudentItems = [];
        state.teacherIndex = null;
        state.note = null;
    },
    assign(state, { date, timeItemID, courseID, roomID, crowdID, transferStudentItems, teacherID }) {
        state.date = date;
        state.timeItemID = timeItemID;

        for (var i = 0; i < this.state.global.courseModels.length; i++) {
            if (this.state.global.courseModels[i].id === courseID) {
                state.courseIndex = i;
                break;
            }
        }

        for (var i = 0; i < this.state.global.roomModels.length; i++) {
            if (this.state.global.roomModels[i].id === roomID) {
                state.roomIndex = i;
                break;
            }
        }

        for (var i = 0; i < this.state.global.crowdModels.length; i++) {
            if (this.state.global.crowdModels[i].id === crowdID) {
                state.crowdIndex = i;
                break;
            }
        }

        for (var i = 0; i < this.state.global.teacherModels.length; i++) {
            if (this.state.global.teacherModels[i].id === teacherID) {
                state.teacherIndex = i;
                break;
            }
        }
    },
    updateScheduleID(state, int) {
        state.scheduleID = int;
    },
    updateScheduleTime(state, { date, timeItemID }) {
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