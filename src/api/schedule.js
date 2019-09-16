import apiConfig from './api.config.js';
const axios = require('axios');
const qs = require('qs');

export default {
    getSchedule(params, successCallback, failureCallback) {
        axios.get('/admin/plan_items', { params: params })
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    getScheduleByID(scheduleID, successCallback, failureCallback) {
        axios.get('/admin/plan_items/' + scheduleID)
            .then(function (response) {
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error);
            })
            .finally(function () {

            });
    },

    patchScheduleByID(scheduleID, params, successCallback, failureCallback) {
        axios.patch('/admin/plan_items/' + scheduleID, params)
            .then(function (response) {
                console.log(params, response);
                successCallback(response);
            })
            .catch(function (error) {
                failureCallback(error.response);
            })
            .finally(function () {

            });
    },

    deleteScheduleByID(scheduleID, successCallback, failureCallback) {
        axios.delete('/admin/plan_items/' + scheduleID)
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
        axios.post('/admin/plan_items', params)
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
