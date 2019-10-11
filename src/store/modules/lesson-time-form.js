import lessonTimeApi from '../../api/lesson-time.js';

const state = {
    lessonTimeID: null,
    formLoading: false,
    startTime: null,
    endTime: null
}

const getters = {}

const actions = {
    putLessonTime({ state, commit, rootState }, completeCallback) {
        let params = {
            "start_at": state.startTime,
            "finish_at": state.endTime
        }

        commit('updateFormLoading', true);
        lessonTimeApi.putLessonTime({"time_item": params}, response => {
            commit('updateFormLoading', false);
            completeCallback();
        }, error => {
            commit('updateFormLoading', false);
        })
    },

    patchLessonTime({ state, commit, rootState }, completeCallback) {
        let params = {
            "start_at": state.startTime,
            "finish_at": state.endTime
        }

        commit('updateFormLoading', true);
        lessonTimeApi.patchLessonTimeById(state.lessonTimeID, {"time_item": params}, response => {
            commit('updateFormLoading', false);
            completeCallback();
        }, error => {
            commit('updateFormLoading', false);
        })
    },

    deleteLessonTime({ state, commit, rootState }, {lessonTimeId, completeCallback}) {
        commit('updateFormLoading', true);
        lessonTimeApi.deleteLessonTimeById(lessonTimeId, response => {
            commit('updateFormLoading', false);
            completeCallback();
        }, error => {
            commit('updateFormLoading', false);
        })
    },
}

const mutations = {
    reset(state) {
        state.lessonTimeID = null;
        state.startTime = null;
        state.endTime = null;
    },
    assign(state, model) {
        state.lessonTimeID = model.id;
        state.startTime = model.start_at;
        state.endTime = model.finish_at;
    },
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateLessonTimeId(state, int) {
        state.lessonTimeID = int;
    },
    updateStartTime(state, string) {
        state.startTime = string;
    },
    updateEndTime(state, string) {
        state.endTime = string;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
