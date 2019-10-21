<template>
  <div class="ui sgheader">
    <div class="search">
      <form class="ui sgsearch">
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

    <div v-if="teacherModels" class="filter">
      <div class="ui sgfilter">
        <div class="header">课程：</div>
        <div class="ui selection dropdown">
          <input type="hidden" name="course" />
          <i class="dropdown icon"></i>
          <div class="default text">全部</div>
          <div class="menu">
            <div
              class="item"
              @click="onChangeFilter('course', null)"
            >全部</div>
            <div
              v-for="(course, index) in courseModels"
              :key="index"
              class="item"
              @click="onChangeFilter('course', index)"
            >{{ course.name }}</div>
          </div>
        </div>
      </div>

      <div v-if="crowdModels" class="ui sgfilter">
        <div class="header">班级：</div>
        <div class="ui selection dropdown">
          <input type="hidden" name="crowd" />
          <i class="dropdown icon"></i>
          <div class="default text">全部</div>
          <div class="menu">
            <div
              class="item"
              @click="onChangeFilter('crowd', null)"
            >全部</div>
            <div
              v-for="(crowd, index) in crowdModels"
              :key="index"
              class="item"
              @click="onChangeFilter('crowd', index)"
            >{{ crowd.name }}</div>
          </div>
        </div>
      </div>

      <div v-if="teacherModels" class="ui sgfilter">
        <div class="header">老师：</div>
        <div class="ui selection dropdown">
          <input type="hidden" name="teacher" />
          <i class="dropdown icon"></i>
          <div class="default text">全部</div>
          <div class="menu">
            <div
              class="item"
              @click="onChangeFilter('teacher', null)"
            >全部</div>
            <div
              v-for="(teacher, index) in teacherModels"
              :key="index"
              class="item"
              @click="onChangeFilter('teacher', index)"
            >{{ teacher.name }}</div>
          </div>
        </div>
      </div>

      <div v-if="roomModels" class="ui sgfilter">
        <div class="header">教室：</div>
        <div class="ui selection dropdown">
          <input type="hidden" name="room" />
          <i class="dropdown icon"></i>
          <div class="default text">全部</div>
          <div class="menu">
            <div
              class="item"
              @click="onChangeFilter('room', null)"
            >全部</div>
            <div
              v-for="(room, index) in roomModels"
              :key="index"
              class="item"
              @click="onChangeFilter('room', index)"
            >{{ room.name }}</div>
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
    },
    courseModels: function() {
      return this.$store.state.global.courseModels;
    },
    roomModels: function() {
      return this.$store.state.global.roomModels;
    },
    crowdModels: function() {
      return this.$store.state.global.crowdModels;
    },
    teacherModels: function() {
      return this.$store.state.global.teacherModels;
    }
  },
  methods: {
    rangeBack() {
      this.$store.commit("schedule/dateRangeBack");
      this.$store.dispatch("schedule/getSchedule");
    },
    rangeFront() {
      this.$store.commit("schedule/dateRangeFront");
      this.$store.dispatch("schedule/getSchedule");
    },
    onNewSchedules() {
      this.$store.commit('schedulesForm/reset');
      $(".ui.modal.schedules .ui.form").form("clear");

      //course default value by filter
      if (
        this.$store.state.schedulesForm.courseIndex === null &&
        this.$store.state.schedule.courseIndex !== null
      ) {
        this.$store.commit(
          "schedulesForm/updateCourseIndex",
          this.$store.state.schedule.courseIndex
        );
      }

      $(".ui.modal.schedules").dimmer("hide");
      $(".ui.modal.schedules")
        .modal({ autofocus: false, allowMultiple: true })
        .modal("show");
    },
    onSettings() {
      this.$router.push("settings");
    },
    onChangeFilter(name, index) {
      if (name === "course") {
        this.$store.commit("schedule/updateCourseIndex", index);
      } else if (name === "crowd") {
        this.$store.commit("schedule/updateCrowdIndex", index);
      } else if (name === "teacher") {
        this.$store.commit("schedule/updateTeacherIndex", index);
      } else if (name === "room") {
        this.$store.commit("schedule/updateRoomIndex", index);
      }
    }
  },
  updated: function() {
    $(".ui.dropdown").dropdown();
  },
  created: function() {
    var url = window.location.search;
    var authToken = getParameterByName("auth_token");
    var organToken = getParameterByName("org_token");

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
