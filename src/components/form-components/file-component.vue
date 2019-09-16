<template>
      <div class="ui sgfield">
        <div class="header">{{label}}</div>
        <div class="ui file sgfield" :id="id">
          <div class="ui inverted button"><i class="fas fa-plus"></i> 添加文件</div>
          <input type="file" class="file" v-bind:name="name" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" v-on:click="showFile">
          <div class="description">未选择任何文件</div>
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
    id: String
  },
  methods: {
    showFile: function(){
        let fileInput, aim;
        context = this;

        if(this.id == 'file') {
            fileInput = $('#file > input');
            aim = $('#file > .description');
        } else if(this.id == 'media_file') {
            fileInput = $('#media_file > input');
            aim = $('#media_file > .description');
        }

        fileInput.on('change', function( e ) {
            let file = e.currentTarget.files[0];
            let name = file.name;
            if(name.length > 20) {
                name = name.substr(0,20)+"...";
            }
            aim.text(name).css("color","#4a90e2");

            getUpToken(file);
        });
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

            // context.$emit("setSignId", context.name, signId);

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

</style>
