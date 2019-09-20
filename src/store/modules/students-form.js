import studentsApi from '../../api/students.js';

const state = {
    studentID: null,
    formLoading: false,
    title: null,
}

const getters = {}

const actions = {

    patchStudentByID({ state, commit, rootState }, completeCallback) {
        let params = {};
        params["name"] = state.title;

        let store = this;
        // commit("updateFormLoading", true);
        // studentsApi.patchStudentById(state.studentID, { member: params }, response => {
        //     commit("updateFormLoading", false);
        //     store.dispatch("global/getCrowds");
        //     completeCallback();
        // }, error => {
        //     commit("updateFormLoading", false);
        // });
    },

    deleteStudentByID({ state, commit, rootState }, {crowdsID, completeCallback}) {
        let store = this;

        // studentsApi.deleteStudentById(crowdsID, response => {
        //     store.dispatch("global/getCrowds");
        //     completeCallback();
        // }, error => {
        //     console.log(error);
        // });
    },

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
    updateCrowdsID(state, int) {
        state.studentID = int;
    },
    updateTitle(state, string) {
        state.title = string;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
