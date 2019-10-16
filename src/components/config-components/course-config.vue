<template>
  <ConfigComponent
    label="课程安排配置"
    button="添加配置"
    :isRequired="true"
    :itemArray="courseConfigModels"
    @addConfig="addConfig"
    @remove="remove"
    @edit="edit"
  />
</template>

<script>
import ConfigComponent from "../form-components/config-component.vue";

export default {
  name: "CourseConfig",
  props: {
    name: String
  },
  computed: {
    courseConfigModels: function() {
      return this.$store.state.schedulesForm.periodItems;
    }
  },
  components: {
    ConfigComponent
  },
  methods: {
    construct: function(item) {
      let arr = new Array();
      let time = new Object();
      time.key = item.time.key;
      time.value = initCourseTime2(item.time.value);
      arr.push(time);

      let room = new Object();
      room.key = item.room.key;
      room.value = item.room.value;
      arr.push(room);

      let crowd = new Object();
      crowd.key = item.crowd.key;
      crowd.value = item.crowd.value;
      arr.push(crowd);

      let teacher = new Object();
      teacher.key = item.teacher.key;
      teacher.value = item.teacher.value;
      arr.push(teacher);

      return arr;
    },
    addConfig: function() {
      //crowd default value by filter
      if (
        this.$store.state.coursePeriodForm.crowdIndex === null &&
        this.$store.state.schedule.crowdIndex !== null
      ) {
        this.$store.commit(
          "coursePeriodForm/updateCrowdIndex",
          this.$store.state.schedule.crowdIndex
        );
      }

      //teacher default value by filter
      if (
        this.$store.state.coursePeriodForm.teacherIndex === null &&
        this.$store.state.schedule.teacherIndex !== null
      ) {
        this.$store.commit(
          "coursePeriodForm/updateTeacherIndex",
          this.$store.state.schedule.teacherIndex
        );
        console.log('aha');
      }

      //room default value by filter
      if (
        this.$store.state.coursePeriodForm.roomIndex === null &&
        this.$store.state.schedule.roomIndex !== null
      ) {
        this.$store.commit(
          "coursePeriodForm/updateRoomIndex",
          this.$store.state.schedule.roomIndex
        );
      }

      var element = this.$parent.$el;
      var component = this.$parent;

      $(".ui.active.dimmable.modal:not(.course-period)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.course-period").modal("hide");
        }
      });

      $(".ui.modal.course-period")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            // component.$store.commit("coursePeriodForm/reset");
            // $(".ui.modal.course-period .ui.form").form("clear");
          }
        })
        .modal("show");
    },
    remove: function(index) {
      this.$store.commit("schedulesForm/deletePeriodItem", index);
    },
    edit: function(index) {
      console.log(this.$store.state.schedulesForm.periodItems[index][0].data);
      var itemData = {
        positionIndex: index,
        periodItems: this.$store.state.schedulesForm.periodItems[index][0].data,
        roomIndex: this.$store.state.schedulesForm.periodItems[index][1].data,
        crowdIndex: this.$store.state.schedulesForm.periodItems[index][2].data,
        teacherIndex: this.$store.state.schedulesForm.periodItems[index][3].data
      };
      this.$store.commit("coursePeriodForm/assign", itemData);

      var element = this.$parent.$el;
      var component = this.$parent;

      $(".ui.active.dimmable.modal:not(.course-period)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.course-period").modal("hide");
        }
      });

      $(".ui.modal.course-period")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            // component.$store.commit("coursePeriodForm/reset");
            // $(".ui.modal.course-period .ui.form").form("clear");
          }
        })
        .modal("show");
    }
  }
};

function initCourseTime2(time) {
  let timeArr = new Array();

  if (time.length > 0) {
    time.forEach(function(timeItem) {
      let intervals = "";
      timeItem["intervals"].forEach(function(interval) {
        intervals += " / " + interval["duration"];
      });
      let timeStr = timeItem["week"] + intervals;
      timeArr.push(timeStr);
    });
  }

  return timeArr;
}
</script>

<style scoped>
</style>
