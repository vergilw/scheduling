import scheduleApi from '../../api/schedule.js';
import Vue from 'vue';
var dateFormat = require("dateformat");

const state = {
    formLoading: false,
    courseIndex: null,
    capacity: null,
    startDate: null,
    endDate: null,
    periodItems: []
}

const getters = {}

const actions = {
    putSchedules({ state, commit, rootState }) {
        var params = [];

        console.log(state.periodItems[0][0].data);

        var paramItem = {};
        for (var i = 0; i < state.periodItems.length; i++) {
            
            
            var periodData = {};
            for (var j = 0; j < state.periodItems[i][0].data.length; j++) {
                var weekdayIndex = state.periodItems[i][0].data[j][0].data;
                var timeItemIndex = state.periodItems[i][0].data[j][1].data;
                
                if (!(weekdayIndex.toString() in periodData)) {
                    periodData[weekdayIndex.toString()] = [timeItemIndex];
                } else if (!periodData[weekdayIndex.toString()].includes(timeItemIndex)) {
                    periodData[weekdayIndex.toString()].push(timeItemIndex);
                }
            }

            paramItem['repeat_days'] = periodData;

            paramItem['plan_participants_attributes'] = [];
            paramItem['plan_participants_attributes'].push({'participant_type': 'Crowd', 'participant_id': state.periodItems[i][2].data});
            paramItem['plan_participants_attributes'].push({'participant_type': 'Member', 'participant_id': state.periodItems[i][3].data});

            paramItem['place_id'] = state.periodItems[i][1].data;
            paramItem['planned_type'] = 'Event';
            paramItem['planned_id'] = rootState.global.courseModels[state.courseIndex].id;
            paramItem['begin_on'] = dateFormat(state.startDate, "yyyy-mm-dd");
            paramItem['end_on'] = dateFormat(state.startDate, "yyyy-mm-dd");
            paramItem['repeat_type'] = 'weekly';

            params.push(paramItem);
        }

        console.log(params[0]);

        commit('updateFormLoading', true);
        //FIXME: multiple param items
        scheduleApi.putSchedules({'plan': params[0]}, response => {
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