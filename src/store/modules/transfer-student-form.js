import globalApi from '../../api/global.js';

const state = {
    formLoading: false,
    positionIndex: null,
    crowdIndex: null,
    studentModels: null,
    studentIndex: null
}

const getters = {}

const actions = {
    getStudents({ state, commit, rootState }) {
        commit('updateFormLoading', true);
        globalApi.getStudents(rootState.global.crowdModels[state.crowdIndex]['id'], response => {
            commit('updateStudentModels', response['data']['crowd']['members']);
            commit('updateFormLoading', false);
        }, error => {

        })
    }
}

const mutations = {
    reset(state) {
        state.positionIndex = null;
        state.crowdIndex = null;
        state.studentIndex = null;
    },
    assign(state, {positionIndex, crowdIndex, studentIndex}) {
        state.positionIndex = positionIndex;
        state.crowdIndex = crowdIndex;
        state.studentModels = null;
        state.studentIndex = studentIndex;
    },
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateCrowdIndex(state, int) {
        state.crowdIndex = int;
        state.studentIndex = null;
    },
    updateStudentIndex(state, int) {
        state.studentIndex = int;
    },
    updateStudentModels(state, models) {
        state.studentModels = models;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}