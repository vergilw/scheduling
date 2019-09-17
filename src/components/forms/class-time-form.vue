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
          v-bind:value="weekdayIndex"
          v-on:input="weekdayIndex = $event"
        />
        <SelectComponent
          label="时间段"
          name="time"
          v-bind:itemsArray="classTimeModels"
          v-bind:isRequired="true"
          v-bind:value="timeItemIndex"
          v-on:input="timeItemIndex = $event"
        />
        <div class="action">
          <div class="ui submit button">确定</div>
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
  computed: {
    weekdayModels: function() {
      return this.$store.state.global.weekdayModels;
    },
    classTimeModels: function() {
      return this.$store.state.global.classTimeModels;
    },

    weekdayIndex: {
      get() {
        return this.$store.state.classTimeForm.weekdayIndex;
      },
      set(value) {
        this.$store.commit("classTimeForm/updateWeekdayIndex", value);
      }
    },
    timeItemIndex: {
      get() {
        return this.$store.state.classTimeForm.timeItemIndex;
      },
      set(value) {
        this.$store.commit("classTimeForm/updateTimeItemIndex", value);
      }
    }
  },
  components: {
    SelectComponent,
    InputComponent
  },
  updated: function() {
    var component = this;
    $(".ui.modal.class-time .ui.form").form({
      fields: {
        weekday: {
          identifier: "weekday",
          rules: [
            {
              type: "empty",
              prompt: "周不能为空"
            }
          ]
        },
        time: {
          identifier: "time",
          rules: [
            {
              type: "empty",
              prompt: "时间不能为空"
            }
          ]
        }
      },
      onSuccess: function(event, fields) {
        var itemData = [
          {
            key: "每周",
            value:
              component.$store.state.global.weekdayModels[
                component.$store.state.classTimeForm.weekdayIndex
              ].name,
            data: component.$store.state.classTimeForm.weekdayIndex
          },
          {
            key: "时间",
            value:
              component.$store.state.global.classTimeModels[
                component.$store.state.classTimeForm.timeItemIndex
              ].name,
            data: component.$store.state.classTimeForm.timeItemIndex
          }
        ];
        component.$store.commit("coursePeriodForm/updatePeriodItem", {
          positionIndex: component.$store.state.classTimeForm.positionIndex,
          itemData: itemData
        });

        $(".ui.modal.class-time").modal("hide");

        component.$store.commit("classTimeForm/reset");
        $(".ui.modal.class-time .ui.form").form("clear");

        component.$notify({
          group: "hud",
          title: "添加成功",
          duration: 1500
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
