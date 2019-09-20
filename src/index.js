import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import 'dappore-ui/dist/main.css';
import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';
import 'semantic-ui-css/semantic';
import Notifications from 'vue-notification';

import Sortable from 'sortablejs';
const axios = require('axios');
import store from './store/index.js';

import apiConfig from './api/api.config.js';

import ScheduleForm from './components/forms/schedule-form.vue';
import SchedulesForm from './components/forms/schedules-form.vue';
import CoursePeriodForm from './components/forms/course-period-form.vue';
import LessonForm from "./components/forms/lesson-form.vue";
import CourseForm from './components/forms/course-form.vue';
import RoomForm from './components/forms/room-form.vue';
import ClassTimeForm from './components/forms/class-time-form.vue';
import TransferStudentForm from './components/forms/transfer-student-form.vue';
import LessonTimeForm from './components/forms/lesson-time-form.vue';
import CourseTypeForm from './components/forms/course-type-form.vue';
import CrowdsForm from './components/forms/crowds-form.vue';
import StudentsForm from './components/forms/students-form.vue';

import RoomSetting from './components/settings/room-setting.vue';
import ClassTimeSetting from './components/settings/class-time-setting.vue';
import CourseTypeSetting from './components/settings/course-type-setting.vue';
import CourseSetting from './components/settings/course-setting.vue';
import CrowdsSetting from './components/settings/crowds-setting.vue';
import StudentsSetting from './components/settings/students-setting.vue';

import App from './app.vue';
import Schedule from './schedule.vue';
import Settings from './settings.vue';


require('./index.css');

Vue.use(VueRouter);
Vue.use(Notifications);

axios.defaults.baseURL = apiConfig.hostname;



var now = new Date;
var checkedDate = new Date;
var weekDays = checkedDate.getDate() - checkedDate.getDay() + 1;
var weekStart = new Date(checkedDate.setDate(weekDays));
weekStart.setHours(0, 0, 0, 0);
store.commit('schedule/weekStartUpdated', weekStart);

const routes = [
  { path: '', component: Schedule},
  { path: '/settings', component: Settings, children: [
    {
      path: '',
      component: RoomSetting
    },
    {
      path: 'classtime',
      component: ClassTimeSetting
    },
    {
      path: 'coursetype',
      component: CourseTypeSetting
    },
    {
      path: 'course',
      component: CourseSetting
    },
    {
      path: 'crowds',
      component: CrowdsSetting
    },
    {
      path: 'students',
      component: StudentsSetting
    }
  ]}
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});

//FIXME: local debug
store.commit("global/configRequestDefaults", {
  authToken: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOjIsInN1YiI6ImF1dGgiLCJleHAiOjE1NjkyMDY0NDN9.rlTIlS27nBK9KO9YurJFwcaC7AqfnpHECrqpNMsFHdY',
  organToken: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsInN1YiI6Im9yZ2FuX2F1dGgiLCJleHAiOiIyMDE5LTA2LTI0IDExOjIwOjM3ICswODAwIn0.OG25Pvci0wvKiPXaLtpYyeSf9VF01Zi0PCcdNfqTvzk'
});
store.dispatch("schedule/getSchedule");
store.dispatch("global/getCourses");
store.dispatch("global/getRooms");
store.dispatch("global/getCrowds");
store.dispatch("global/getTeachers");
store.dispatch("global/getCourseTypes");
store.dispatch("global/getClassTime");

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

var lessonForm = new Vue({
  el: "#lesson-form",
  store,
  render: h => h(LessonForm),
});

var roomForm = new Vue({
  el: "#room-form",
  store,
  render: h => h(RoomForm)
});

var classTimeForm = new Vue({
  el: "#class-time-form",
  store,
  render: h => h(ClassTimeForm)
});

var transferStudentForm = new Vue({
  el: "#transfer-student-form",
  store,
  render: h => h(TransferStudentForm)
});

var lessonTimeForm = new Vue({
  el: "#lesson-time-form",
  store,
  render: h => h(LessonTimeForm)
});

var courseTypeForm = new Vue({
  el: "#course-type-form",
  store,
  render: h => h(CourseTypeForm)
});

var crowdsForm = new Vue({
  el: "#crowd-form",
  store,
  render: h => h(CrowdsForm)
});

var studentsForm = new Vue({
    el: "#student-form",
    store,
    render: h => h(StudentsForm)
});

