<template>
  <div class="ui modal dimmable students">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">编辑学生</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <InputComponent
          label="学生姓名"
          name="title"
          v-bind:isRequired="true"
          v-bind:value="title"
          v-on:input="title = $event"
        />
        <div class="ui error message"></div>
        <div class="action">
          <div class="ui submit button">确定</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputComponent from "../form-components/input-component.vue";

export default {
  name: "StudentsForm",
  computed: {
    formLoading: function() {
      return this.$store.state.studentsForm.formLoading;
    },
    title: {
      get() {
        return this.$store.state.studentsForm.title;
      },
      set(value) {
        this.$store.commit("crowdsForm/updateTitle", value);
      }
    }
  },
  components: {
    InputComponent
  },
  updated: function() {
    var component = this;
    $(".ui.modal.crowds .ui.form").form({
      fields: {
        title: {
          identifier: "title",
          rules: [
            {
              type: "empty",
              prompt: "名称不能为空"
            }
          ]
        }
      },
      onSuccess: function(event, fields) {
        // component.$store.dispatch("crowdsForm/patchCrowdByID", function() {
        //   $(".ui.modal.crowds").modal("hide");
        //   component.$store.commit("crowdsForm/reset");
        //   $(".ui.modal.crowds .ui.form").form("clear");
        // });

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
