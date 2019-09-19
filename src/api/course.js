import apiConfig from './api.config.js';
import notify from "./notify";
const axios = require('axios');

export default {

    putCourse(params, successCallback, failureCallback) {
        axios.post('/admin/events', params)
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

    patchCourse(courseId, params, successCallback, failureCallback) {
        axios.patch('/admin/events/' + courseId, params)
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

    getCourse(courseId, successCallback, failureCallback) {
        axios.get('/admin/events/' + courseId)
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    deleteCourse(courseId, successCallback, failureCallback) {
        axios.delete('/admin/events/' + courseId)
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

    putCourseType(params, successCallback, failureCallback) {
        axios.post('/admin/event_taxons', params)
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

    patchCourseTypeByID(courseTypeID, params, successCallback, failureCallback) {
        axios.patch('/admin/event_taxons/' + courseTypeID, params)
            .then(function (response) {
                successCallback(response);
                notify.show("修改成功");
            })
            .catch(function (error) {
                failureCallback(error);
                notify.show("修改失败");
            })
            .finally(function () {

            });
    },

    deleteCourseTypeByID(courseTypeID, successCallback, failureCallback) {
        axios.post('/admin/event_taxons/' + courseTypeID)
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
    }
}
