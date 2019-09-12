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
        <div class="ui negative button" v-on:click="onSettings">
          <i class="fas fa-cog"></i>
          设置
        </div>
        <div class="ui positive button" v-on:click="onNewSchedules">
          <i class="fas fa-plus"></i>
          批量添加课程
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
  computed: {
    weekStart: function() {
      return new Date(this.$store.state.schedule.weekStart.getTime());
    },
    dateRange: function() {
      return (
        dateFormat(this.$store.state.schedule.weekStart, "yyyy.mm.dd") +
        " - " +
        dateFormat(
          new Date(
            this.$store.state.schedule.weekStart.getTime() +
              3600 * 24 * 1000 * 6
          ),
          "yyyy.mm.dd"
        )
      );
    }
  },
  methods: {
    rangeBack() {
      this.$store.commit("schedule/dateRangeBack");
    },
    rangeFront() {
      this.$store.commit("schedule/dateRangeFront");
    },
    onNewSchedules() {
      $(".ui.modal.schedules").dimmer("hide");
      $(".ui.modal.schedules")
        .modal({ autofocus: false, allowMultiple: true })
        .modal("show");
    },
    onSettings() {
      this.$router.push("settings");
    }
  },
  mounted: function() {
    $(".ui.dropdown").dropdown();
  },
  created: function() {
    var url = window.location.search;
    var authToken = getParameterByName("auth_token");
    var organToken = getParameterByName("organ_token");

    if (authToken !== null && organToken !== null) {
      this.$store.commit("global/configRequestDefaults", {
        authToken: authToken,
        organToken: organToken
      });

      this.$store.dispatch("schedule/getSchedule");
      this.$store.dispatch("global/getCourses");
      this.$store.dispatch("global/getRooms");
      this.$store.dispatch("global/getCrowds");
      this.$store.dispatch("global/getTeachers");
      this.$store.dispatch("global/getCourseTypes");
      this.$store.dispatch("global/getClassTime");
    }
  }
};

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
</script>

<style scoped>
.ui.sgheader > .search > .action > .negative.button {
  border: solid 1px #dbe1e6;
  background-color: white;
  font-size: 14px;
  color: #4b525a;
  margin-right: 10px;
  box-shadow: unset;
}

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
