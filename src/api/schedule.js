import apiConfig from './api.config.js';
const axios = require('axios');

export default {
    getSchedule(successCallback, failureCallback) {
        axios.get(apiConfig.hostname + '/schedule/index')
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
