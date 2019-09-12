<template>
  <table class="ui celled table">
    <thead>
      <tr>
        <th></th>
        <th
          v-if="scheduleModels && scheduleModels.length > 0"
        >{{ weekDateFormat(scheduleModels[0].date, '周一(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels && scheduleModels.length > 1"
        >{{ weekDateFormat(scheduleModels[1].date, '周二(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels && scheduleModels.length > 2"
        >{{ weekDateFormat(scheduleModels[2].date, '周三(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels && scheduleModels.length > 3"
        >{{ weekDateFormat(scheduleModels[3].date, '周四(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels && scheduleModels.length > 4"
        >{{ weekDateFormat(scheduleModels[4].date, '周五(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels && scheduleModels.length > 5"
        >{{ weekDateFormat(scheduleModels[5].date, '周六(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels && scheduleModels.length > 6"
        >{{ weekDateFormat(scheduleModels[6].date, '周日(mm月dd日)') }}</th>
      </tr>
    </thead>

    <tbody v-if="scheduleModels && scheduleModels.length > 0">
      <tr v-for="(timeItem, index) in scheduleModels[0]['time_items']" v-bind:key="timeItem['id']" :time-item-id="timeItem['id']">
        <td>
          <div class="content">{{ timeRangeDateFormat(timeItem['start_at'], timeItem['end_at']) }}</div>
        </td>
        <td :date-value="scheduleModels[0].date">
          <div
            class="content"
            v-bind:class="{expired: isExpired(0)}"
            v-if="scheduleModels && scheduleModels.length > 0"
          >
            <Course
              v-for="course in scheduleModels[0]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
            <div class="new" v-if="!isExpired(0)" v-on:click="onNewCourseSchedule">
              <i class="fas fa-plus"></i>
              添加课程
            </div>
          </div>
        </td>
        <td :date-value="scheduleModels[1].date">
          <div
            class="content"
            v-bind:class="{expired: isExpired(1)}"
            v-if="scheduleModels && scheduleModels.length > 1"
          >
            <Course
              v-for="course in scheduleModels[1]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
            <div class="new" v-if="!isExpired(1)" v-on:click="onNewCourseSchedule">
              <i class="fas fa-plus"></i>
              添加课程
            </div>
          </div>
        </td>
        <td :date-value="scheduleModels[2].date">
          <div
            class="content"
            v-bind:class="{expired: isExpired(2)}"
            v-if="scheduleModels && scheduleModels.length > 2"
          >
            <Course
              v-for="course in scheduleModels[2]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
            <div class="new" v-if="!isExpired(2)" v-on:click="onNewCourseSchedule">
              <i class="fas fa-plus"></i>
              添加课程
            </div>
          </div>
        </td>
        <td :date-value="scheduleModels[3].date">
          <div
            class="content"
            v-bind:class="{expired: isExpired(3)}"
            v-if="scheduleModels && scheduleModels.length > 3"
          >
            <Course
              v-for="course in scheduleModels[3]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
            <div class="new" v-if="!isExpired(3)" v-on:click="onNewCourseSchedule">
              <i class="fas fa-plus"></i>
              添加课程
            </div>
          </div>
        </td>
        <td :date-value="scheduleModels[4].date">
          <div
            class="content"
            v-bind:class="{expired: isExpired(4)}"
            v-if="scheduleModels && scheduleModels.length > 4"
          >
            <Course
              v-for="course in scheduleModels[4]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
            <div class="new" v-if="!isExpired(4)" v-on:click="onNewCourseSchedule">
              <i class="fas fa-plus"></i>
              添加课程
            </div>
          </div>
        </td>
        <td :date-value="scheduleModels[5].date">
          <div
            class="content"
            v-bind:class="{expired: isExpired(5)}"
            v-if="scheduleModels && scheduleModels.length > 5"
          >
            <Course
              v-for="course in scheduleModels[5]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
            <div class="new" v-if="!isExpired(5)" v-on:click="onNewCourseSchedule">
              <i class="fas fa-plus"></i>
              添加课程
            </div>
          </div>
        </td>
        <td :date-value="scheduleModels[6].date">
          <div
            class="content"
            v-bind:class="{expired: isExpired(6)}"
            v-if="scheduleModels && scheduleModels.length > 6"
          >
            <Course
              v-for="course in scheduleModels[6]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
            <div class="new" v-if="!isExpired(6)">
              <i class="fas fa-plus"></i>
              添加课程
            </div>
          </div>
        </td>
      </tr>
    </tbody>

    <div
      class="ui inverted dimmer"
      v-bind:class="{active: this.$store.state.schedule.scheduleLoading}"
    >
      <div class="ui loader"></div>
    </div>
  </table>
</template>

<script>
import Course from "./course-card.vue";
var dateFormat = require("dateformat");
import Sortable from "sortablejs";

export default {
  name: "WeekTable",
  computed: {
    weekStart: function() {
      return new Date(this.$store.state.schedule.weekStart.getTime());
    },
    scheduleModels: function() {
      return this.$store.state.schedule.scheduleModels;
    }
  },
  methods: {
    weekDateFormat: function(date, string) {
      return dateFormat(date, string);
    },
    timeRangeDateFormat: function(dateStart, dateEnd) {
      return (
        dateFormat(dateStart, "HH:MM") + " - " + dateFormat(dateEnd, "HH:MM")
      );
    },
    isExpired: function(additionalDays) {
      var comparedDate = new Date(
        this.weekStart.getTime() + 3600 * 24 * 1000 * additionalDays
      );
      return new Date() > comparedDate;
    },
    onNewCourseSchedule: function(event) {
      
      var element = $(event.target).parent().parent();
      var date = new Date(element.attr('date-value'));
      var timeItemID = element.parent().attr('time-item-id');
      this.$store.commit("scheduleForm/updateScheduleTime", {date: date, timeItemID: timeItemID});

      $(".ui.modal.schedule").dimmer("hide");
      $(".ui.modal.schedule")
        .modal({ autofocus: false, allowMultiple: true })
        .modal("show");
    }
  },
  updated: function() {
    var courseContainerElements = $(
      "table > tbody > tr > td  > .content:not(:eq(0))"
    );
    for (var i = 0; i < courseContainerElements.length; ++i) {
      Sortable.create(courseContainerElements[i], {
        group: "course-group",
        animation: 150,
        draggable: '.course'
      });
    }
  },
  components: {
    Course
  },
  // created: function() {
  //   this.$store.dispatch("schedule/getSchedule");
  //   this.$store.dispatch("global/getCourses");
  //   this.$store.dispatch("global/getRooms");
  //   this.$store.dispatch("global/getCrowds");
  //   this.$store.dispatch("global/getTeachers");
  //   this.$store.dispatch("global/getCourseTypes");
  //   this.$store.dispatch("global/getClassTime");
  // }
};
</script>

<style scoped>
/* common */

.ui.table tr td:first-child {
  background-color: white;
}

.ui.table tr th,
.ui.table tr td {
  text-align: center;
}

/* thead */
.ui.table > thead > tr {
  height: 65px;
  font-size: 14px;
}

/* tbody */
.ui.table > tbody > tr > td:first-child {
  font-size: 14px;
  width: 120px;
}

.ui.table > tbody > tr:last-child > td:first-child {
  border-bottom-left-radius: 8px;
}

.ui.table > tbody > tr > td:not(:first-child) {
  padding: 0;
}

.ui.table > tbody > tr > td:not(:first-child) > div {
  min-height: 185px;
}

.ui.table > tbody > tr:last-child > td:last-child {
  border-bottom-right-radius: 8px;
}

.ui.table > tbody {
  background-color: #f6f8fa;
}

.ui.table > tbody > tr > td > .expired.content > .course {
  background-color: #f6f8fa;
  color: #9199a3;
}

.ui.table > tbody > tr > td > .content > .new {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 145px;
  background-color: #f0f4f6;
  font-size: 12px;
	color: #9199a3;
  cursor: pointer;
}

.ui.table > tbody > tr > td > .content > .new > svg {
  margin: 20px auto;
  font-size: 36px;
  color: #d2d9df;
  display: block;
  text-align: center;

}

/* unset */
.ui.table {
  border: unset;
  background-color: unset;
}

.ui.table > thead > tr > th {
  background: unset;
}

/* course */
.ui.table > tbody > tr > td:not(:first-child) > .content {
  margin: 10px;
}

.ui.table > tbody > tr > td > .content > .course {
  margin: 10px 0;
}
</style>
