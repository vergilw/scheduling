<template>
  <div :id="name" style="width: 100%; height: 550px;"></div>
</template>

<script>
const echarts = require("echarts");

export default {
  name: "LineChart",
  props: {
    name: String,
  },
  data: function() {
    return {
      chart: [820, 932, 901, 934, 1290, 1330, 1320]
    };
  },
  mounted: function() {
    var chart = echarts.init(document.getElementById(this.name));
    var option = {
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      color: '#1de7b8',
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
          symbolSize: 13
        }
      ]
    };
    chart.setOption(option);
  }
};
</script>