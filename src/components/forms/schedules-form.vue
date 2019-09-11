<template>
  <div class="ui modal dimmable schedules">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加周期课表</div>
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
        <DateInterval
          label="时间区间"
          name="date"
          :startDate="startDate"
          :endDate="endDate"
          @inputStartDate="startDate = $event"
          @inputEndDate="endDate = $event"
        />
        <CourseConfig
          name="courseConfig"
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
import Courseware from "../courseware-table.vue";
import DateInterval from "../date-interval.vue";
import CourseConfig from "../course-config.vue";

export default {
  name: "SchedulesForm",
  computed: {
    formLoading: function() {
      return this.$store.state.schedulesForm.formLoading;
    },
    courseModels: function() {
      return this.$store.state.global.courseModels;
    },
    courseConfigModels: function() {
      return this.$store.state.schedulesForm.periodItems;
    },

    courseIndex: {
      get() {
        return this.$store.state.schedulesForm.courseIndex;
      },
      set(value) {
        this.$store.commit("schedulesForm/updateCourseIndex", value);
      }
    },
    startDate: {
      get() {
        return this.$store.state.schedulesForm.startDate;
      },
      set(value) {
        this.$store.commit("schedulesForm/updateStartDate", value);
      }
    },
    endDate: {
      get() {
        return this.$store.state.schedulesForm.endDate;
      },
      set(value) {
        this.$store.commit("schedulesForm/updateEndDate", value);
      }
    },
  },
  components: {
    SelectComponent,
    InputComponent,
    DateInterval,
    CourseConfig,
  },
  methods: {
    onNewOption: function(name) {
      if (name === "course") {
        var element = this.$el;

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
            }
          })
          .modal("show");
      }
    },
  },
  updated: function() {
    var component = this;
    $(".ui.modal.schedules .ui.form").form({
      fields: {
        course: {
          identifier: "course",
          rules: [
            {
              type: "empty",
              prompt: "课程不能为空"
            }
          ]
        }
      },
      onSuccess: function(event, fields) {
        component.$store.dispatch("schedulesForm/putSchedules");
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
