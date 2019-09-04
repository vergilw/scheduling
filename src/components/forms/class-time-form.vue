<template>
  <div class="ui modal dimmable class-time">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加课程时间</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <SelectComponent
          label="每周几"
          name="weekday"
          v-bind:itemsArray="weekdayModels"
          v-bind:isRequired="true"
        />
        <SelectComponent
          label="时间段"
          name="time"
          v-bind:itemsArray="classTimeModels"
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
  name: "ClassTimeForm",
  data: function() {
    return {
      weekdayModels: [
        {
          id: 1,
          name: "每周一"
        },
        {
          id: 2,
          name: "每周二"
        },
        {
          id: 3,
          name: "每周三"
        },
        {
          id: 4,
          name: "每周四"
        },
        {
          id: 5,
          name: "每周五"
        },
        {
          id: 6,
          name: "每周六"
        },
        {
          id: 7,
          name: "每周日"
        }
      ]
    };
  },
  computed: {
    classTimeModels: function() {
      return this.$store.state.global.classTimeModels;
    }
  },
  components: {
    SelectComponent,
    InputComponent
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
