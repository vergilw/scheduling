<template>
  <div class="ui sg modal">
    <div class="header">
      <div class="title">添加课程</div>
      <i class="fas fa-times"></i>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <InputComponent label="课程标题" name="courseTitle" v-bind:value="courseTitle" />
        <SelectComponent label="课类" name="type" v-bind:itemsArray="courseTypeModels" />
        <SelectComponent label="教室" name="room" v-bind:itemsArray="roomModels" />
        <SelectComponent label="班级" name="crowd" v-bind:itemsArray="crowdModels" />
        <SelectComponent label="老师" name="teacher" v-bind:itemsArray="teacherModels" />
        <InputComponent label="限制人数" name="limitCapacity" v-bind:value="limitCapacity" />
        <InputComponent v-bind:isMultipleLines=true label="备注" name="limitCapacity" v-bind:value="limitCapacity" />
      </form>
    </div>
  </div>
</template>

<script>
import SelectComponent from './form-components/select-component.vue';
import InputComponent from './form-components/input-component.vue';

export default {
  name: "CourseForm",
  data: function() {
    return {
      courseTitle: null,
      limitCapacity: null
    }
  },
  computed: {
    roomModels: function() {
      return [this.$store.state.roomModels];
    },
    crowdModels: function() {
      return [this.$store.state.crowdModels];
    },
    teacherModels: function() {
      return [this.$store.state.teacherModels];
    },
    courseTypeModels: function() {
      return [this.$store.state.majorCourseTypeModels, this.$store.state.minorCourseTypeModels];
    }
  },
  components: {
    SelectComponent,
    InputComponent
  }
};
</script>

<style scoped>
.ui.sg.modal > .header > svg {
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  height: 72px;
  padding: 26px 20px;
  cursor: pointer;
}

.ui.sg.modal > .content > .ui.form {
  margin: auto;
  max-width: 420px;
}
</style>