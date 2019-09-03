import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
import 'dappore-ui/dist/main.css';
import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';
import 'semantic-ui-css/semantic';

import Sortable from 'sortablejs';

import store from './store/index.js';

import TableHeader from './components/table-header.vue';
import WeekTable from './components/week-table.vue';
import ScheduleForm from './components/forms/schedule-form.vue';
import SchedulesForm from './components/forms/schedules-form.vue';
import CoursePeriodForm from './components/forms/course-period-form.vue';
import LessionForm from "./components/forms/lession-form.vue";
import CourseForm from './components/forms/course-form.vue';
import RoomForm from './components/forms/room-form.vue';


require('./index.css');

var now = new Date;
var checkedDate = new Date;
var weekDays = checkedDate.getDate() - checkedDate.getDay() + 1;
var weekStart = new Date(checkedDate.setDate(weekDays));
weekStart.setHours(0, 0, 0, 0);
store.commit('schedule/weekStartUpdated', weekStart);

var weekHeader = new Vue({
  el: '#week-header',
  store,
  render: h => h(TableHeader),
});

var weekTable = new Vue({
  el: '#week-table',
  store,
  render: h => h(WeekTable),
});

var schedulesForm = new Vue({
  el: '#schedules-form',
  store,
  render: h => h(SchedulesForm),
});

var scheduleForm = new Vue({
  el: '#schedule-form',
  store,
  render: h => h(ScheduleForm),
});

var courseForm = new Vue({
  el: '#course-form',
  store,
  render: h => h(CourseForm),
});

var coursePeriodForm = new Vue({
  el: '#course-period-form',
  store,
  render: h => h(CoursePeriodForm),
});

var lessionForm = new Vue({
  el: "#lession-form",
  store,
  render: h => h(LessionForm),
});

var roomForm = new Vue({
  el: "#room-form",
  store,
  render: h => h(RoomForm)
});
