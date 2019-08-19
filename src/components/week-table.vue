<template>
  <table class="ui celled table">
    <thead>
      <tr>
        <th></th>
        <th
          v-if="scheduleModels && scheduleModels.length > 0"
        >{{ weekDateFormat(scheduleModels[0].date, '周一(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels.length > 1"
        >{{ weekDateFormat(scheduleModels[1].date, '周二(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels.length > 2"
        >{{ weekDateFormat(scheduleModels[2].date, '周三(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels.length > 3"
        >{{ weekDateFormat(scheduleModels[3].date, '周四(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels.length > 4"
        >{{ weekDateFormat(scheduleModels[4].date, '周五(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels.length > 5"
        >{{ weekDateFormat(scheduleModels[5].date, '周六(mm月dd日)') }}</th>
        <th
          v-if="scheduleModels.length > 6"
        >{{ weekDateFormat(scheduleModels[6].date, '周日(mm月dd日)') }}</th>
      </tr>
    </thead>

    <tbody v-if="scheduleModels && scheduleModels.length > 0">
      <tr v-for="(timeItem, index) in scheduleModels[0]['time_items']" v-bind:key="timeItem['id']">
        <td>
          <div class="content">{{ timeRangeDateFormat(timeItem['start_at'], timeItem['end_at']) }}</div>
        </td>
        <td>
          <div class="content" v-if="scheduleModels && scheduleModels.length > 0">
            <Course
              v-for="course in scheduleModels[0]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
          </div>
        </td>
        <td>
          <div class="content" v-if="scheduleModels && scheduleModels.length > 1">
            <Course
              v-for="course in scheduleModels[1]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
          </div>
        </td>
        <td>
          <div class="content" v-if="scheduleModels && scheduleModels.length > 2">
            <Course
              v-for="course in scheduleModels[2]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
          </div>
        </td>
        <td>
          <div class="content" v-if="scheduleModels && scheduleModels.length > 3">
            <Course
              v-for="course in scheduleModels[3]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
          </div>
        </td>
        <td>
          <div class="content" v-if="scheduleModels && scheduleModels.length > 4">
            <Course
              v-for="course in scheduleModels[4]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
          </div>
        </td>
        <td>
          <div class="content" v-if="scheduleModels && scheduleModels.length > 5">
            <Course
              v-for="course in scheduleModels[5]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
          </div>
        </td>
        <td>
          <div class="content" v-if="scheduleModels && scheduleModels.length > 6">
            <Course
              v-for="course in scheduleModels[6]['time_items'][index]['courses']"
              v-bind:courseModel="course"
              v-bind:key="course.date"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Course from "./course-card.vue";
var dateFormat = require("dateformat");
import Sortable from "sortablejs";

$(document).ready(function() {
  // var courseContainerElements = document.querySelectorAll('table > tbody > tr > td > .content');
  // var courseContainerElements = document.getElementById("table > tbody > tr > td > .content");
  var courseContainerElements = $('table > tbody > tr > td  > .content:not(:eq(0))');
  for (var i=0; i<courseContainerElements.length; ++i) {
    Sortable.create(courseContainerElements[i], {
      group: 'course-group',
      animation: 150
    });
  }
});

export default {
  name: "WeekTable",
  computed: {
    weekStart: function() {
      return new Date(this.$store.state.weekStart.getTime());
    },
    dates: function() {
      return [
        dateFormat(this.$store.state.weekStart, "周一(mm月dd日)"),
        dateFormat(
          new Date(this.$store.state.weekStart.getTime() + 3600 * 24 * 1000),
          "周二(mm月dd日)"
        ),
        dateFormat(
          new Date(
            this.$store.state.weekStart.getTime() + 3600 * 24 * 1000 * 2
          ),
          "周三(mm月dd日)"
        ),
        dateFormat(
          new Date(
            this.$store.state.weekStart.getTime() + 3600 * 24 * 1000 * 3
          ),
          "周四(mm月dd日)"
        ),
        dateFormat(
          new Date(
            this.$store.state.weekStart.getTime() + 3600 * 24 * 1000 * 4
          ),
          "周五(mm月dd日)"
        ),
        dateFormat(
          new Date(
            this.$store.state.weekStart.getTime() + 3600 * 24 * 1000 * 5
          ),
          "周六(mm月dd日)"
        ),
        dateFormat(
          new Date(
            this.$store.state.weekStart.getTime() + 3600 * 24 * 1000 * 6
          ),
          "周日(mm月dd日)"
        )
      ];
    },
    scheduleModels: function() {
      return this.$store.state.scheduleModels;
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
    }
  },
  components: {
    Course
  }
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
}

/* tbody */
.ui.table > tbody > tr:last-child > td:first-child {
  border-bottom-left-radius: 8px;
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

/* unset */
.ui.table {
  border: unset;
  background-color: unset;
}

.ui.table > thead > tr > th {
  background: unset;
}

/* course */
.ui.table > tbody > tr > td > .content > .course {
  margin: 7.5px 0;
}
</style>
