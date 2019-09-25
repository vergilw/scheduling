<template>
  <div class="ui modal dimmable lesson-time">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加课程时间</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <TimeComponent
          name="time"
          label="课程时间"
          :start-time="startTime"
          @changeStartTime="startTime = $event"
          :end-time="endTime"
          @changeEndTime="endTime = $event"
          />
        <div class="action">
          <div class="ui submit button">确定</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TimePicker from "timepicker.js";
import TimeComponent from '../form-components/time-component.vue';

export default {
  name: "LessonTimeForm",
  computed: {
    startTime: {
      get() {
        return this.$store.state.lessonTimeForm.startTime;
      },
      set(value) {
        this.$store.commit("lessonTimeForm/updateStartTime", value);
      }
    },
    endTime: {
      get() {
        return this.$store.state.lessonTimeForm.endTime;
      },
      set(value) {
        this.$store.commit("lessonTimeForm/updateEndTime", value);
      }
    }
  },
  components: {
    TimeComponent
  },
  updated: function() {
    let component = this;
    $(".ui.modal.lesson-time .ui.form").form({
      fields: {
        startTime: {
          identifier: "start-time",
          rules: [
            {
              type: "empty",
              prompt: "开始时间不能为空"
            }
          ]
        },
        endTime: {
          identifier: "end-time",
          rules: [
            {
              type: "empty",
              prompt: "结束时间不能为空"
            }
          ]
        }
      },
      onSuccess: function(event, fields) {
        if(component.$store.state.lessonTimeForm.lessonTimeID) {
          component.$store.dispatch("lessonTimeForm/patchLessonTime", function () {
            component.$store.dispatch("global/getClassTime");
          });
        } else {
          component.$store.dispatch("lessonTimeForm/putLessonTime", function () {
            component.$store.dispatch("global/getClassTime");
          });
        }

        $(".ui.modal.lesson-time").modal("hide");

        component.$store.commit("lessonTimeForm/reset");
        $(".ui.modal.lesson-time .ui.form").form("clear");

        return false;
      },
      onFailure: function(formErrors, fields) {
        return false;
      }
    });
  }
};
</script>

<style src='timepicker.js/dist/timepicker.min.css'>
/* global styles */
</style>

<style scoped>
.ui.modal > .fa-times {
  width: 72px;
  height: 72px;
  top: 0;
  right: 0;
  padding: 25px;
  color: #9199a3;
}

.ui.modal > .content {
  background-color: unset;
}

::-webkit-scrollbar {
  display: none;
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

@media only screen and (min-width: 1920px) {
  .ui.modal:not(.fullscreen) {
    width: 620px;
    margin: 0;
  }
}

@media only screen and (min-width: 1200px) {
  .ui.modal:not(.fullscreen) {
    width: 570px;
    margin: 0;
  }
}
@media only screen and (min-width: 992px) {
  .ui.modal:not(.fullscreen) {
    width: 520px;
    margin: 0;
  }
}
@media only screen and (min-width: 768px) {
  .ui.modal:not(.fullscreen) {
    width: 35%;
    margin: 0;
  }
}
</style>
