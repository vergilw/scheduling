import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import 'dappore-ui/dist/main.css';
import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';
import 'semantic-ui-css/semantic';
import Notifications from 'vue-notification';

const axios = require('axios');
import store from './store/index.js';

import apiConfig from './api/api.config.js';

import dashboard from './dashboard.vue';


require('./css/dashboard.css');

Vue.use(VueRouter);
Vue.use(Notifications);

axios.defaults.baseURL = apiConfig.hostname;


// const routes = [
//   { path: '', component: Schedule },
//   {
//     path: '/settings', component: Settings, children: [
//       {
//         path: '',
//         component: RoomSetting
//       },
//       {
//         path: 'classtime',
//         component: ClassTimeSetting
//       },
//       {
//         path: 'coursetype',
//         component: CourseTypeSetting
//       },
//       {
//         path: 'course',
//         component: CourseSetting
//       },
//       {
//         path: 'crowds',
//         component: CrowdsSetting
//       },
//       {
//         path: 'students',
//         component: StudentsSetting
//       }
//     ]
//   }
// ]

// const router = new VueRouter({
//   routes
// })

var app = new Vue({
  el: '#main',
  store,
  // router,
  render: h => h(dashboard),
});

//FIXME: local debug
// if (process.env.NODE_ENV !== 'production') {
//   store.commit("global/configRequestDefaults", {
//     authToken: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOjIsInN1YiI6ImF1dGgiLCJleHAiOjE1Njk4MTIwNzR9.QgrmkpXZv8KGq7ZJ-o4Vq0L7SH-xr4h-jESbrl5nTQY',
//     organToken: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOjEsInN1YiI6Im9yZ2FuX2F1dGgiLCJleHAiOiIyMDE5LTA2LTI0IDExOjIwOjM3ICswODAwIn0.OG25Pvci0wvKiPXaLtpYyeSf9VF01Zi0PCcdNfqTvzk'
//   });
//   store.dispatch("schedule/getSchedule");
//   store.dispatch("global/getCourses");
//   store.dispatch("global/getRooms");
//   store.dispatch("global/getCrowds");
//   store.dispatch("global/getTeachers");
//   store.dispatch("global/getCourseTypes");
//   store.dispatch("global/getClassTime");
// }
