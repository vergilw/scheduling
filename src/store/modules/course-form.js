import courseApi from '../../api/course.js';
import Vue from "vue";

const state = {
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

        console.log("name: " + params['name']);
        console.log("price: " + params['price']);
        console.log("event_item_attributes > name: " + params['event_items_attributes'][0]['name']);
        console.log("event_item_attributes > videos: " + params['event_items_attributes'][0]['videos']);
        console.log("event_item_attributes > documents: " + params['event_items_attributes'][0]['documents']);

        courseApi.putCourse({"event": params}, response => {
            console.log("Course response: " + response['data']);
            commit('updateFormLoading', false);
        }, error => {
            commit('updateFormLoading', false);
        })
    }
}

const mutations = {
    reset(state) {
        state.title = null;
        state.typeIndex = null;
        state.costIndex = null;
        state.lessonItems = [];
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
        } else if (index < state.periodItems.length) {
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
