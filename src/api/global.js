import apiConfig from './api.config.js';
import config from './header'
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
        axios.get(apiConfig.hostname + '/admin/rooms', config)
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
        axios.get(apiConfig.hostname + '/admin/crowds', config)
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
        axios.get(apiConfig.hostname + '/admin/course_taxons', config)
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
        axios.get(apiConfig.hostname + '/admin/time_items/default', config)
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
