<template>
  <table class="ui celled table">
    <thead>
      <tr>
        <th></th>
        <th v-for="date in dates" v-bind:key="date">
            {{ date }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td><div class="content"></div></td>
        <td><div class="content"></div></td>
        <td><div class="content"></div></td>
        <td><div class="content"></div></td>
        <td><div class="content"></div></td>
        <td><div class="content"></div></td>
        <td><div class="content"></div></td>
        <td><div class="content"></div></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
var dateFormat = require("dateformat");

export default {
  name: "WeekTable",
  props: {
      originalWeek: {
        type: Date,
        required: true
      }
  },
  data: function() {
    return {
      weekStart: new Date(this.originalWeek.getTime()),
      dates: [
        dateFormat(this.originalWeek, '周一(mm月dd日)'),
        dateFormat(new Date(this.originalWeek.getTime()+3600*24*1000), '周二(mm月dd日)'),
        dateFormat(new Date(this.originalWeek.getTime()+3600*24*1000*2), '周三(mm月dd日)'),
        dateFormat(new Date(this.originalWeek.getTime()+3600*24*1000*3), '周四(mm月dd日)'),
        dateFormat(new Date(this.originalWeek.getTime()+3600*24*1000*4), '周五(mm月dd日)'),
        dateFormat(new Date(this.originalWeek.getTime()+3600*24*1000*5), '周六(mm月dd日)'),
        dateFormat(new Date(this.originalWeek.getTime()+3600*24*1000*6), '周日(mm月dd日)'),
      ]
    }
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

.ui.table > tbody > tr > td > div {
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

</style>
