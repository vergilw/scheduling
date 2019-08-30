<template>
  <div class="ui modal dimmable period-subcourse">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加子课程</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <InputComponent
          label="标题"
          name="name"
          v-bind:isRequired="true"
        />
        <FileComponent/>
        <div class="action">
          <div v-on:click="onSubmit" class="ui submit button">确定</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputComponent from "./form-components/input-component.vue";
import FileComponent from "./form-components/file-component.vue";

export default {
  name: "SubcourseForm",
  data: function() {
    return {
    };
  },
  components: {
    InputComponent,
    FileComponent
  },
  methods: {
    onSubmit: function() {
      this.isLoading = true;
      var obj = this;
      setTimeout(function() {
        if ($(".ui.form").form("is valid") == true) {
          console.log("true");
        } else {
          console.log("false");
        }
        obj.isLoading = false;
      }, 2000);

      console.log(this.courseTitle);
    }
  },
  updated: function() {
    $(".ui.form").form({
      fields: {
        name: {
          identifier: "name",
          rules: [
            {
              type: "regExp[/^\\S{4,16}$/]",
              prompt: "标题不能为空，长度4-16位"
            }
          ]
        },
      }
    });
  }
}
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
