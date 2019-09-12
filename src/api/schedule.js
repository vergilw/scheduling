import apiConfig from './api.config.js';
const axios = require('axios');

export default {
    getSchedule(successCallback, failureCallback) {
        axios.get('/admin/plans')
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    putSchedules(params, successCallback, failureCallback) {
        axios.post('/admin/plans', params)
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    putSchedule(params, successCallback, failureCallback) {
        axios.post('/admin/plans', params)
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
