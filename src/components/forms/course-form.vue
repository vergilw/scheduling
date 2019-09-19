<template>
  <div class="ui modal dimmable course">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加课程</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <InputComponent label="课程名称" name="title" v-bind:isRequired="true" v-bind:value="title"
          v-on:input="title = $event" />
        <SelectComponent
          label="课程类型"
          name="type"
          v-bind:itemsArray="courseTypeModels"
          v-bind:isRequired="true"
          v-bind:value="typeIndex"
          v-on:input="typeIndex = $event"
        />
        <SelectComponent
          label="消耗课时"
          name="cost"
          v-bind:itemsArray="costModels"
          v-bind:isRequired="true"
          v-bind:value="costIndex"
          v-on:input="costIndex = $event"
        />
        <LessonConfig/>
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
import SelectComponent from "../form-components/select-component.vue";
import InputComponent from "../form-components/input-component.vue";
import LessonConfig from "../config-components/lesson-config.vue";

export default {
  name: "CourseForm",
  computed: {
    formLoading: function() {
      return this.$store.state.courseForm.formLoading;
    },
    costModels: function() {
      return this.$store.state.global.courseTypeModels;
    },
    courseTypeModels: function() {
      return this.$store.state.global.courseTypeModels;
    },

    title: {
      get() {
        return this.$store.state.courseForm.title;
      },
      set(value) {
        this.$store.commit("courseForm/updateTitle", value);
      }
    },
    typeIndex: {
      get() {
        return this.$store.state.courseForm.typeIndex;
      },
      set(value) {
        this.$store.commit("courseForm/updateTypeIndex", value);
      }
    },
    costIndex: {
      get() {
        return this.$store.state.courseForm.costIndex;
      },
      set(value) {
        this.$store.commit("courseForm/updateCostIndex", value);
      }
    },
  },
  methods: {
  },
  components: {
    LessonConfig,
    SelectComponent,
    InputComponent
  },
  updated: function() {
    var component = this;
    $(".ui.modal.course .ui.form").form({
      fields: {
        title: {
          identifier: "title",
          rules: [
            {
              type: "regExp[/^\\S{2,16}$/]",
              prompt: "课程名称不能为空，长度2-16位"
            }
          ]
        },
        typeIndex: {
          identifier: "type",
          rules: [
            {
              type: "empty",
              prompt: "课程类型不能为空"
            }
          ]
        },
        costIndex: {
          identifier: "cost",
          rules: [
            {
              type: "empty",
              prompt: "消耗课时不能为空"
            }
          ]
        },
      },
      onSuccess: function(event, fields) {
        let type;
        if(component.$store.state.courseForm.id === null) {
          type = "courseForm/putCourse";
        } else {
          type = "courseForm/patchCourse";
        }

        component.$store.dispatch(type, function () {
          component.$store.commit("courseForm/reset");
          component.$store.dispatch('global/getCourses');
          $(".ui.modal.course").modal("hide");
        });
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
