<template>
  <div>
    hahaha
    <canvas id="myChart" width="400" height="260"></canvas>
  </div>
</template>

<script>
const F2 = require('@antv/f2');

export default {
  name: "Dashboard",
  data: function() {
    return {
      chart: [
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 }
      ]
    };
  },
  mounted: function() {
    const chart = new F2.Chart({
      id: "myChart",
      pixelRatio: window.devicePixelRatio // 指定分辨率
    });
    chart.source(this.chart);
    chart
      .interval()
      .position("genre*sold")
      .color("genre");
    chart.render();
  }
};
</script>