import notify from "./notify";
const axios = require('axios');

export default {

    patchStudentById(studentId, params, successCallback, failureCallback) {
        axios.patch('/admin/crowds/' + studentId, params)
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

    deleteStudentById(studentId, successCallback, failureCallback) {
        axios.delete('/admin/crowds/' + studentId)
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

}
