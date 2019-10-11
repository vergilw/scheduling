import studentsApi from '../../api/students.js';

const state = {
    studentID: null,
    formLoading: false,
    title: null,
    crowdsIndex: null,
}

const getters = {}

const actions = {

};

const mutations = {
    reset(state) {
        state.studentID = null;
        state.title = null;
    },
    assign(state, model) {
        state.studentID = model.id;
        state.title = model.name;
    },
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateStudentID(state, int) {
        state.studentID = int;
    },
    updateTitle(state, string) {
        state.title = string;
    },
    updateCrowdsIndex(state, int) {
        state.crowdsIndex = int;
    },
    resetCrowdsIndex(state) {
        state.crowdsIndex = null;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
