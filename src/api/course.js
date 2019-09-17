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
    }

}
