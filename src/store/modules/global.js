import globalApi from '../../api/global.js';

const state = {
    roomModels: null,
    crowdModels: null,
    teacherModels: null,
    majorCourseTypeModels: null,
    minorCourseTypeModels: null,
    coursewareModels: null,
    courseConfigModels: null,
}

const getters = {}

const actions = {
    getRooms({ state, commit, rootState }) {
        globalApi.getRooms(response => {
            commit('roomModelsUpdated', response['data']);
        }, error => {

        })
    },
    getCrowds({ state, commit, rootState }) {
        globalApi.getCrowds(response => {
            commit('crowdModelsUpdated', response['data']);
        }, error => {

        })
    },
    getTeachers({ state, commit, rootState }) {
        globalApi.getTeachers(response => {
            commit('teacherModelsUpdated', response['data']);
        }, error => {

        })
    },
    getCourseTypes({ state, commit, rootState }) {
        globalApi.getCourseTypes(response => {
            commit('courseTypeModelsUpdated', { 'majorModels': response['data']['major'], 'minorModels': response['data']['minor'] });
        }, error => {

        })
    },
    getCoursewares({ state, commit, rootState }) {
        globalApi.getCoursewares(response => {
            commit('coursewareModelsUpdated', response['data']);
        }, error => {

        })
    }
}

const mutations = {
    roomModelsUpdated(state, models) {
        state.roomModels = models;
    },
    crowdModelsUpdated(state, models) {
        state.crowdModels = models;
    },
    teacherModelsUpdated(state, models) {
        state.teacherModels = models;
    },
    courseTypeModelsUpdated(state, { majorModels, minorModels }) {
        state.majorCourseTypeModels = majorModels;
        state.minorCourseTypeModels = minorModels;
    },
    coursewareModelsUpdated(state, models) {
        state.coursewareModels = models;
    },
    courseConfigModelsUpdated(state, models) {
        state.courseConfigModels = models;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}