import apiConfig from './api.config.js';
const axios = require('axios');

export default {
  getRoom(params, successCallback, failureCallback) {
    axios.get('/admin/places', { params: params })
      .then(function (response) {
          successCallback(response);
      })
      .catch(function (error) {
          failureCallback(error);
      })
      .finally(function () {

      });
  },

  getRoomByID(roomID, successCallback, failureCallback) {
    axios.get('/admin/places/' + roomID)
      .then(function (response) {
        successCallback(response);
      })
      .catch(function (error) {
        failureCallback(error);
      })
      .finally(function () {

      });
  },

  patchRoomByID(roomID, params, successCallback, failureCallback) {
    axios.patch('/admin/places/' + roomID, params)
      .then(function (response) {
        console.log(params, response);
        successCallback(response);
      })
      .catch(function (error) {
        failureCallback(error,response);
      })
      .finally(function () {

      });
  },

  deleteRoomByID(roomID, scuuessCallback, failureCallback) {
    axios.delete('/admin/places/' + roomID)
      .then(function (response) {
        scuuessCallback(response);
      })
      .catch(function (error) {
        failureCallback(error);
      })
      .finally(function () {

      })
  },

  putRoom( params, successCallback, failureCallback ) {
    axios.post('/admin/places', params)
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
