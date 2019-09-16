import scheduleApi from '../../api/schedule.js';
import Vue from 'vue';
var dateFormat = require("dateformat");

const state = {
    formLoading: false,
    courseIndex: null,
    startDate: null,
    endDate: null,
    periodItems: []
}

const getters = {}

const actions = {
    putSchedules({ state, commit, rootState }) {
        var params = [];

        var paramItem = {};
        for (var i = 0; i < state.periodItems.length; i++) {
            
            
            var periodData = {};
            for (var j = 0; j < state.periodItems[i][0].data.length; j++) {
                var weekdayIndex = state.periodItems[i][0].data[j][0].data;
                var timeItemIndex = state.periodItems[i][0].data[j][1].data;
                
                if (!(weekdayIndex.toString() in periodData)) {
                    periodData[weekdayIndex.toString()] = [rootState.global.classTimeModels[timeItemIndex].id];
                } else if (!periodData[weekdayIndex.toString()].includes(rootState.global.classTimeModels[timeItemIndex].id)) {
                    periodData[weekdayIndex.toString()].push(rootState.global.classTimeModels[timeItemIndex].id);
                }
            }

            paramItem['repeat_days'] = periodData;

            paramItem['plan_participants_attributes'] = [];
            paramItem['plan_participants_attributes'].push({'participant_type': 'Crowd', 'participant_id': rootState.global.crowdModels[state.periodItems[i][2].data].id});
            paramItem['plan_participants_attributes'].push({'participant_type': 'Member', 'participant_id': rootState.global.teacherModels[state.periodItems[i][3].data].id});

            paramItem['place_id'] = rootState.global.roomModels[state.periodItems[i][1].data].id;
            paramItem['planned_type'] = 'Event';
            paramItem['planned_id'] = rootState.global.courseModels[state.courseIndex].id;
            paramItem['begin_on'] = dateFormat(state.startDate, "yyyy-mm-dd");
            paramItem['end_on'] = dateFormat(state.startDate, "yyyy-mm-dd");
            paramItem['repeat_type'] = 'weekly';

            params.push(paramItem);
        }

        var store = this;
        console.log(params);

        commit('updateFormLoading', true);
        //FIXME: multiple param items
        scheduleApi.putSchedules({'plan': params[0]}, response => {
            console.log(response);
            commit('updateFormLoading', false);
            store.dispatch("schedule/getSchedule");
            
        }, error => {
            console.log(error);
        })
    }
}

const mutations = {
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateCourseIndex(state, int) {
        state.courseIndex = int;
    },
    updateStartDate(state, date) {
        state.startDate = date;
    },
    updateEndDate(state, date) {
        state.endDate = date;
    },
    updatePeriodItem(state, { positionIndex, itemData }) {
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}