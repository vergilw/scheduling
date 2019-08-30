<template>
  <div class="ui sgfield">
    <!-- <div class="header">{{label}}</div>
    <div v-if="itemArray" class="ui sginput">
      <select class="ui dropdown" v-on:change="showCourseware()" v-model="selected">
        <option value></option>
        <option v-for="item in itemArray" v-bind:value="item" v-bind:key="item.id">{{item.name}}</option>
      </select>
    </div>-->
    <SelectComponent
      v-bind:label="label"
      v-bind:name="name"
      newText="新增子课程"
      v-bind:itemsArray="itemArray"
      v-bind:isRequired="true"
      v-on:onNewOption="onNewOption"
      v-on:onChangeOption="onChangeOption"
      ref="child"
    />
    <div v-if="index != null" class="ui config sgfield">
      <a v-on:click="closeSgfield">
        <i class="fas fa-times"></i>
      </a>
      <a href="#">
        <i class="icon primary edit"></i>
      </a>
      <table>
        <tbody>
          <tr>
            <td>课程名称</td>
            <td>{{ itemArray[index].name }}</td>
          </tr>
          <tr>
            <td>文件资料</td>
            <td>
              <a
                v-bind:href="itemArray[index].file.url"
                v-bind:download="itemArray[index].file.name"
              >{{ itemArray[index].file.name }}</a>
            </td>
          </tr>
          <tr>
            <td>配课老师</td>
            <td>{{ itemArray[index].teacher.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="inline fields">
      <div class="ui sgfield">
        <div class="header">媒体资料</div>
        <div class="ui file sgfield">
          <div class="ui inverted button"><i class="fas fa-plus"></i>添加文件</div>
          <input type="file" id="mediaFile" v-on:click="showMediaFile">
          <div class="description" id="mediaFileUrl">未选择任何文件</div>
        </div>
      </div>
      <div class="ui sgfield">
        <div class="header">文件</div>
        <div class="ui file sgfield">
          <div class="ui inverted button"><i class="fas fa-plus"></i>添加文件</div>
          <input type="file" id="file" v-on:click="showFile">
          <div class="description" id="fileUrl">未选择任何文件</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectComponent from "./form-components/select-component.vue";

export default {
  name: "CoursewareTable",
  data: function() {
    return {
      index: null,
      value: ""
    }
  },
  props: {
    label: String,
    itemArray: Array,
    name: String,
    isRequired: Boolean
  },
  methods: {
    onChangeOption: function(name, index) {
      console.log(index);
      this.index = index;
      $(".ui.config.sgfield").css("display", "block");
    },
    closeSgfield: function(index) {
      $(".ui.config.sgfield").css("display", "none");
      // this.index=null;
      // console.log(this.index);
      // $(".field > .ui.dropdown > .text").html("");
      this.$refs.child.changeValue(this.value);
    },
    onNewOption: function(name) {
      console.log(name);
      $(".ui.modal:not(.period-course)").dimmer("show");
      $(".ui.modal.period-course").dimmer("hide");
      $(".ui.modal.period-course")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHide: function() {
            $(".page.dimmer > .ui.active.modal:nth-last-child(2)").dimmer("hide");
          }
        })
        .modal("show");
    },
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
  },
  mounted: function() {
    $(".ui.sgfield .ui.dropdown").dropdown();
  },
  components: {
    SelectComponent
  },
  // updated: function(){
  //   $(".ui.config.sgfield > a > svg").click(function(){
  //     alert(11);
  //   })
  // }
};
</script>

<style scoped>
.ui.config.sgfield {
  width: 100%;
  min-width: 320px;
  background: #f6f8fa;
  border-radius: 4px;
  position: relative;
  margin-top: 20px;
  /* display: none; */
}

.ui.config.sgfield > a > svg {
  top: 6px;
  color: #9199a3;
  font-size: 14px;
  position: absolute;
  right: 14px;
}

.ui.config.sgfield > a > i {
  bottom: 10px;
  font-size: 14px;
  position: absolute;
  right: 6px;
}

.ui.config.sgfield > table {
  border-radius: 4px;
  padding: 15px 20px 10px 14px;
}

.ui.config.sgfield > table tr {
  width: 100%;
  height: 22px;
}

.ui.config.sgfield > table tr td {
  padding: 0px;
  font-size: 14px;
}

.ui.config.sgfield > table tr td:first-child {
  width: 16%;
  text-align-last: justify;
  white-space: nowrap;
  vertical-align: text-top;
  position: relative;
  color: #9199a3;
}

.ui.config.sgfield > table tr td:first-child:after {
  content: ":";
  position: absolute;
}

.ui.config.sgfield > table tr td:last-child {
  padding-left: 10px;
  color: #4b525a;
}

.ui.file.sgfield > .description {
  width: 50%;
}
.ui.file.sgfield > .ui.button {
  width: 115px;
}
</style>
