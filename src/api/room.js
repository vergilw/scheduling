import apiConfig from './api.config.js';
const axios = require('axios');
import notify from "./notify";

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
        successCallback(response);
        notify.show('修改成功');
      })
      .catch(function (error) {
        failureCallback(error,response);
        notify.show('修改失败');
      })
      .finally(function () {

      });
  },

  deleteRoomByID(roomID, scuuessCallback, failureCallback) {
    axios.delete('/admin/places/' + roomID)
      .then(function (response) {
        scuuessCallback(response);
        notify.show('删除成功');
      })
      .catch(function (error) {
        failureCallback(error);
        notify.show('删除失败');
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
