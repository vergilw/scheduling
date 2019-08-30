<template>
  <div class="field">
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
    closeSgfield: function(value) {
      $(".ui.config.sgfield").css("display", "none");
      this.$refs.child.changeValue(this.value);
    },
    onNewOption: function(name) {
      console.log(name);
      $(".ui.modal:not(.period-subcourse)").dimmer("show");
      $(".ui.modal.period-subcourse").dimmer("hide");
      $(".ui.modal.period-subcourse")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHide: function() {
            $(".page.dimmer > .ui.active.modal:nth-last-child(2)").dimmer("hide");
          }
        })
        .modal("show");
    },
  },
  mounted: function() {
    $(".ui.sgfield .ui.dropdown").dropdown();
  },
  components: {
    SelectComponent
  },
};
</script>

<style scoped>
.ui.config.sgfield {
  margin-top: 20px;
}
.ui.config.sgfield > a:first-child {
  display:inline-block;
  padding: 5px;
  position: absolute;
  right: 10px;
  top: 3px;
}
.ui.config.sgfield > a > svg {
  color: #9199a3;
  font-size: 14px;
}
.ui.config.sgfield > a > svg:hover {
  color: #4b525a;
}

.ui.config.sgfield > a > i {
  font-size: 14px;
  position: absolute;
  right: 6px;
}

</style>
