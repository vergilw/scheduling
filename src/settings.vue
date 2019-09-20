<template>
  <div>
    <div class="ui breadcrumb">
      <router-link to="/" class="section">大课表</router-link>
      <div class="divider">/</div>
      <div class="active section">设置</div>
    </div>
    <div class="header">
      <router-link to="/settings/" class="item">教室设置</router-link>
      <!-- <router-link to='/settings/classtime' class="item">课程时间设置</router-link> -->
      <router-link to="/settings/coursetype" class="item">课程类型设置</router-link>
      <router-link to="/settings/course" class="item">课程设置</router-link>
      <router-link to='/settings/crowds' class="item">班级设置</router-link>
      <router-link to='/settings/students' class="item">学生设置</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings"
};
</script>

<style scoped>
.ui.breadcrumb {
  margin-bottom: 20px;
  font-size: 16px;
  color: white;
}

.ui.breadcrumb a {
  color: white;
}

.header {
  height: 92px;
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 8px 7px 0px rgba(52, 57, 61, 0.11);
  border-radius: 8px;
}

.header > .item {
  width: 163px;
  height: 100%;
  line-height: 92px;
  color: #4b525a;
  font-size: 14px;
  text-align: center;
  border-right: solid 1px #9199a3;
}

.header > .item.active {
  background-color: #e5fafb;
  color: #00cddd;
}

.content {
  margin-top: 20px;
}
</style>
