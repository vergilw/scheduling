import Vue from 'vue';
import 'dappore-ui/dist/main.css';
import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';
import 'semantic-ui-css/semantic';

import App from './App.vue';
import TableHeader from './components/table-header.vue';
import WeekTable from './components/week-table.vue';

var dateFormat = require('dateformat');
require('./index.css');





var now = new Date;
var checkedDate = new Date;
var weekDays = checkedDate.getDate() - checkedDate.getDay() + 1;
var weekStart = new Date(checkedDate.setDate(weekDays));
weekStart.setHours(0,0,0,0);


var store = {
  debug: true,
  state: {
    weekStart: weekStart
  }
}


var weekHeader = new Vue({
  el: '#week-header',
  render: h => h(TableHeader, {
    props: {
      originalWeek: store.state.weekStart
    }
  }),
  // template: '<table-header/>',
  // components: { TableHeader},
  // props: {
  //   originalWeek: new Date()
  // }
});


var weekTable= new Vue({
  el: '#week-table',
  render: h => h(WeekTable, {
    props: {
      originalWeek: store.state.weekStart
    }
  }),
});

$('.ui.dropdown').dropdown();

