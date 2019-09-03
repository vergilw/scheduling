<template>
  <div class="ui modal dimmable course">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加课程</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <InputComponent label="课程名称" name="name" v-bind:isRequired="true" />
        <SelectComponent
          label="课程类型"
          name="type"
          v-bind:itemsArray="courseTypeModels"
          v-bind:isRequired="true"
        />
        <SelectComponent
          label="消耗课时"
          name="cost"
          v-bind:itemsArray="costModels"
          v-bind:isRequired="true"
        />
        <div class="action">
          <div v-on:click="onSubmit" class="ui submit button">确定</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SelectComponent from "../form-components/select-component.vue";
import InputComponent from "../form-components/input-component.vue";

export default {
  name: "CourseForm",
  data: function() {
    return {
      costModels: [
      {
        'id': 1,
        'name': "1课时/次"
      },
      {
        'id': 2,
        'name': "2课时/次"
      },
      {
        'id': 3,
        'name': "3课时/次"
      },
      {
        'id': 4,
        'name': "4课时/次"
      },
      {
        'id': 5,
        'name': "5课时/次"
      }
    ]
    }
  },
  computed: {
    courseTypeModels: function() {
      return this.$store.state.global.courseTypeModels;
    }
  },
  methods: {
    onSubmit: function() {
      //   $(".ui.form").form({
      //     fields: {
      //       courseTitle: "empty",
      //       type: "empty",
      //       name: "empty",
      //       room: "empty",
      //       crowd: "empty",
      //       teacher: "empty",
      //       limitCapacity: "empty"
      //     }
      //   });
      //   if ($(".ui.form").form("is valid")) {
      //     console.log("true");
      //   } else {
      //     console.log("false");
      //   }
    }
  },
  components: {
    SelectComponent,
    InputComponent
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
