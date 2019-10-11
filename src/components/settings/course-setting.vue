<template>
  <div class="course" >
    <div
      v-for="model in models"
      :key="model.id"
      @click="onEditItem(model.id)"
      :data-id="model.id"
      class="item"
    >
      <div v-on:click.stop="onDeleteItem(model.id)" class="delete"><i class="fas fa-times"></i></div>
      <div class="title">课程</div>
      <div class="footer">{{ model.name }}</div>
    </div>
    <div @click="onNewItem" class="item append">
      <i class="fas fa-plus"></i>
      点击添加
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseSetting",
  computed: {
    models: function() {
      return this.$store.state.global.courseModels;
    }
  },
  methods: {
    onNewItem: function() {
      var element = this.$el;

      $(".ui.active.dimmable.modal:not(.course)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.course").modal("hide");
        }
      });

      $(".ui.modal.course")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
          }
        })
        .modal("show");
    },
    onEditItem: function(courseId) {
      let element = this.$el;
      let component = this;

      component.$store.dispatch("courseForm/getCourse", {courseId: courseId, completeCallback: function() {
        $(".ui.active.dimmable.modal:not(.course)").dimmer("show");
        $(element).dimmer({
          onHide: function() {
            $(".ui.modal.course").modal("hide");
          }
        });

        $(".ui.modal.course")
          .modal({
            autofocus: false,
            allowMultiple: true,
            onHidden: function() {
              $(element).dimmer("hide");
              component.$store.commit("courseForm/reset");
              $(".ui.modal.course .ui.form").form("clear");
            }
          })
          .modal("show");
      }});
    },
    onDeleteItem: function(courseId) {
      let component = this;
      component.$store.dispatch("courseForm/deleteCourse", {courseId: courseId, completeCallback: function() {
          component.$store.dispatch('global/getCourses');
      }});
    }
  }
};
</script>

<style scoped>
.course {
  display: flex;
  margin: -10px;
  flex-wrap: wrap;
}

.course > .item {
  margin: 10px;
}

.course > .item {
  width: 248px;
  height: 98px;
  background-color: #ffffff;
  box-shadow: 0px 8px 7px 0px rgba(52, 57, 61, 0.11);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #4b525a;
  cursor: pointer;
  position: relative;
}

.course > .item.append {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #9199a3;
  font-size: 12px;
}

.course > .item.append > svg {
  margin-right: 10px;
}

.course > .item > .delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  display: flex;
}

.course > .item > .delete > svg {
  margin: auto;
}

.course > .item > .title {
  font-size: 14px;
}

.course > .item > .footer {
  font-size: 12px;
}
</style>
