<template>
  <div class="ui modal dimmable period-subcourse">
    <i class="fas fa-times close icon"></i>
    <div class="header">
      <div class="title">添加课件</div>
    </div>
    <div class="scrolling content">
      <form class="ui form">
        <InputComponent
          label="标题"
          name="title"
          v-bind:isRequired="true"
          v-bind:value="title"
          v-on:input="title = $event"
        />
        <div class="field">
          <div class="inline fields">
            <FileComponent
            label="文件"
            id="file"
            name="file_title"
            v-bind:value="file_title"
            v-on:input="file_title = $event"
            />
            <FileComponent
            label="媒体文件"
            name="media_title"
            id="media_file"
            v-bind:value="media_title"
            v-on:input="media_title = $event"
            />
          </div>
        </div>
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
import FileComponent from "../form-components/file-component.vue";

export default {
  name: "LessonForm",
  components: {
    InputComponent,
    FileComponent,
  },
  computed:{
    title: {
      get() {
        return this.$store.state.lessonForm.title
      },
      set(value) {
        this.$store.commit('updateTitle',value);
      }
    },
    formLoading: function(){
      return this.$store.state.roomForm.formLoading;
    },
    file_title: {
      get(){
        return this.$store.state.lessonForm.file_title
      },
      set(value) {
        this.$store.commit('updateFileTitle',value);
      }
    },
    media_title: {
      get(){
        return this.$store.state.lessonForm.media_title
      },
      set(value) {
        this.$store.commit('updateMediaFileTitle',value);
      }
    },
  },
  updated: function() {
    var component = this;
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
      },
      onSuccess: function(event, fields) {
        console.log(212121);
        component.$store.commit("updateFormLoading", true);

        setTimeout(function(){
          component.$store.commit("updateFormLoading",false);
        },2000);
        return false;
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
