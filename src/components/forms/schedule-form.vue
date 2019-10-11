<template>
  <div class="ui modal dimmable schedule">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加课表</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <SelectComponent
          label="课程"
          name="course"
          newText="添加课程"
          v-bind:itemsArray="courseModels"
          v-bind:isRequired="true"
          v-on:onNewOption="onNewOption"
          v-bind:value="courseIndex"
          v-on:input="courseIndex = $event"
        />
        <SelectComponent
          label="教室"
          name="room"
          newText="新增教室"
          v-bind:itemsArray="roomModels"
          v-bind:isRequired="true"
          v-on:onNewOption="onNewOption"
          v-bind:value="roomIndex"
          v-on:input="roomIndex = $event"
        />
        <SelectComponent
          label="班级"
          name="crowd"
          v-bind:itemsArray="crowdModels"
          v-bind:isRequired="true"
          v-bind:value="crowdIndex"
          v-on:input="crowdIndex = $event"
        />
        <TransferStudentsConfig />
        <SelectComponent
          label="老师"
          name="teacher"
          v-bind:itemsArray="teacherModels"
          v-bind:isRequired="true"
          v-bind:value="teacherIndex"
          v-on:input="teacherIndex = $event"
        />
        <InputComponent
          v-bind:isMultipleLines="true"
          label="备注"
          name="note"
          v-bind:value="note"
          v-on:input="note = $event"
        />

        <div class="ui error message"></div>
        <div class="action">
          <div class="ui submit button">确定</div>
        </div>
      </form>
      <div class="ui inverted dimmer" v-bind:class="{active: formLoading}">
        <div class="ui loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectComponent from "../form-components/select-component.vue";
import InputComponent from "../form-components/input-component.vue";
import TransferStudentsConfig from "../config-components/transfer-students-config.vue";

export default {
  name: "ScheduleForm",
  computed: {
    formLoading: function() {
      return this.$store.state.scheduleForm.formLoading;
    },
    courseModels: function() {
      return this.$store.state.global.courseModels;
    },
    roomModels: function() {
      return this.$store.state.global.roomModels;
    },
    crowdModels: function() {
      return this.$store.state.global.crowdModels;
    },
    teacherModels: function() {
      return this.$store.state.global.teacherModels;
    },

    courseIndex: {
      get() {
        return this.$store.state.scheduleForm.courseIndex;
      },
      set(value) {
        this.$store.commit("scheduleForm/updateCourseIndex", value);
      }
    },
    roomIndex: {
      get() {
        return this.$store.state.scheduleForm.roomIndex;
      },
      set(value) {
        this.$store.commit("scheduleForm/updateRoomIndex", value);
      }
    },
    crowdIndex: {
      get() {
        return this.$store.state.scheduleForm.crowdIndex;
      },
      set(value) {
        this.$store.commit("scheduleForm/updateCrowdIndex", value);
      }
    },
    teacherIndex: {
      get() {
        return this.$store.state.scheduleForm.teacherIndex;
      },
      set(value) {
        this.$store.commit("scheduleForm/updateTeacherIndex", value);
      }
    },
    note: {
      get() {
        return this.$store.state.scheduleForm.note;
      },
      set(value) {
        this.$store.commit("scheduleForm/updateNote", value);
      }
    }
  },
  components: {
    SelectComponent,
    InputComponent,
    TransferStudentsConfig
  },
  methods: {
    onNewOption: function(name) {
      if (name === "course") {
        var element = this.$el;
        var component = this.$parent;

        $(".ui.active.dimmable.modal:not(.course)").dimmer("show");
        $(element).dimmer({
          onHide: function() {
            $(".ui.modal.course").modal("hide");
          }
        });

        $(".ui.modal.course")
          .modal({
            autofocus: false,
            allowMultiple: true,
            onHidden: function() {
              $(element).dimmer("hide");
              component.$store.commit("courseForm/reset");
              $(".ui.modal.course .ui.form").form("clear");
            }
          })
          .modal("show");
      } else if (name === "room") {
        var element = this.$el;

        $(".ui.active.dimmable.modal:not(.room)").dimmer("show");
        $(element).dimmer({
          onHide: function() {
            $(".ui.modal.room").modal("hide");
          }
        });

        $(".ui.modal.room")
          .modal({
            autofocus: false,
            allowMultiple: true,
            onHidden: function() {
              $(element).dimmer("hide");
            }
          })
          .modal("show");
      }
    }
  },
  updated: function() {
    var component = this;
    $(".ui.modal.schedule .ui.form").form({
      fields: {
        course: {
          identifier: "course",
          rules: [
            {
              type: "empty",
              prompt: "课程不能为空"
            }
          ]
        },
        room: {
          identifier: "room",
          rules: [
            {
              type: "empty",
              prompt: "教室不能为空"
            }
          ]
        },
        crowd: {
          identifier: "crowd",
          rules: [
            {
              type: "empty",
              prompt: "班级不能为空"
            }
          ]
        },
        teacher: {
          identifier: "teacher",
          rules: [
            {
              type: "empty",
              prompt: "老师不能为空"
            }
          ]
        }
      },
      onSuccess: function(event, fields) {
        if (component.$store.state.scheduleForm.scheduleID === null) {
          component.$store.dispatch("scheduleForm/putSchedule", function() {
            $(".ui.modal.schedule").modal("hide");
            component.$store.commit("scheduleForm/reset");
            $(".ui.modal.schedule .ui.form").form("clear");
          });
        } else {
          component.$store.dispatch(
            "scheduleForm/patchScheduleByID",
            function() {
              $(".ui.modal.schedule").modal("hide");
              component.$store.commit("scheduleForm/reset");
              $(".ui.modal.schedule .ui.form").form("clear");
            }
          );
        }

        return false;
      },
      onFailure: function(formErrors, fields) {
        return false;
      }
    });
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
</style>
