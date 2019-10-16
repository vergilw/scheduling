<template>
  <div
    @click="onEdit(courseModel.id)"
    :class="highlightClass"
    :schedule-id="courseModel.id"
    class="course"
  >
    <div v-on:click.stop="onDelete(courseModel.id)" class="delete">
      <i class="fas fa-times"></i>
    </div>
    <div v-if="courseModel.short_name" class="name">{{ courseModel.short_name }}</div>
    <div v-if="courseModel.name" class="shortname">{{ courseModel.name }}</div>
    <div class="footer">
      <div v-if="courseModel.room" class="room">
        <i class="fas fa-door-closed"></i>
        {{ courseModel.room.name }}
      </div>
      <div v-if="courseModel.teacher" class="teacher">
        <i class="fas fa-graduation-cap"></i>
        {{ courseModel.teacher.name }}
      </div>
      <div v-if="courseModel.crowd" class="class">
        <i class="fas fa-user"></i>
        {{ courseModel.crowd.name }}
      </div>
      <div v-if="courseModel.room" class="members">
        <i class="fas fa-user-friends"></i>
        {{ courseModel.room.limit_members_count }}
      </div>
      <!-- <div class="top">
        
      </div>
      <div class="bottom">
        
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    courseModel: Object
  },
  computed: {
    highlightClass: function() {
      return {
        highlight:
          (this.filterCourseID !== null &&
            this.filterCourseID !== this.courseModel.id) ||
          (this.filterCrowdID !== null &&
            this.filterCrowdID !== this.courseModel.crowd.id) ||
          (this.filterTeacherID !== null &&
            this.filterTeacherID !== this.courseModel.teacher.id) ||
          (this.filterRoomID !== null &&
            this.filterRoomID !== this.courseModel.room.id)
      };
    },
    filterCourseID: function() {
      if (this.$store.state.schedule.courseIndex === null) {
        return null;
      }
      return this.$store.state.global.courseModels[
        this.$store.state.schedule.courseIndex
      ].id;
    },
    filterCrowdID: function() {
      if (this.$store.state.schedule.crowdIndex === null) {
        return null;
      }
      return this.$store.state.global.crowdModels[
        this.$store.state.schedule.crowdIndex
      ].id;
    },
    filterTeacherID: function() {
      if (this.$store.state.schedule.teacherIndex === null) {
        return null;
      }
      return this.$store.state.global.teacherModels[
        this.$store.state.schedule.teacherIndex
      ].id;
    },
    filterRoomID: function() {
      if (this.$store.state.schedule.roomIndex === null) {
        return null;
      }
      return this.$store.state.global.roomModels[
        this.$store.state.schedule.roomIndex
      ].id;
    }
  },
  methods: {
    onDelete(scheduleID) {
      this.$store.commit("scheduleForm/updateScheduleID", scheduleID);
      this.$store.dispatch("scheduleForm/deleteScheduleByID");
    },
    onEdit(scheduleID) {
      
      this.$store.commit("scheduleForm/updateScheduleID", scheduleID);

      this.$store.dispatch("scheduleForm/getScheduleByID");

      $(".ui.modal.schedule").dimmer("hide");
      $(".ui.modal.schedule")
        .modal({ autofocus: false, allowMultiple: true })
        .modal("show");
    }
  }
};
</script>

<style scoped>
.course {
  position: relative;
  background-color: white;
  box-shadow: 0px 1px 8px 0px rgba(8, 14, 21, 0.06);
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
}

.disable.course {
  background-color: #f6f8fa;
  color: #9199a3;
}

.highlight.course {
  border: 2px solid yellow;
}

.course > .delete {
  position: absolute;
  right: 0;
  top: 0;
  padding: 2px 8px;
  cursor: pointer;
  color: #caced3;
}

.course > .name {
  margin: 0 15px;
  padding-top: 16px;
  font-size: 14px;
  color: #00cddd;
}

.course > .shortname {
  font-size: 12px;
  color: #4b525a;
  background-color: #f0f4f6;
  border-radius: 4px;
  margin: 6px 15px 0 15px;
  padding: 2px 8px 1px 8px;
}

.course > .footer {
  padding-bottom: 5px;
  padding-top: 6px;
  color: #9199a3;
  font-size: 12px;
}

.course > .footer > div {
  margin: 3px 18px;
  display: flex;
  align-items: center;
}

.course > .footer > div > svg {
  width: 16px;
  height: 12px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>