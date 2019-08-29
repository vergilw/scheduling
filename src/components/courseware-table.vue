<template>
  <div class="ui sgfield">
    <!-- <div class="header">{{label}}</div>
    <div v-if="itemArray" class="ui sginput">
      <select class="ui dropdown" v-on:change="showCourseware()" v-model="selected">
        <option value></option>
        <option v-for="item in itemArray" v-bind:value="item" v-bind:key="item.id">{{item.name}}</option>
      </select>
    </div> -->
    <SelectComponent v-bind:label="label"
          v-bind:name="name"
          v-bind:itemsArray="itemArray"
          v-bind:isRequired="true"
          v-bind:onChangeOption="onChangeOption" />

    <div v-if="selected" class="ui config sgfield">
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
            <td>{{ selected.name }}</td>
          </tr>
          <tr>
            <td>文件资料</td>
            <td>
              <a
                v-bind:href="selected.file"
                v-bind:download="selected.file"
              >{{ selected.file['name'] }}</a>
            </td>
          </tr>
          <tr>
            <td>配课老师</td>
            <td>{{ selected.teacher }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SelectComponent from './form-components/select-component.vue';

export default {
  name: "CoursewareTable",
  data() {
    return {
      index: null
    };
  },

  props: {
    label: String,
    itemArray: Array,
    name: String,
    isRequired: Boolean
  },
  methods: {
    closeSgfield: function() {
      $(".ui.config.sgfield").css("display", "none");
      $(".ui.sgfield > .ui.sginput > .ui.dropdown > .text").html("请选择");
      $(".ui.sgfield > .ui.sginput > .ui.dropdown option").val("");
    },
    showCourseware() {
      $(".ui.config.sgfield").css("display", "block");
    },
    onChangeOption: function(name, index) {
      console.log(index);
    }
  },
  mounted: function() {
    $(".ui.sgfield .ui.dropdown").dropdown({
      onChange: function(value, text, $choice) {
        console.log($choice);
      }
    });
  },
  components: {
    SelectComponent
  }
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
  right: 12px;
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
</style>
