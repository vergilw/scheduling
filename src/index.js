import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';
import 'dappore-ui/dist/main.css';
import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';
import 'semantic-ui-css/semantic';
const axios = require('axios');

import App from './App.vue';
import TableHeader from './components/table-header.vue';
import WeekTable from './components/week-table.vue';

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
    scheduleModels: null
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

axios.get('http://192.168.0.107/schedule/index')
  .then(function (response) {
    console.log(response);
    store.commit('scheduleModelsUpdated', response['data']);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {

  });

$('.ui.dropdown').dropdown();

