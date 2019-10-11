<template>
      <div class="ui sgfield">
        <div class="header">{{label}}</div>
        <div class="ui file sgfield">
          <div class="ui inverted button"><i class="fas fa-plus"></i> 添加文件</div>
          <input type="file" class="file" v-bind:name="name" v-on:input="showFile($event)">
          <div v-if="value" class="sel description">{{ value }}</div>
          <div v-else class="unsel description">未选择任何文件</div>
        </div>
      </div>
</template>
<script>
import apiConfig from '../../api/api.config.js';
const axios = require('axios');
const qiniu = require('qiniu-js');
let signId;
let context;

export default {
  name:"FileComponent",
  props: {
    label:String,
    name:String,
    value:String,
  },
  methods: {
    showFile: function(e){
        let file = e.currentTarget.files[0];
        let name = file.name;

        context = this;
        getUpToken(file);
        this.$emit("input", name);
    }
  }
}

function getUpToken(file) {
    let postData = {
        "blob": {
            "filename":file.name,
            "content_type": file.mimeType,
            "byte_size": file.size,
            "checksum": "1"
        }
    }

    axios.post(apiConfig.hostname + '/rails/active_storage/direct_uploads', postData)
    // axios.post("http://sg_staging.1314-edu.com" + '/rails/active_storage/direct_uploads', postData)
        .then(function (response) {
            let key = response['data']['key'];
            let upToken = response['data']['direct_upload']['headers']['Up-Token'];
            signId = response['data']['signed_id'];

            uploadByQiniu(file, key, upToken);
        })
        .catch(function (error) {

        })
        .finally(function () {

        });
}

function uploadByQiniu(file, key, upToken) {
    let config = {
        region: qiniu.region.z2
    };

    let observable = qiniu.upload(file, key, upToken, null, config);
    observable.subscribe({
        next: (res) => {
            // 主要用来展示进度
            let total = res.total;
            console.log("进度：" + parseInt(total.percent) + "%");
        },
        error: (err) => {
            // 失败报错信息
            console.log(err)
        },
        complete: (res) =>{
            // 接收成功后返回的信息\
            console.log("complete");
            context.$emit("setSignId", context.name, signId);
        }
    });
}

</script>

<style scoped>

    .ui.file.sgfield > .sel.description {
        color: #4a90e2;
    }

    .ui.file.sgfield > .unsel.description {
        color: #9199a3;
    }

</style>
