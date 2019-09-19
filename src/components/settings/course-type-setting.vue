<template>
  <div class="course-type" v-if="models">
    <div
      v-for="model in models"
      :key="model.id"
      @click="onEditItem(model)"
      :data-id="model.id"
      class="item"
    >
      <div v-on:click.stop="onDeleteItem(model.id)" class="delete"><i class="fas fa-times"></i></div>
      <div class="title">课程类型</div>
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
  name: "CourseTypeSetting",
  computed: {
    models: function() {
      return this.$store.state.global.courseTypeModels;
    }
  },
  methods: {
    onNewItem: function() {
      var element = this.$el;

      $(".ui.active.dimmable.modal:not(.course-type)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.course-type").modal("hide");
        }
      });

      $(".ui.modal.course-type")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
          }
        })
        .modal("show");
    },
    onEditItem: function(model) {

      this.$store.commit("courseTypeForm/assign", model);

      var element = this.$el;
      var component = this;

      $(".ui.active.dimmable.modal:not(.course-type)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.course-type").modal("hide");
        }
      });

      $(".ui.modal.course-type")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            component.$store.commit("courseTypeForm/reset");
            $(".ui.modal.course-type .ui.form").form("clear");
          }
        })
        .modal("show");
    },
    onDeleteItem: function(courseTypeID) {
      this.$store.dispatch("courseTypeForm/deleteCourseTypeByID", courseTypeID);
    }
  }
};
</script>

<style scoped>
.course-type {
  display: flex;
  margin: -10px;
}

.course-type > .item {
  margin: 10px;
}

.course-type > .item {
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

.course-type > .item.append {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #9199a3;
  font-size: 12px;
}

.course-type > .item.append > svg {
  margin-right: 10px;
}

.course-type > .item > .delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  display: flex;
}

.course-type > .item > .delete > svg {
  margin: auto;
}

.course-type > .item > .title {
  font-size: 14px;
}

.course-type > .item > .footer {
  font-size: 12px;
}
</style>