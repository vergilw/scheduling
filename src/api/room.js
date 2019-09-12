import apiConfig from './api.config.js';
const axios = require('axios');

export default {

  putRoom(params,successCallback, failureCallback) {
    axios.post('/admin/places',params)
      .then(function (response) {
        successCallback(response);
      })
      .catch(function (error) {
        failureCallback(error);
      })
      .finally(function () {

      });
  },

}
