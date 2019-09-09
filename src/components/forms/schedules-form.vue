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
        <InputComponent
          label="限制人数"
          name="capacity"
          v-bind:isRequired="true"
          v-bind:value="capacity"
          v-on:input="capacity = $event"
        />
        <DateInterval
          label="时间区间"
          :startDate="startDate"
          :endDate="endDate"
          @inputStartDate="startDate = $event"
          @inputEndDate="endDate = $event"
        />
<!--        <ItemsComponent-->
<!--          name="period"-->
<!--          label="课程时间配置"-->
<!--          :itemsArray="courseConfigModels"-->
<!--          v-on:onNewItem="onNewItem"-->
<!--          v-on:onDeleteItem="onDeleteItem"-->
<!--          v-on:onUpdateItem="onUpdateItem"-->
<!--        />-->

        <CourseTimeConfig/>

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
import ItemsComponent from "../form-components/items-component.vue";
import CourseTimeConfig from "../course-time-config.vue";

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
    capacity: {
      get() {
        return this.$store.state.schedulesForm.capacity;
      },
      set(value) {
        this.$store.commit("schedulesForm/updateCapacity", value);
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
    ItemsComponent,
    CourseTimeConfig,
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
    onNewItem: function(name) {
      if (name == "period") {
        var element = this.$el;
        var component = this;

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
              component.$store.commit("coursePeriodForm/reset");
              $(".ui.modal.course-period .ui.form").form('clear');
            }
          })
          .modal("show");
      }
    },
    onDeleteItem: function(name, index) {
      if (name == "period") {
        this.$store.commit("schedulesForm/deletePeriodItem", index);
      }
    },
    onUpdateItem: function(name, index) {
      if (name == "period") {
        var itemData = {
          positionIndex: index,
          roomIndex: this.$store.state.schedulesForm.periodItems[index][0].data,
          crowdIndex: this.$store.state.schedulesForm.periodItems[index][1].data,
          teacherIndex: this.$store.state.schedulesForm.periodItems[index][2].data
        }
        this.$store.commit("coursePeriodForm/assign", itemData);

        var element = this.$el;
        var component = this;

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
              component.$store.commit("coursePeriodForm/reset");
              $(".ui.modal.course-period .ui.form").form('clear');
            }
          })
          .modal("show");
      }
    }
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
        },
        capacity: {
          identifier: "capacity",
          rules: [
            {
              type: "regExp[/^[1-9]{1}[0-9]*$/]",
              prompt: "限制人数必须为有效数字"
            }
          ]
        }
      },
      onSuccess: function(event, fields) {
        component.$store.commit("schedulesForm/updateFormLoading", true);

        setTimeout(function() {
          component.$store.commit("schedulesForm/updateFormLoading", false);
        }, 2000);
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
