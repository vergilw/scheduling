import notify from "./notify";
const axios = require('axios');

export default {

    putLessonTime(params, successCallback, failureCallback) {
        axios.post('/admin/time_lists/16/time_items', params)
            .then(function (response) {
                successCallback(response);
                notify.show("添加成功");
            })
            .catch(function (error) {
                failureCallback(error);
                notify.show("添加失败");
            })
            .finally(function () {

            });
    },

    patchLessonTimeById(lessonTimeId, params, successCallback, failureCallback) {
        axios.patch('/admin/time_lists/16/time_items/' + lessonTimeId, params)
            .then(function (response) {
                successCallback(response);
                notify.show("更新成功");
            })
            .catch(function (error) {
                failureCallback(error);
                notify.show("更新失败");
            })
            .finally(function () {

            });
    },

    deleteLessonTimeById(lessonTimeId, successCallback, failureCallback) {
        axios.delete('/admin/time_lists/16/time_items/' + lessonTimeId)
            .then(function (response) {
                successCallback(response);
                notify.show("删除成功");
            })
            .catch(function (error) {
                failureCallback(error);
                notify.show("删除失败");
            })
            .finally(function () {

            });
    },

}
