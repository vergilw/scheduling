import crowdsApi from '../../api/crowds.js';
import Vue from "vue";

const state = {
    crowdsID: null,
    formLoading: false,
    title: null,
    studentItems: [],
}

const getters = {}

const actions = {

    putCrowd({ state, commit, rootState }, completeCallback) {
        var params = {};
        params["name"] = state.title;

        var store = this;
        commit("updateFormLoading", true);
        crowdsApi.putCrowds({ crowd: params }, response => {
            commit("updateFormLoading", false);
            store.dispatch("global/getCrowds");
            completeCallback();
        }, error => {
            commit("updateFormLoading", false);
        });
    },

    patchCrowdByID({ state, commit, rootState }, completeCallback) {
        var params = {};
        params["name"] = state.title;

        var store = this;
        commit("updateFormLoading", true);
        crowdsApi.patchCrowdsById(state.crowdsID, { crowd: params }, response => {
            commit("updateFormLoading", false);
            store.dispatch("global/getCrowds");
            completeCallback();
        }, error => {
            commit("updateFormLoading", false);
        });
    },

    deleteCrowdByID({ state, commit, rootState }, {crowdsID, completeCallback}) {
        var store = this;

        crowdsApi.deleteCrowdsById(crowdsID, response => {
            store.dispatch("global/getCrowds");
            completeCallback();
        }, error => {
            console.log(error);
        });
    },

    getStudentsByCrowdsId({ state, commit, rootState }, crowdsID) {
        crowdsApi.getStudentsByCrowdsId(crowdsID, response => {
            let students = response["data"]["crowd"]["members"];
            for(let i = 0; i < students.length; i++) {
                let student = students[i];
                commit("updateStudentItems", {index: null, itemData: student});
            }
        }, error => {
            console.log(error);
        });
    },

    deleteStudentById({ state, commit, rootState }, {crowdsID, studentID, completeCallback}) {
        commit("updateFormLoading", true);
        crowdsApi.deleteStudentsById(crowdsID, studentID, response => {
            commit("updateFormLoading", false);
            completeCallback();
        }, error => {
            console.log(error);
            commit("updateFormLoading", false);
        });
    }
};

const mutations = {
    reset(state) {
        state.crowdsID = null;
        state.title = null;
        state.studentItems = [];
    },
    assign(state, model) {
        state.crowdsID = model.id;
        state.title = model.name;
    },
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateCrowdsID(state, int) {
        state.crowdsID = int;
    },
    updateTitle(state, string) {
        state.title = string;
    },
    clearStudentItems(state) {
        state.studentItems = [];
    },
    updateStudentItems(state, {index, itemData}) {
        if (index === null) {
            state.studentItems.push(itemData);
        } else if (index < state.studentItems.length) {
            Vue.set(state.studentItems, index, itemData);
        }
    },
    deleteStudentItems(state, index) {
        if (index !== null) {
            state.studentItems.splice(index, 1);
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
