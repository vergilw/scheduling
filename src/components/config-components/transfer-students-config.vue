<template>
  <ConfigComponent
    label="临时学生"
    button="添加其他班级学生"
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
      return this.$store.state.scheduleForm.transferStudentItems;
    }
  },
  components: {
    ConfigComponent
  },
  methods: {
    addConfig: function() {
      var element = this.$parent.$el;
      var component = this.$parent;

      $(".ui.active.dimmable.modal:not(.transfer-student)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.transfer-student").modal("hide");
        }
      });

      $(".ui.modal.transfer-student")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            component.$store.commit("transferStudentForm/reset");
            $(".ui.modal.transfer-student .ui.form").form("clear");
          }
        })
        .modal("show");
    },
    remove: function(index) {
      this.$store.commit("scheduleForm/deleteTransferStudentItem", index);
    },
    edit: function(index) {
        console.log(this.$store.state.scheduleForm.transferStudentItems);
      var itemData = {
        positionIndex: index,
        crowdIndex: this.$store.state.scheduleForm.transferStudentItems[index][0].data,
        studentIndex: this.$store.state.scheduleForm.transferStudentItems[index][1].data
      };
      this.$store.commit("transferStudentForm/assign", itemData);
      this.$store.dispatch("transferStudentForm/getStudents");

      var element = this.$parent.$el;
      var component = this.$parent;

      $(".ui.active.dimmable.modal:not(.transfer-student)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.transfer-student").modal("hide");
        }
      });

      $(".ui.modal.transfer-student")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            component.$store.commit("transferStudentForm/reset");
            $(".ui.modal.transfer-student .ui.form").form("clear");
          }
        })
        .modal("show");
    }
  }
};
</script>

<style scoped>
</style>
