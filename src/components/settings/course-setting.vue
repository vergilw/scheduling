<template>
  <div class="course" >
    <div
      v-for="model in models"
      :key="model.id"
      @click="onEditItem"
      :data-id="model.id"
      class="item"
    >
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
    onEditItem: function(event) {
      console.log($(event.target).attr("data-id"));

      var element = this.$el;
      var component = this;

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
            // component.$store.commit("transferStudentForm/reset");
            $(".ui.modal.course .ui.form").form("clear");
          }
        })
        .modal("show");
    }
  }
};
</script>

<style scoped>
.course {
  display: flex;
  margin: -10px;
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

.course > .item > .title {
  font-size: 14px;
}

.course > .item > .footer {
  font-size: 12px;
}
</style>