<template>
  <div class="class-time" v-if="models">
    <div
      v-for="model in models"
      :key="model.id"
      @click="onEditItem(model)"
      :data-id="model.id"
      class="item"
    >
      <div v-on:click.stop="onDeleteItem(model.id)" class="delete"><i class="fas fa-times"></i></div>
      <div class="title">课程时间</div>
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
  name: "ClassTimeSetting",
  computed: {
    models: function() {
      return this.$store.state.global.classTimeModels;
    }
  },
  methods: {
    onNewItem: function() {
      let element = this.$el;
      let component = this;

      $(".ui.active.dimmable.modal:not(.lesson-time)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.lesson-time").modal("hide");
        }
      });

      $(".ui.modal.lesson-time")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            component.$store.commit("lessonTimeForm/reset");
          }
        })
        .modal("show");
    },
    onEditItem: function(model) {
      let element = this.$el;
      let component = this;

      component.$store.commit("lessonTimeForm/assign", model);

      $(".ui.active.dimmable.modal:not(.lesson-time)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.lesson-time").modal("hide");
        }
      });

      $(".ui.modal.lesson-time")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            component.$store.commit("lessonTimeForm/reset");
            $(".ui.modal.lesson-time .ui.form").form("clear");
          }
        })
        .modal("show");
    },
    onDeleteItem: function(lessonTimeId) {
      let component = this;
      this.$store.dispatch("lessonTimeForm/deleteLessonTime", {lessonTimeId: lessonTimeId,
        completeCallback: function () {
          component.$store.dispatch("global/getClassTime");
        }
      });
    }
  }
};
</script>

<style scoped>
.class-time {
  display: flex;
  margin: -10px;
  flex-wrap: wrap;
}

.class-time > .item {
  margin: 10px;
}

.class-time > .item {
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

.class-time > .item.append {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #9199a3;
  font-size: 12px;
}

.class-time > .item.append > svg {
  margin-right: 10px;
}

.class-time > .item > .delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  display: flex;
}

.class-time > .item > .delete > svg {
  margin: auto;
}

.class-time > .item > .title {
  font-size: 14px;
}

.class-time > .item > .footer {
  font-size: 12px;
}
</style>
