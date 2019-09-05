<template>
      <div class="ui sgfield">
        <div class="header">{{label}}</div>
        <div class="ui file sgfield">
          <div class="ui inverted button"><i class="fas fa-plus"></i> 添加文件</div>
          <input type="file" v-bind:name="name" v-bind:value="value" v-on:input="$emit('input',$event.target.value)" id="mediaFile" v-on:click="showMediaFile">
          <div class="description" id="mediaFileUrl">未选择任何文件</div>
        </div>
      </div>
</template>
<script>
export default {
  name:"MediaFileComponent",
  props: {
    label:String,
    name:String,
    value:String,
  },
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
  }
}
</script>

<style scoped>

</style>
