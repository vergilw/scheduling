<template>
  <div class="students setting">
    <div class="select crowds">
      <SelectComponent
        label="选择班级"
        name="crowd"
        v-bind:itemsArray="crowdModels"
        v-bind:value="crowdIndex"
        v-on:input="crowdIndex = $event"
      />
    </div>

    <div class="students" v-if="models">
      <div
        v-for="model in models"
        :key="model.id"
        @click="onEditItem(model)"
        :data-id="model.id"
        class="item">
        <div v-on:click.stop="onDeleteItem(model.id)" class="delete"><i class="fas fa-times"></i></div>
        <div class="title">学生</div>
        <div class="footer">{{ model.name }}</div>
      </div>
<!--      <div @click="onNewItem" class="item append">-->
<!--        <i class="fas fa-plus"></i>-->
<!--        点击添加-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
import SelectComponent from "../form-components/select-component.vue";

export default {
  name: "StudentsSetting",
  computed: {
    crowdModels: function() {
      return this.$store.state.global.crowdModels;
    },
    models: function() {
      return this.$store.state.crowdsForm.studentItems;
    },

    crowdIndex: {
      get() {
        return this.$store.state.studentsForm.crowdsIndex;
      },
      set(value) {
        this.$store.commit("studentsForm/updateCrowdsIndex", value);
        this.$store.commit("crowdsForm/clearStudentItems");
        let crowdsId = this.$store.state.global.crowdModels[value]["id"];
        this.$store.dispatch("crowdsForm/getStudentsByCrowdsId", crowdsId);
      }
    },
  },
  components: {
    SelectComponent
  },
  methods: {
    onEditItem: function(model) {
      // let element = this.$el;
      // let component = this;
      //
      // component.$store.commit("studentsForm/assign", model);
      //
      // $(".ui.active.dimmable.modal:not(.students)").dimmer("show");
      // $(element).dimmer({
      //   onHide: function() {
      //     $(".ui.modal.students").modal("hide");
      //   }
      // });
      //
      // $(".ui.modal.students")
      //   .modal({
      //     autofocus: false,
      //     allowMultiple: true,
      //     onHidden: function() {
      //       $(element).dimmer("hide");
      //       component.$store.commit("studentsForm/reset");
      //       $(".ui.modal.course .ui.form").form("clear");
      //     }
      //   })
      //   .modal("show");
    },
    onDeleteItem: function(studentID) {
      let component = this;
      let crowdsID = this.$store.state.global.crowdModels[this.crowdIndex]["id"];
      component.$store.dispatch("crowdsForm/deleteStudentById", {crowdsID: crowdsID, studentID: studentID,
        completeCallback: function () {
          component.$store.commit("crowdsForm/clearStudentItems");
          component.$store.dispatch("crowdsForm/getStudentsByCrowdsId", crowdsID);
        }
      });
    }
  }
};
</script>

<style scoped>

.students.setting > .select.crowds > .field {
  margin-bottom: 20px;
  color: white;
}

.students.setting > .students {
  display: flex;
  margin: -10px;
  flex-wrap: wrap;
}

.students.setting > .students > .item {
  margin: 10px;
}

.students.setting > .students > .item {
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

.students.setting > .students > .item.append {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #9199a3;
  font-size: 12px;
}

.students.setting > .students > .item.append > svg {
  margin-right: 10px;
}

.students.setting > .students > .item > .delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  display: flex;
}

.students.setting > .students > .item > .delete > svg {
  margin: auto;
}

.students.setting > .students > .item > .title {
  font-size: 14px;
}

.students.setting > .students > .item > .footer {
  font-size: 12px;
}
</style>
