<template>
  <div class="ui modal dimmable course">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加课程</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <InputComponent
          label="课程标题"
          name="courseTitle"
          v-bind:value="courseTitle"
          v-bind:isRequired="true"
        />
        <SelectComponent
          label="课类"
          name="type"
          v-bind:itemsArray="courseTypeModels"
          v-bind:isRequired="true"
        />
        <SelectComponent
          label="教室"
          name="room"
          newText="新增教室"
          v-bind:itemsArray="roomModels"
          v-bind:isRequired="true"
          v-on:onNewOption="onNewOption"
          v-on:onChangeOption="onChangeOption"
        />
        <SelectComponent
          label="班级"
          name="crowd"
          v-bind:itemsArray="crowdModels"
          v-bind:isRequired="true"
        />
        <SelectComponent
          label="老师"
          name="teacher"
          v-bind:itemsArray="teacherModels"
          v-bind:isRequired="true"
        />
        <InputComponent
          label="限制人数"
          name="limitCapacity"
          v-bind:value="limitCapacity"
          v-bind:isRequired="true"
        />
        <InputComponent
          v-bind:isMultipleLines="true"
          label="备注"
          name="note"
          v-bind:value="limitCapacity"
        />
        <Courseware  label="子课程" name="courseware" v-bind:itemArray="coursewareModels"></Courseware>
        <div class="action">
          <div v-on:click="onSubmit" class="ui submit button">确定</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SelectComponent from "./form-components/select-component.vue";
import InputComponent from "./form-components/input-component.vue";
import Courseware from "./courseware-table.vue";

export default {
  name: "CourseForm",
  data: function() {
    return {
      courseTitle: null,
      limitCapacity: null
    };
  },
  computed: {
    roomModels: function() {
      return [this.$store.state.roomModels];
    },
    crowdModels: function() {
      return [this.$store.state.crowdModels];
    },
    teacherModels: function() {
      return [this.$store.state.teacherModels];
    },
    courseTypeModels: function() {
      return [
        this.$store.state.majorCourseTypeModels,
        this.$store.state.minorCourseTypeModels
      ];
    },
    coursewareModels: function() {
      return [this.$store.state.coursewareModels];
    },
  },
  components: {
    SelectComponent,
    InputComponent,
    Courseware
  },
  methods: {
    onChangeOption: function(name, index) {
      console.log(index);
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
    onSubmit: function() {
      $(".ui.form").form({
        fields: {
          courseTitle: "empty",
          type: "empty",
          name: "empty",
          room: "empty",
          crowd: "empty",
          teacher: "empty",
          limitCapacity: "empty"
        }
      });

      if ($(".ui.form").form("is valid")) {
        console.log("true");
      } else {
        console.log("false");
      }
    }
  }
};


</script>

<style scoped>
.ui.modal > .fa-times {
  width: 72px;
  height: 72px;
  top: 0;
  right: 0;
  padding: 25px;
}

.ui.modal > .content > .ui.form {
  margin: auto;
  max-width: 420px;
}

.ui.form > .action {
  width: 100%;
  text-align: center;
}

.ui.form > .action > .ui.submit.button {
  color: white;
  background-color: #00cddd;
  box-shadow: 0px 2px 11px 0px rgba(0, 205, 221, 0.2);
  border-radius: 4px;
}
</style>
