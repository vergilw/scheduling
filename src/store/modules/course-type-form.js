import courseApi from '../../api/course.js';
import Vue from 'vue';

const state = {
    courseTypeID: null,
    formLoading: false,
    title: null,
}

const getters = {}

const actions = {

    putCourseType({ state, commit, rootState }) {
        var params = {};
        params["name"] = state.title;

        var store = this;
        courseApi.putCourseType({ event_taxon: params }, response => {
            commit("updateFormLoading", false);
            store.dispatch("global/getCourseTypes");
        }, error => {
            commit("updateFormLoading", false);
        });
    },

    patchCourseTypeByID({ state, commit, rootState }) {
        var params = {};
        params["name"] = state.title;

        var store = this;
        courseApi.patchCourseTypeByID(state.courseTypeID, { event_taxon: params }, response => {
            commit("updateFormLoading", false);
            store.dispatch("global/getCourseTypes");
        }, error => {
            commit("updateFormLoading", false);
        });
    },

    deleteCourseTypeByID({ state, commit, rootState }, courseTypeID) {
        var store = this;

        courseApi.deleteCourseTypeByID(courseTypeID, response => {
            store.dispatch("global/getCourseTypes");
        }, error => {
            console.log(error);
        });
    },
};

const mutations = {
    reset(state) {
        state.title = null;
    },
    assign(state, model) {
        state.courseTypeID = model.id;
        state.title = model.name;
    },
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateCourseTypeID(state, int) {
        state.courseTypeID = int;
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
