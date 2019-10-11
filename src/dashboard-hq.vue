<template>
  <div class="dashboard">
    <div class="top">
      <div class="overview">
        <ScrollableBarChart />
      </div>
      <div class="horizontal">
        <div class="left">
          <LineBarChart />
        </div>
        <div class="right">
          <PieChart />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <BarChart />
      </div>
      <div class="right">
        <LineChart />
      </div>
    </div>
  </div>
</template>

<script>
import ScrollableBarChart from "./components/chart-components/scrollable-bar-chart.vue";
import LineBarChart from "./components/chart-components/line-bar-chart.vue";
import PieChart from "./components/chart-components/pie-chart.vue";
import BarChart from "./components/chart-components/bar-chart.vue";
import LineChart from "./components/chart-components/line-chart.vue";

export default {
  name: "Dashboard",
  components: {
    ScrollableBarChart,
    LineBarChart,
    PieChart,
    BarChart,
    LineChart,
  }
};
</script>

<style scoped>
.dashboard > .top {
  background-color: white;
  border-radius: 8px;
  margin: 0 40px;
}

.dashboard > .top > .overview {
  border-bottom: 1px solid #00cddd;
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