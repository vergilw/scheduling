<template>
      <div class="ui sgfield">
        <div class="header">{{label}}</div>
        <div class="ui file sgfield" :id="id">
          <div class="ui inverted button"><i class="fas fa-plus"></i> 添加文件</div>
          <input type="file" v-bind:name="name" v-bind:value="value" v-on:input="$emit('input',$event.target.value)" v-on:click="showFile">
          <div class="description">未选择任何文件</div>
        </div>
      </div>
</template>
<script>
export default {
  name:"FileComponent",
  props: {
    label:String,
    name:String,
    value:String,
    id:String,
  },
  methods: {
    showFile: function(){
      if(this.id == "file"){
        var file = $('#file > input'),
        aim = $('#file > .description');
        console.log(this.id);
        file.on('change', function( e ){
            var name = e.currentTarget.files[0].name;
            if(name.length>20){
            var str = name.substr(0,20)+"...";
              aim.text( str ).css("color","#4a90e2");
            }else{
              aim.text( name ).css("color","#4a90e2");
            }
        });
      }else if(this.id == 'media_file'){
        var file = $('#media_file > input'),
        aim = $('#media_file > .description');
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
}
</script>

<style scoped>

</style>
