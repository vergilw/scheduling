<template>
  <ConfigComponent
    label="课程时间配置"
    button="添加配置"
    :itemArray="configModels"
    @addConfig="addConfig"
    @remove="remove"
    @edit="edit"
  />
</template>

<script>
import ConfigComponent from "../form-components/config-component.vue";

export default {
  name: "CourseTimeConfig",
  computed: {
    configModels: function() {
      return this.$store.state.coursePeriodForm.periodItems;
    }
  },
  components: {
    ConfigComponent
  },
  methods: {
    addConfig: function() {
      var element = this.$parent.$el;
      var component = this.$parent;

      $(".ui.active.dimmable.modal:not(.class-time)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.class-time").modal("hide");
        }
      });

      $(".ui.modal.class-time")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            component.$store.commit("classTimeForm/reset");
            $(".ui.modal.class-time .ui.form").form("clear");
          }
        })
        .modal("show");
    },
    remove: function(index) {
      this.$store.commit("coursePeriodForm/deletePeriodItem", index);
    },
    edit: function(index) {
      var itemData = {
        positionIndex: index,
        weekdayIndex: this.$store.state.coursePeriodForm.periodItems[index][0].data,
        timeItemIndex: this.$store.state.coursePeriodForm.periodItems[index][1].data
      };
      this.$store.commit("classTimeForm/assign", itemData);

      var element = this.$parent.$el;
      var component = this.$parent;

      $(".ui.active.dimmable.modal:not(.class-time)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.class-time").modal("hide");
        }
      });

      $(".ui.modal.class-time")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            component.$store.commit("classTimeForm/reset");
            $(".ui.modal.class-time .ui.form").form("clear");
          }
        })
        .modal("show");
    }
  }
};
</script>

<style scoped>
</style>
