import crowdsApi from '../../api/crowds.js';

const state = {
    crowdsID: null,
    formLoading: false,
    title: null,
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
};

const mutations = {
    reset(state) {
        state.crowdsID = null;
        state.title = null;
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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
