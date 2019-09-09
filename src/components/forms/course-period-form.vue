<template>
  <div class="ui modal dimmable course-period">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加配置</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
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
        <SelectComponent
          label="老师"
          name="teacher"
          v-bind:itemsArray="teacherModels"
          v-bind:isRequired="true"
          v-bind:value="teacherIndex"
          v-on:input="teacherIndex = $event"
        />
        <div class="action">
          <div class="ui submit button">确定</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SelectComponent from "../form-components/select-component.vue";
import InputComponent from "../form-components/input-component.vue";

export default {
  name: "CourseForm",
  data: function() {
    return {};
  },
  computed: {
    roomModels: function() {
      return this.$store.state.global.roomModels;
    },
    crowdModels: function() {
      return this.$store.state.global.crowdModels;
    },
    teacherModels: function() {
      return this.$store.state.global.teacherModels;
    },

    roomIndex: {
      get() {
        return this.$store.state.coursePeriodForm.roomIndex;
      },
      set(value) {
        this.$store.commit("coursePeriodForm/updateRoomIndex", value);
      }
    },
    crowdIndex: {
      get() {
        return this.$store.state.coursePeriodForm.crowdIndex;
      },
      set(value) {
        this.$store.commit("coursePeriodForm/updateCrowdIndex", value);
      }
    },
    teacherIndex: {
      get() {
        return this.$store.state.coursePeriodForm.teacherIndex;
      },
      set(value) {
        this.$store.commit("coursePeriodForm/updateTeacherIndex", value);
      }
    }
  },
  components: {
    SelectComponent,
    InputComponent
  },
  methods: {
    onNewOption: function(name) {
      $(".ui.active.dimmable.modal:not(.room)").dimmer("show");
      $(".ui.active.dimmable.modal:not(.room):last-child").dimmer({
        onHide: function() {
          $(".ui.modal.room").modal("hide");
        }
      });
      $(".ui.modal.room").dimmer("hide");

      var element = this.$el;
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
  },
  updated: function() {
    var component = this;
    $(".ui.modal.course-period .ui.form").form({
      fields: {
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
          console.log("add config");
        var itemData = [
          {
            key: '教室',
            value: component.$store.state.global.roomModels[component.$store.state.coursePeriodForm.roomIndex].name,
            data: component.$store.state.coursePeriodForm.roomIndex
          },
          {
            key: '班级',
            value: component.$store.state.global.crowdModels[component.$store.state.coursePeriodForm.crowdIndex].name,
            data: component.$store.state.coursePeriodForm.crowdIndex
          },
          {
            key: '老师',
            value: component.$store.state.global.teacherModels[component.$store.state.coursePeriodForm.teacherIndex].name,
            data: component.$store.state.coursePeriodForm.teacherIndex
          }
        ]
        component.$store.commit("schedulesForm/updatePeriodItem", {positionIndex: component.$store.state.coursePeriodForm.positionIndex, itemData: itemData});

        $(".ui.modal.course-period").modal("hide");

        component.$store.commit("coursePeriodForm/reset");
        $(".ui.modal.course-period .ui.form").form('clear');

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
