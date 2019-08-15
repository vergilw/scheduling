<template>
  <div class="course">
    <a class="delete">
      <i class="fas fa-times"></i>
    </a>
    <div class="name">English</div>
    <div class="shortname">EN</div>
    <div class="footer">
      <div class="top">
        <div class="room">
          <i class="fas fa-door-closed"></i>
          教室
        </div>
        <div class="teacher">
          <i class="fas fa-graduation-cap"></i>
          老师
        </div>
      </div>
      <div class="bottom">
        <div class="class">
          <i class="fas fa-user"></i>
          班级
        </div>
        <div class="members">
          <i class="fas fa-user-friends"></i>
          人数
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    "course-model": Object
  }
}
</script>

<style scoped>
.course {
  position: relative;
  background-color: white;
  box-shadow: 0px 8px 7px 0px rgba(52, 57, 61, 0.11);
  border-radius: 8px;
  text-align: left;
}

.course > .delete {
  position: absolute;
  right: 0;
  top: 0;
  padding: 2px 8px;
  cursor: pointer;
  color: #9199a3;
}

.course > .name {
  margin: 0 15px;
  padding-top: 16px;
  font-size: 14px;
  color: #4b525a;
}

.course > .shortname {
  font-size: 12px;
  line-height: 24px;
  color: #4b525a;
  height: 24px;
  background-color: #f0f4f6;
  border-radius: 4px;
  margin: 6px 15px 0 15px;
  padding: 0 8px;
}

.course > .footer {
  padding-bottom: 5px;
  padding-top: 10px;
  color: #9199a3;
  font-size: 12px;
}

.course > .footer > div {
  margin: 3px 18px;
  display: flex;
}

.course > .footer > div > div {
  width: 50%;
}

.course > .footer > div > div > svg {
  width: 20px;
  height: 16px;
  margin-right: 5px;
}

</style>