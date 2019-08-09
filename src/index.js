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



new Vue({
  el: '#app',
  render: h => h(TableHeader, {
    props: {
      weekStart: weekStart,
      dateRange: dateFormat(weekStart, 'yyyy.mm.dd') + ' - ' + dateFormat(now.setDate(weekStart.getDate()+6), 'yyyy.mm.dd')
    }
  }),
});



new Vue({
  el: '#week-table',
  render: h => h(WeekTable, {
    props: {
      weekStart: weekStart,
      dates: [
        dateFormat(weekStart, '周一(mm月dd日)'),
        dateFormat(now.setDate(weekStart.getDate()+1), '周二(mm月dd日)'),
        dateFormat(now.setDate(weekStart.getDate()+1), '周三(mm月dd日)'),
        dateFormat(now.setDate(weekStart.getDate()+1), '周四(mm月dd日)'),
        dateFormat(now.setDate(weekStart.getDate()+1), '周五(mm月dd日)'),
        dateFormat(now.setDate(weekStart.getDate()+1), '周六(mm月dd日)'),
        dateFormat(now.setDate(weekStart.getDate()+1), '周日(mm月dd日)'),
      ]
    }
  }),
});

$('.ui.dropdown').dropdown();

// $(".ui.sgheader > .filter > .date > .back.button").on("click", function() {
//   weekStart.setDate(weekStart.getDate()-7);
//   console.log("1");
// });