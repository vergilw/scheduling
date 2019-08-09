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
export default {
  name: "WeekTable",
  props: {
      weekStart: Date,
      dates: Array
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
