import apiConfig from './api.config.js';
const axios = require('axios');

export default {

    putCourse(params, successCallback, failureCallback) {
        axios.post('/admin/events', params)
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
