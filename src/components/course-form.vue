<template>
  <div class="ui sg modal">
    <div class="header">
      <div class="title">添加课程</div>
      <i class="fas fa-times"></i>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <div class="field">
          <label class="header">课频次</label>
          <div class="field">
            <select class="ui dropdown">
              <option value="单次课">单词课</option>
              <option value="多次课">多次课</option>
            </select>
          </div>
        </div>

        <div class="interval field">
          <label class="header">时间区间</label>
          <div class="inline fields">
            <div class="ui input">
              <input type="date" />
            </div>
            <span>-</span>
            <div class="ui input">
              <input type="date" />
            </div>
          </div>
        </div>

        <div class="ui config sgfield">
          <label class="header">人员配置</label>
          <div class="field">
            <i class="icon close"></i>
            <a href="#"><i class="icon primary edit"></i></a>
            <table>
              <tbody>
                <tr>
                  <td>课节次</td>
                  <td><span>周一 / 09:30-10:30 / 10:30-11:30</span>
                      <span>周一 / 09:30-10:30 / 10:30-11:30</span>
                  </td>
                </tr>
                <tr>
                  <td>教室</td>
                  <td>Lorem ipsum</td>
                </tr>
                <tr>
                  <td>班级</td>
                  <td>Lorem ipsum dolor </td>
                </tr>
                <tr>
                  <td>学生</td>
                  <td>Lorem ipsum dolor sit</td>
                </tr>
                <tr>
                  <td>老师</td>
                  <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="ui add sgfield">
              <a href="#">+添加配置</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CourseForm'
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

</style>
