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
import CourseForm from './components/course-form.vue';
import CoursePeriodForm from './components/course-period-form.vue';
import subcourseForm from './components/subcourse-form.vue';

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

var SubcourseForm = new Vue({
  el: "#subcourse-form",
  store,
  render: h => h(subcourseForm)
});