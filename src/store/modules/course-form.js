import courseApi from '../../api/course.js';
import Vue from "vue";

const state = {
    id: null,
    formLoading: false,
    title: null,
    typeIndex: null,
    costIndex: null,
    lessonItems: [],
    destroyedLessonItems: [],
}

const getters = {}

const actions = {
    putCourse({ state, commit, rootState }, completeCallback) {
        let eventItemsAttributes = [];
        for(let i = 0; i < state.lessonItems.length; i++) {
            let lessonItem = state.lessonItems[i];
            let eventItem = {
                "name": lessonItem[0]['value'],
                "videos": [lessonItem[1]['signId']],
                "documents": [lessonItem[2]['signId']]
            };
            eventItemsAttributes.push(eventItem);
        }

        let courseTypeId = 0;
        if(rootState.global.courseTypeModels && state.typeIndex < rootState.global.courseTypeModels.length) {
            courseTypeId = rootState.global.courseTypeModels[state.typeIndex]["id"];
        }

        let params = {
            "name": state.title,
            "price": 1,
            "event_taxon_id": courseTypeId,
            "event_items_attributes": eventItemsAttributes
        };

        commit('updateFormLoading', true);
        courseApi.putCourse({"event": params}, response => {
            commit('updateFormLoading', false);
            completeCallback();
        }, error => {
            commit('updateFormLoading', false);
        })
    },

    patchCourse({ state, commit, rootState }, completeCallback) {
        let eventItemsAttributes = [];
        for(let i = 0; i < state.lessonItems.length; i++) {
            let lessonItem = state.lessonItems[i];
            let eventItem = new Object();
            eventItem["name"] = lessonItem[0]['value'];

            if(lessonItem[0]['id'] != null) {
                eventItem["id"] = lessonItem[0]['id'];
            }

            if(lessonItem[1]['signId'] != null) {
                eventItem["videos"] = [lessonItem[1]['signId']];
            }

            if(lessonItem[2]['signId'] != null) {
                eventItem["documents"] = [lessonItem[2]['signId']];
            }

            eventItemsAttributes.push(eventItem);
        }

        for(let i = 0; i < state.destroyedLessonItems.length; i++) {
            let destroyedLessonItem = state.destroyedLessonItems[i];
            let eventItem = new Object();
            eventItem["name"] = destroyedLessonItem[0]['value'];

            if(destroyedLessonItem[0]['id'] != null) {
                eventItem["id"] = destroyedLessonItem[0]['id'];
            }

            if(destroyedLessonItem[0]['_destroy'] != null) {
                eventItem["_destroy"] = destroyedLessonItem[0]['_destroy'];
            }

            eventItemsAttributes.push(eventItem);
        }

        let courseTypeId = 0;
        if(rootState.global.courseTypeModels && state.typeIndex < rootState.global.courseTypeModels.length) {
            courseTypeId = rootState.global.courseTypeModels[state.typeIndex]["id"];
        }

        let params = {
            "name": state.title,
            "price": 1,
            "event_taxon_id": courseTypeId,
            "event_items_attributes": eventItemsAttributes
        };

        commit('updateFormLoading', true);
        courseApi.patchCourse(state.id, {"event": params}, response => {
            commit('updateFormLoading', false);
            completeCallback();
        }, error => {
            commit('updateFormLoading', false);
        })
    },

    getCourse({ state, commit, rootState }, {courseId, completeCallback}) {
        courseApi.getCourse(courseId, response => {
            commit('updateFormLoading', false);
            let courseModel = response['data']['event'];

            commit("updateId", courseModel['id']);
            commit("updateTitle", courseModel['name']);

            if(courseModel['event_taxon'] && courseModel['event_taxon']["id"]) {
                let typeIndex;
                let courseTypeId = courseModel['event_taxon']["id"];
                let typeModels = rootState.global.courseTypeModels;

                if(typeModels) {
                    for(let i = 0; i < typeModels.length; i++) {
                        if(courseTypeId === typeModels[i]["id"]) {
                            typeIndex = i;
                            break;
                        }
                    }
                    commit("updateTypeIndex", typeIndex);
                }
            }

            let eventItems = courseModel['event_items'];
            for(let i = 0; i < eventItems.length; i++) {
                let eventItem = eventItems[i];

                let fileTitle;
                if(eventItem["documents"].length > 0) {
                    fileTitle = eventItem["documents"][0]["filename"];
                    if(fileTitle != null && fileTitle.length > 30) {
                        fileTitle = fileTitle.substr(0, 30) + "...";
                    }
                }

                let mediaTitle;
                if(eventItem["videos"].length > 0) {
                    mediaTitle = eventItem["videos"][0]["filename"];
                    if(mediaTitle != null && mediaTitle.length > 30) {
                        mediaTitle = mediaTitle.substr(0, 30) + "...";
                    }
                }

                let lessonItem = [
                    {
                        key: "标题",
                        value: eventItem["name"],
                        id: eventItem["id"]
                    },
                    {
                        key: "文件",
                        value: fileTitle
                    },
                    {
                        key: "媒体资料",
                        value: mediaTitle
                    }
                ];

                commit("updateLessonItems", {index: null, itemData: lessonItem});
            }
            completeCallback();
        }, error => {
            commit('updateFormLoading', false);
        })
    },

    deleteCourse({ state, commit, rootState }, {courseId, completeCallback}) {
        commit('updateFormLoading', true);
        courseApi.deleteCourse(courseId, response => {
            completeCallback();
            commit('updateFormLoading', false);
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
        state.destroyedLessonItems = [];
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
            if(state.lessonItems[index][0]["id"] != null) {
                state.lessonItems[index][0]["_destroy"] = true;
                state.destroyedLessonItems.push(state.lessonItems[index]);
            }

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
