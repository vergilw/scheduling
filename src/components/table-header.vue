<template>
  <div class="ui sgheader">
    <div class="search">
      <form class="ui sgsearch">
        <div class="ui input">
          <input type="text" placeholder="输入搜索的关键词…" />
        </div>

        <div class="ui input">
          <input type="text" placeholder="输入搜索的关键词…" />
        </div>

        <div class="ui submit button">搜索</div>
        <div class="ui reset button">重置</div>
      </form>

      <div class="action">
        <div class="ui button">
          <i class="fas fa-plus"></i>
          添加课程
        </div>
      </div>
    </div>

    <div class="filter">
      <div class="ui sgfilter">
        <div class="header">状态：</div>
        <div class="ui selection dropdown">
          <input type="hidden" name="gender" />
          <i class="dropdown icon"></i>
          <div class="default text">Gender</div>
          <div class="menu">
            <div class="item">all</div>
            <div class="item">Male</div>
            <div class="item">Female</div>
          </div>
        </div>
      </div>

      <div class="ui sgfilter">
        <div class="header">状态：</div>
        <div class="ui selection dropdown">
          <input type="hidden" name="gender" />
          <i class="dropdown icon"></i>
          <div class="default text">Gender</div>
          <div class="menu">
            <div class="item">all</div>
            <div class="item">Male</div>
            <div class="item">Female</div>
          </div>
        </div>
      </div>

      <div class="date">
        <div class="back button" v-on:click="rangeBack()">
          <i class="fas fa-chevron-left"></i>
        </div>
        <div class="time">{{ dateRange }}</div>
        <div class="front button" v-on:click="rangeFront()">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var dateFormat = require("dateformat");

export default {
  name: "TableHeader",
  props: {
    originalWeek: {
      type: Date,
      required: true
    }
  },
  data: function() {
    return {
      weekStart: new Date(this.originalWeek.getTime()),
      dateRange: dateFormat(this.originalWeek, "yyyy.mm.dd") + " - " + dateFormat(new Date(this.originalWeek.getTime() + 3600 * 24 * 1000 * 6), "yyyy.mm.dd")
    }
  },
  // computed: {
  //   dateRange: function() {
  //     return (
  //       dateFormat(this.weekStart, "yyyy.mm.dd") +
  //       " - " +
  //       dateFormat(
  //         new Date(this.weekStart.getTime() + 3600 * 24 * 1000 * 6),
  //         "yyyy.mm.dd"
  //       )
  //     );
  //   }
  // },
  methods: {
    rangeBack() {
      this.weekStart.setDate(this.weekStart.getDate() - 7);
      this.dateRange = dateFormat(this.weekStart, "yyyy.mm.dd") + " - " + dateFormat(new Date(this.weekStart.getTime() + 3600 * 24 * 1000 * 6), "yyyy.mm.dd");
      this.$forceUpdate();
    },
    rangeFront() {
      this.weekStart.setDate(this.weekStart.getDate() + 7);
      this.dateRange = dateFormat(this.weekStart, "yyyy.mm.dd") + " - " + dateFormat(new Date(this.weekStart.getTime() + 3600 * 24 * 1000 * 6), "yyyy.mm.dd");
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
.ui.sgheader > .filter {
  position: relative;
}

.ui.sgheader > .filter > .date {
  position: absolute;
  right: 14px;
  display: flex;
  align-items: center;
}

.ui.sgheader > .filter > .date > .button {
  width: 35px;
  height: 40px;
  border-radius: 4px;
  border: solid 1px #00cddd;
  text-align: center;
}

.ui.sgheader > .filter > .date > .button > svg {
  height: 38px;
  color: #00cddd;
}

.ui.sgheader > .filter > .date > .time {
  margin: 0 15px;
  font-size: 14px;
  color: #4b525a;
  font-weight: 600;
}
</style>
