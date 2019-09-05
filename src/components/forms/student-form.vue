<template>
  <div class="ui modal dimmable student">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加临时学生</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <SelectComponent
          label="班级"
          name="crowd"
          v-bind:itemsArray="crowdModels"
          v-bind:isRequired="true"
          v-bind:value="crowdIndex"
          v-on:input="crowdIndex = $event"
        />
        <SelectComponent
          label="学生"
          name="student"
          v-bind:itemsArray="studentModels"
          v-bind:isRequired="true"
          v-bind:value="studentIndex"
          v-on:input="studentIndex = $event"
        />

        <div class="ui error message"></div>
        <div class="action">
          <div class="ui submit button">确定</div>
        </div>
      </form>
      <div class="ui inverted dimmer" v-bind:class="{active: formLoading}">
        <div class="ui loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import InputComponent from "../form-components/input-component.vue";

export default {
  name: "StudentForm",
  data: function() {
      return {
          crowdIndex: null,
          studentIndex: null
      }
  },
  computed: {
    crowdModels: function() {
      return this.$store.state.global.crowdModels;
    }
  },
  components: {
    InputComponent
  },
  updated: function() {
    var component = this;
    $(".ui.modal.room .ui.form").form({
      fields: {
        crowd: {
          identifier: "crowd",
          rules: [
            {
              type: "empty",
              prompt: "班级不能为空"
            }
          ]
        },
        student: {
          identifier: "student",
          rules: [
            {
              type: "empty",
              prompt: "学生不能为空"
            }
          ]
        }
      },
      onSuccess: function(event, fields) {
        component.$store.commit("roomForm/updateFormLoading", true);

        setTimeout(function() {
          component.$store.commit("roomForm/updateFormLoading", false);
        }, 2000);
        return false;
      },
      onFailure: function(formErrors, fields) {
        return false;
      }
    });
  }
};
</script>

<style scoped>
.ui.modal > .fa-times {
  width: 72px;
  height: 72px;
  top: 0;
  right: 0;
  padding: 25px;
  color: #9199a3;
}

.ui.modal > .content {
  background-color: unset;
}

::-webkit-scrollbar {
  display: none;
}

.ui.modal > .content > .ui.form {
  margin: auto;
  max-width: 420px;
}

.ui.form > .action {
  width: 100%;
  text-align: center;
}

.ui.form > .action > .ui.submit.button {
  color: white;
  background-color: #00cddd;
  box-shadow: 0px 2px 11px 0px rgba(0, 205, 221, 0.2);
  border-radius: 4px;
}

@media only screen and (min-width: 1920px) {
  .ui.modal:not(.fullscreen) {
    width: 620px;
    margin: 0;
  }
}

@media only screen and (min-width: 1200px) {
  .ui.modal:not(.fullscreen) {
    width: 570px;
    margin: 0;
  }
}
@media only screen and (min-width: 992px) {
  .ui.modal:not(.fullscreen) {
    width: 520px;
    margin: 0;
  }
}
@media only screen and (min-width: 768px) {
  .ui.modal:not(.fullscreen) {
    width: 35%;
    margin: 0;
  }
}
</style>
