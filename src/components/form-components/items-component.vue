<template>
  <div class="interval field">
    <label class="header">{{label}}</label>

    <div v-for="(items, index) in itemsArray" :key="index" class="field">
      <a class="remove" v-on:click="$emit('onDeleteItem', name, index);">
        <i class="fas fa-times"></i>
      </a>
      <a class="edit" v-on:click="$emit('onUpdateItem', name, index);">
        <i class="icon primary edit"></i>
      </a>
      <table>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{item.key}}</td>
            <td v-if="Array.isArray(item.value)">
              <span v-for="(spanItem, spanIndex) in item.value" :key="spanIndex">{{spanItem}}</span>
            </td>
            <td v-else>{{item.value}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="ui add sgfield" v-on:click="$emit('onNewItem', name);">
      <i class="fas fa-plus"></i>
      添加
    </div>
  </div>
</template>

<script>
import CourseConfigItem from "./course-config-item.vue";

export default {
  name: "ItemsComponent",
  props: {
    name: String,
    label: String,
    itemsArray: Array
  },
  components: {
    CourseConfigItem
  },
  methods: {
    construct: function(item) {
      let arr = new Array();
      let time = new Object();
      time.key = item.time.key;
      time.value = initCourseTime2(item.time.value);
      arr.push(time);

      let room = new Object();
      room.key = item.room.key;
      room.value = item.room.value;
      arr.push(room);

      let crowd = new Object();
      crowd.key = item.crowd.key;
      crowd.value = item.crowd.value;
      arr.push(crowd);

      let teacher = new Object();
      teacher.key = item.teacher.key;
      teacher.value = item.teacher.value;
      arr.push(teacher);

      return arr;
    },
    addConfig: function() {
      // let item = new Object();
      //
      // item.time = new Object();
      // item.time.key = "课结次";
      // let timeValue = new Array();
      // let timeValueItem = new Object();
      // timeValueItem.week = "周二";
      //
      // let timeValueItemIntervals = new Array();
      // let intervalItem = new Object();
      // intervalItem.duration = "14:00-15:00";
      // timeValueItemIntervals.push(intervalItem);
      // let intervalItem2 = new Object();
      // intervalItem2.duration = "15:30-16:30";
      // timeValueItemIntervals.push(intervalItem2);
      //
      // timeValueItem.intervals = timeValueItemIntervals;
      // timeValue.push(timeValueItem);
      // item.time.value = timeValue;
      //
      // item.room = new Object();
      // item.room.key = "教室";
      // item.room.value = "A教室";
      //
      // item.crowd = new Object();
      // item.crowd.key = "班级";
      // item.crowd.value = "宝6班";
      //
      // item.teacher = new Object();
      // item.teacher.key = "老师";
      // item.teacher.value = "橙子老师";
      //
      // let models = this.$store.state.global.courseConfigModels;
      // if(models == null) {
      //     models = new Array();
      // }
      // models.push(item);
      // this.$store.commit('global/courseConfigModelsUpdated', models);

      $(".ui.modal.course-period").dimmer("hide");
      $(".ui.modal.course-period")
        .modal({ autofocus: false, allowMultiple: true })
        .modal("show");
    }
  }
};

function initCourseTime2(time) {
  let timeArr = new Array();

  if (time.length > 0) {
    time.forEach(function(timeItem) {
      let intervals = "";
      timeItem["intervals"].forEach(function(interval) {
        intervals += " / " + interval["duration"];
      });
      let timeStr = timeItem["week"] + intervals;
      timeArr.push(timeStr);
    });
  }

  return timeArr;
}
</script>

<style scoped>
.field {
  font-size: 14px;
}

.ui.add.sgfield {
  cursor: pointer;
}

.remove {
  position: absolute;
  top: 6px;
  right: 16px;
}

td:last-child {
  vertical-align: text-top;
}
</style>
