import globalApi from '../../api/global.js';
const axios = require('axios');

const state = {
    courseModels: null,
    roomModels: null,
    crowdModels: null,
    teacherModels: null,
    courseTypeModels: null,
    classTimeModels: null,
    courseConfigModels: null,
    weekdayModels: [
        {
          id: 1,
          name: "每周一"
        },
        {
          id: 2,
          name: "每周二"
        },
        {
          id: 3,
          name: "每周三"
        },
        {
          id: 4,
          name: "每周四"
        },
        {
          id: 5,
          name: "每周五"
        },
        {
          id: 6,
          name: "每周六"
        },
        {
          id: 7,
          name: "每周日"
        }
      ]
}

const getters = {}

const actions = {
    getCourses({ state, commit, rootState }) {
        globalApi.getCourses(response => {
            commit('courseModelsUpdated', response['data']);
        }, error => {

        })
    },
    getRooms({ state, commit, rootState }) {
        globalApi.getRooms(response => {
            commit('roomModelsUpdated', response['data']['places']);
        }, error => {

        })
    },
    getCrowds({ state, commit, rootState }) {
        globalApi.getCrowds(response => {
            commit('crowdModelsUpdated', response['data']['crowds']);
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
            commit('courseTypeModelsUpdated', response['data']['event_taxons']);
        }, error => {

        })
    },
    getClassTime({ state, commit, rootState }) {
        globalApi.getClassTime(response => {
            commit('classTimeModelsUpdated', response['data']['time_items']);
        }, error => {

        })
    }
}

const mutations = {
    configRequestDefaults(state, {authToken, organToken}) {
        axios.defaults.headers.common['Auth_Token'] = authToken;
        axios.defaults.headers.common['Organ_Token'] = organToken;
        axios.defaults.headers.common['Accept'] = 'application/vnd.inee.v1+json';
    },
    courseModelsUpdated(state, models) {
        state.courseModels = models;
    },
    roomModelsUpdated(state, models) {
        state.roomModels = models;
    },
    crowdModelsUpdated(state, models) {
        state.crowdModels = models;
    },
    teacherModelsUpdated(state, models) {
        state.teacherModels = models;
    },
    courseTypeModelsUpdated(state, models) {
        state.courseTypeModels = models;
    },
    classTimeModelsUpdated(state, models) {
        state.classTimeModels = models;
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
