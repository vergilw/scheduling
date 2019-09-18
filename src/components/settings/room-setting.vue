<template>
  <div class="room" v-if="models">
    <div
      v-for="model in models"
      :key="model.id"
      @click="onEditItem"
      :data-id="model.id"
      class="item"
    >
      <div v-on:click.stop="onDeleteItem(model.id)" class="delete"><i class="fas fa-times"></i></div>
      <div class="title">教室</div>
      <div class="footer">{{ model.name }}</div>
    </div>
    <div @click="onNewItem" class="item append">
      <i class="fas fa-plus"></i>
      点击添加
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomSetting",
  computed: {
    models: function() {
      return this.$store.state.global.roomModels;
    }
  },
  methods: {
    onNewItem: function() {
      var element = this.$el;

      $(".ui.active.dimmable.modal:not(.room)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.room").modal("hide");
        }
      });

      $(".ui.modal.room")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
          }
        })
        .modal("show");
    },
    onEditItem: function(event) {
      console.log($(event.target).attr('data-id'));

      var element = this.$el;
      var component = this;

      $(".ui.active.dimmable.modal:not(.room)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.room").modal("hide");
        }
      });

      $(".ui.modal.room")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            // component.$store.commit("transferStudentForm/reset");
            $(".ui.modal.room .ui.form").form("clear");
          }
        })
        .modal("show");
    },
    onDeleteItem: function(roomID) {
      console.log(roomID);
    }
  }
};
</script>

<style scoped>
.room {
  display: flex;
  margin: -10px;
}

.room > .item {
  margin: 10px;
}

.room > .item {
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

.room > .item.append {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #9199a3;
  font-size: 12px;
}

.room > .item.append > svg {
  margin-right: 10px;
}

.room > .item > .delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  display: flex;
}

.room > .item > .delete > svg {
  margin: auto;
}

.room > .item > .title {
  font-size: 14px;
}

.room > .item > .footer {
  font-size: 12px;
}
</style>