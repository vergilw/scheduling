import apiConfig from './api.config.js';
const axios = require('axios');

export default {
    getCourses(successCallback, failureCallback) {
        axios.get(apiConfig.hostname + '/schedule/courses')
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    getRooms(successCallback, failureCallback) {
        axios.get(apiConfig.hostname + '/admin/rooms')
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    getCrowds(successCallback, failureCallback) {
        axios.get(apiConfig.hostname + '/admin/crowds')
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    getTeachers(successCallback, failureCallback) {
        axios.get(apiConfig.hostname + '/schedule/teachers')
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    getCourseTypes(successCallback, failureCallback) {
        axios.get(apiConfig.hostname + '/admin/course_taxons')
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    getClassTime(successCallback, failureCallback) {
        axios.get(apiConfig.hostname + '/admin/time_items/default')
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    }
}
