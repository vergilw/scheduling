<template>
  <div :id="name" style="width: 100%; height: 550px;"></div>
</template>

<script>
const echarts = require("echarts");

export default {
  name: 'ScrollableBarChart',
  props: {
    name: String,
  },
  data: function() {
    return {
      chart: [
        {
          name: "哈穆德1",
          exist: 43.3,
          waiting: 85.8,
          income: 93.7
        },
        { name: "哈穆德2", exist: 83.1, waiting: 73.4, income: 55.1 },
        {
          name: "哈穆德3",
          exist: 86.4,
          waiting: 65.2,
          income: 82.5
        },
        {
          name: "哈穆德4",
          exist: 72.4,
          waiting: 53.9,
          income: 39.1
        },
        {
          name: "哈穆德5",
          exist: 72.4,
          waiting: 53.9,
          income: 39.1
        },
        {
          name: "哈穆德6",
          exist: 72.4,
          waiting: 53.9,
          income: 39.1
        },
        {
          name: "哈穆德7",
          exist: 72.4,
          waiting: 53.9,
          income: 39.1
        },
        {
          name: "哈穆德8",
          exist: 72.4,
          waiting: 53.9,
          income: 39.1
        },
        {
          name: "哈穆德9",
          exist: 72.4,
          waiting: 53.9,
          income: 39.1
        },
        {
          name: "哈穆德10",
          exist: 72.4,
          waiting: 53.9,
          income: 39.1
        },
        {
          name: "哈穆德11",
          exist: 72.4,
          waiting: 53.9,
          income: 39.1
        },
        {
          name: "哈穆德12",
          exist: 72.4,
          waiting: 53.9,
          income: 39.1
        }
      ]
    }
  },
  // computed: {
  //   chartData: function() {
  //     return this.$store.state.overviewChart.formLoading;
  //   },
  // },
  mounted: function() {
    var chart = echarts.init(document.getElementById(this.name));
    var option = {
      title: {
        text: "哈穆德总部",
        left: 30,
        top: 20,
        textStyle: {
          fontSize: 30,
          color: "#405051"
        }
      },
      grid: {
        right: 40,
        left: 130,
        top: 160,
        bottom: 86
      },
      tooltip: {},
      legend: {
        right: 40,
        top: 40
      },
      xAxis: {
        type: "category",
        axisLabel: {
          color: "#405051",
          fontSize: 12,
          fontFamily:
            "PingFangSC-Light,Microsoft YaHei,Avenir,Helvetica Neue,Arial,Helvetica,sans-serif",
          margin: 26
        },
        axisLine: {
          lineStyle: {
            color: "#eaeaea"
          }
        },
        splitLine: {
          lineStyle: {
            color: "#eaeaea"
          }
        },
        boundaryGap: [20, 20]
      },
      yAxis: {
        axisLabel: {
          color: "#999",
          fontSize: 12,
          fontFamily:
            "PingFangSC-Light,Microsoft YaHei,Avenir,Helvetica Neue,Arial,Helvetica,sans-serif",
          margin: 70
        },
        axisLine: {
          lineStyle: {
            color: "#eaeaea"
          },
          show: false
        },
        splitLine: {
          lineStyle: {
            color: "#eaeaea"
          }
        }
      },
      dataset: {
        dimensions: [
          "name",
          { name: "exist", displayName: "在园学生" },
          { name: "waiting", displayName: "待签约" },
          { name: "income", displayName: "收入" }
        ],
        source: this.chart
      },
      series: [
        { type: "bar", barWidth: 14 },
        { type: "bar", barWidth: 14 },
        { type: "bar", barWidth: 14 }
      ],
      color: ["#79d118", "#00cddd", "#ffca29"],
      textStyle: {
        color: "#405051",
        fontSize: 12,
        fontFamily:
          "PingFangSC-Light,Microsoft YaHei,Avenir,Helvetica Neue,Arial,Helvetica,sans-serif"
      },
      dataZoom: [
        {
          type: "slider",
          xAxisIndex: 0,
          start: 0,
          end: 26,
          show: false
        },
        {
          type: "inside",
          xAxisIndex: 0,
          start: 0,
          end: 26,
          zoomOnMouseWheel: false,
          moveOnMouseMove: true
        }
      ]
    };
    chart.setOption(option);

  }
}
</script>