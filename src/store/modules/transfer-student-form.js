import globalApi from '../../api/global.js';

const state = {
    formLoading: false,
    transferStudentIndex: null,
    crowdIndex: null,
    studentModels: null,
    studentIndex: null
}

const getters = {}

const actions = {
    getStudents({ state, commit, rootState }) {
        commit('updateFormLoading', true);
        globalApi.getStudents(rootState.global.crowdModels[state.crowdIndex]['id'], response => {
            commit('updateStudentModels', response['data']['crowd']['students']);
            commit('updateFormLoading', false);
        }, error => {

        })
    }
}

const mutations = {
    reset(state) {
        state.transferStudentIndex = null;
        state.crowdIndex = null;
        state.studentIndex = null;
    },
    assign(state, {transferStudentIndex, crowdIndex, studentIndex}) {
        state.transferStudentIndex = null;
        state.crowdIndex = null;
        state.studentIndex = null;
    },
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateCrowdIndex(state, int) {
        state.crowdIndex = int;
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