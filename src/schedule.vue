<template>
  <div>
    <div class="ui segment">
      <TableHeader />
    </div>

    <div class="ui segment">
      <WeekTable />
    </div>
  </div>
</template>

<script>
import TableHeader from './components/table-header.vue';
import WeekTable from './components/week-table.vue';

export default {
  name: 'Schedule',
  components: {
    TableHeader,
    WeekTable
  }
}
</script>