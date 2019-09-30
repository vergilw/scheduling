<template>
  <div :id="name" style="width: 100%; height: 550px;"></div>
</template>

<script>
const echarts = require("echarts");

export default {
  name: "PieChart",
  props: {
    name: String,
  },
  data: function() {
    return {
      chart: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ]
    };
  },
  mounted: function() {
    var chart = echarts.init(document.getElementById(this.name));
    var option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: false
      },
      color: [
        "#00cddd",
        "#b8e986",
        "#71d69a",
        "#63be66",
        "#308233",
        "#0095ff",
        "#3635c0",
        "#7c45d7",
        "#ff5d00",
        "#f5a623",
        "#db9967",
        "#f8e71c"
      ],
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter: "{b} {c}",
            fontSize: 16
          },
          labelLine: {
            show: true,
            // length2: 200
          },
          data: this.chart
        }
      ]
    };
    chart.setOption(option);
  }
};
</script>