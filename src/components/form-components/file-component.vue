<template>
  <div class="field">
    <div class="inline fields">
      <div class="ui sgfield">
        <div class="header">媒体资料</div>
        <div class="ui file sgfield">
          <div class="ui inverted button"><i class="fas fa-plus"></i> 添加文件</div>
          <input type="file" id="mediaFile" v-on:click="showMediaFile">
          <div class="description" id="mediaFileUrl">未选择任何文件</div>
        </div>
      </div>
      <div class="ui sgfield">
        <div class="header">文件</div>
        <div class="ui file sgfield">
          <div class="ui inverted button"><i class="fas fa-plus"></i> 添加文件</div>
          <input type="file" id="file" v-on:click="showFile">
          <div class="description" id="fileUrl">未选择任何文件</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"FileComponent",
  methods: {
    showMediaFile: function(){
      var file = $('#mediaFile'),
      aim = $('#mediaFileUrl');
      file.on('change', function( e ){
          var name = e.currentTarget.files[0].name;
          if(name.length>20){
           var str = name.substr(0,20)+"...";
            aim.text( str ).css("color","#4a90e2");
          }else{
            aim.text( name ).css("color","#4a90e2");
          }

      });
    },
    showFile: function(){
      var file = $('#file'),
      aim = $('#fileUrl');
      file.on('change', function( e ){
          var name = e.currentTarget.files[0].name;
          if(name.length>20){
           var str = name.substr(0,20)+"...";
            aim.text( str ).css("color","#4a90e2");
          }else{
            aim.text( name ).css("color","#4a90e2");
          }
      });
    }
  }
}
</script>

<style scoped>

</style>
