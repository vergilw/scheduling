<template>
  <div class="ui modal dimmable room">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加教室</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <InputComponent
          label="教室名称"
          name="title"
          v-bind:isRequired="true"
          v-bind:value="title"
          v-on:input="title = $event"
        />
        <InputComponent
          label="限制人数"
          name="capacity"
          v-bind:isRequired="true"
          v-bind:value="capacity"
          v-on:input="capacity = $event"
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
  name: "RoomForm",
  computed: {
    formLoading: function() {
      return this.$store.state.roomForm.formLoading;
    },

    title: {
      get() {
        return this.$store.state.roomForm.title;
      },
      set(value) {
        this.$store.commit("roomForm/updateTitle", value);
      }
    },
    capacity: {
      get() {
        return this.$store.state.roomForm.capacity;
      },
      set(value) {
        this.$store.commit("roomForm/updateCapacity", value);
      }
    }
  },
  components: {
    InputComponent
  },
  updated: function() {
    var component = this;
    $(".ui.modal.room .ui.form").form({
      fields: {
        title: {
          identifier: "title",
          rules: [
            {
              type: "regExp[/^\\S{2,16}$/]",
              prompt: "教室名称不能为空，长度2-16位"
            }
          ]
        },
        capacity: {
          identifier: "capacity",
          rules: [
            {
              type: "regExp[/^[1-9]{1}[0-9]*$/]",
              prompt: "限制人数必须为有效数字"
            }
          ]
        }
      },
      onSuccess: function(event, fields) {
        console.log("t");
        component.$store.commit("roomForm/updateFormLoading", true);

        setTimeout(function() {
          component.$store.commit("roomForm/updateFormLoading", false);
        }, 2000);
        return false;
      },
      onFailure: function(formErrors, fields) {
        console.log("f");
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
