import courseApi from '../../api/course.js';
import Vue from "vue";

const state = {
    id: null,
    formLoading: false,
    title: null,
    typeIndex: null,
    costIndex: null,
    lessonItems: [],
}

const getters = {}

const actions = {
    putCourse({ state, commit, rootState }) {
        let params = {};
        params['name'] = state.title;
        params['price'] = 1;
        // params['event_taxon_id'] = state.typeIndex;
        params['event_taxon_id'] = 7;
        // params['price'] = state.costIndex;

        let eventItemsAttributes = [];
        for(let i = 0; i < state.lessonItems.length; i++) {
            let lessonItem = state.lessonItems[i];
            let eventItem = {};
            eventItem['name'] = lessonItem[0]['value'];
            eventItem['videos'] = [lessonItem[1]['signId']];
            eventItem['documents'] = [lessonItem[2]['signId']];
            eventItemsAttributes.push(eventItem);
        }
        params['event_items_attributes'] = eventItemsAttributes;

        let store = this;
        courseApi.putCourse({"event": params}, response => {
            console.log("Course response: " + response['data']);
            commit('updateFormLoading', false);
            store.dispatch('global/getCourses');
            $(".ui.modal.course").modal("hide");
        }, error => {
            commit('updateFormLoading', false);
        })
    }
}

const mutations = {
    reset(state) {
        state.id = null;
        state.title = null;
        state.typeIndex = null;
        state.costIndex = null;
        state.lessonItems = [];
    },
    assign(state, {id, title, typeIndex, costIndex, lessonItems}) {
        state.id = id;
        state.title = title;
        state.typeIndex = typeIndex;
        state.costIndex = costIndex;
        state.lessonItems = lessonItems;
    },
    updateId(state, int) {
        state.id = int;
    },
    updateFormLoading(state, boolean) {
        state.formLoading = boolean;
    },
    updateTitle(state, string) {
        state.title = string;
    },
    updateTypeIndex(state, int) {
        state.typeIndex = int;
    },
    updateCostIndex(state, int) {
        state.costIndex = int;
    },
    updateLessonItems(state, {index, itemData}) {
        if (index === null) {
            state.lessonItems.push(itemData);
        } else if (index < state.lessonItems.length) {
            Vue.set(state.lessonItems, index, itemData);
        }
    },
    deleteLessonItems(state, index) {
        if (index !== null) {
            state.lessonItems.splice(index, 1);
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
