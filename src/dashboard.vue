<template>
  <div class="dashboard">
    <div class="top-left"><PieChart name="income" /></div>
    <div class="top-right"><LineChart name="students" /></div>
    <div class="bottom-left"><LineChart name="targetStudents" /></div>
    <div class="bottom-right"><BarChart name="teachers" /></div>
  </div>
</template>

<script>
import PieChart from "./components/chart-components/pie-chart.vue";
import BarChart from "./components/chart-components/bar-chart.vue";
import LineChart from "./components/chart-components/line-chart.vue";

export default {
  name: "Dashboard",
  components: {
    PieChart,
    BarChart,
    LineChart,
  }
};
</script>

<style scoped>
.dashboard {
  background-color: white;
  border-radius: 8px;
  margin: 0 40px;
  display: flex;
  flex-wrap: wrap;
}

.dashboard > * {
  width: 50%;
}

.dashboard > .top > .horizontal {
  display: flex;
}

.dashboard > .top > .horizontal > .left {
  border-right: 1px solid #00cddd;
  width: 50%;
}

.dashboard > .top > .horizontal > .right {
  width: 50%;
}

.dashboard > .bottom {
  display: flex;
  background-color: white;
  border-radius: 8px;
  margin: 20px 40px 40px 40px;
}

.dashboard > .bottom > .left {
  border-right: 1px solid #00cddd;
  width: 50%;
}

.dashboard > .bottom > .right {
  width: 50%;
}

</style>