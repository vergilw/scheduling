import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
import 'dappore-ui/dist/main.css';
import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';
import 'semantic-ui-css/semantic';
const axios = require('axios');
import Sortable from 'sortablejs';

import TableHeader from './components/table-header.vue';
import WeekTable from './components/week-table.vue';
import CourseForm from './components/course-form.vue';
import CoursePeriodForm from './components/course-period-form.vue';


var dateFormat = require('dateformat');
require('./index.css');

Vue.use(Vuex)


var now = new Date;
var checkedDate = new Date;
var weekDays = checkedDate.getDate() - checkedDate.getDay() + 1;
var weekStart = new Date(checkedDate.setDate(weekDays));
weekStart.setHours(0, 0, 0, 0);


const store = new Vuex.Store({
  state: {
    weekStart: new Date(weekStart.getTime()),
    scheduleModels: null,
    roomModels: null,
    crowdModels: null,
    teacherModels: null,
    majorCourseTypeModels: null,
    minorCourseTypeModels: null,
    isLoading: false
  },
  mutations: {
    dateRangeBack(state) {
      state.weekStart = new Date(state.weekStart.getTime() - 3600 * 24 * 1000 * 7);
    },
    dateRangeFront(state) {
      state.weekStart = new Date(state.weekStart.getTime() + 3600 * 24 * 1000 * 7);
    },
    scheduleModelsUpdated(state, models) {
      state.scheduleModels = models;
    },
    roomModelsUpdated(state, models) {
      state.roomModels = models;
    },
    crowdModelsUpdated(state, models) {
      state.crowdModels = models;
    },
    teacherModelsUpdated(state, models) {
      state.teacherModels = models;
    },
    courseTypesModelsUpdated(state, {majorModels, minorModels}) {
      state.majorCourseTypeModels = majorModels;
      state.minorCourseTypeModels = minorModels;
    }
  }
})


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

//get courses
store.state.isLoading = true;
axios.get('http://192.168.0.109/schedule/index')
  .then(function (response) {

    setTimeout(function () {
      store.commit('scheduleModelsUpdated', response['data']);
      store.state.isLoading = false;
    }, 2000);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {

  });

//get rooms
axios.get('http://192.168.0.122/schedule/rooms')
  .then(function (response) {
    store.commit('roomModelsUpdated', response['data']);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {

  });

//get crowds
axios.get('http://192.168.0.122/schedule/crowds')
  .then(function (response) {
    store.commit('crowdModelsUpdated', response['data']);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {

  });

//get teachers
axios.get('http://192.168.0.122/schedule/teachers')
  .then(function (response) {
    store.commit('teacherModelsUpdated', response['data']);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {

  });

//get courseTypes
axios.get('http://192.168.0.122/schedule/courseTypes')
  .then(function (response) {
    store.commit('courseTypesModelsUpdated', { majorModels: response['data']['major'], minorModels: response['data']['minor'] });
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {

  });
