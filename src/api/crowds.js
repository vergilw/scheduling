import notify from "./notify";
const axios = require('axios');

export default {

    putCrowds(params, successCallback, failureCallback) {
        axios.post('/admin/crowds', params)
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
    },

    patchCrowdsById(crowdsId, params, successCallback, failureCallback) {
        axios.patch('/admin/crowds/' + crowdsId, params)
            .then(function (response) {
                successCallback(response);
                notify.show("更新成功");
            })
            .catch(function (error) {
                failureCallback(error);
                notify.show("更新失败");
            })
            .finally(function () {

            });
    },

    deleteCrowdsById(crowdsId, successCallback, failureCallback) {
        axios.delete('/admin/crowds/' + crowdsId)
            .then(function (response) {
                successCallback(response);
                notify.show("删除成功");
            })
            .catch(function (error) {
                failureCallback(error);
                notify.show("删除失败");
            })
            .finally(function () {

            });
    },

    getStudentsByCrowdsId(crowdsId, successCallback, failureCallback) {
        axios.get('/admin/crowds/' + crowdsId)
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
