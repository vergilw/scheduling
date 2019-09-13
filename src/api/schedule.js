import apiConfig from './api.config.js';
const axios = require('axios');
const qs = require('qs');

export default {
    getSchedule(params, successCallback, failureCallback) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.get('/admin/plans', qs.stringify(params), config)
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
