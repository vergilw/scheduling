<template>
  <div class="crowds" v-if="models">
    <div
      v-for="model in models"
      :key="model.id"
      @click="onEditItem(model)"
      :data-id="model.id"
      class="item"
    >
      <div v-on:click.stop="onDeleteItem(model.id)" class="delete"><i class="fas fa-times"></i></div>
      <div class="title">班级</div>
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
  name: "CrowdsSetting",
  computed: {
    models: function() {
      return this.$store.state.global.crowdModels;
    }
  },
  methods: {
    onNewItem: function() {
      let element = this.$el;
      let component = this;

      component.$store.commit("crowdsForm/reset");
      $(".ui.active.dimmable.modal:not(.crowds)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.crowds").modal("hide");
        }
      });

      $(".ui.modal.crowds")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            component.$store.commit("crowdsForm/reset");
          }
        })
        .modal("show");
    },
    onEditItem: function(model) {
      let element = this.$el;
      let component = this;

      component.$store.commit("crowdsForm/assign", model);

      $(".ui.active.dimmable.modal:not(.crowds)").dimmer("show");
      $(element).dimmer({
        onHide: function() {
          $(".ui.modal.crowds").modal("hide");
        }
      });

      $(".ui.modal.crowds")
        .modal({
          autofocus: false,
          allowMultiple: true,
          onHidden: function() {
            $(element).dimmer("hide");
            component.$store.commit("crowdsForm/reset");
            $(".ui.modal.course .ui.form").form("clear");
          }
        })
        .modal("show");
    },
    onDeleteItem: function(crowdsID) {
      let component = this;
      component.$store.dispatch("crowdsForm/deleteCrowdByID", {crowdsID: crowdsID, completeCallback: function() {
          component.$store.dispatch('global/getCrowds');
      }});
    }
  }
};
</script>

<style scoped>
.crowds {
  display: flex;
  margin: -10px;
  flex-wrap: wrap;
}

.crowds > .item {
  margin: 10px;
}

.crowds > .item {
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

.crowds > .item.append {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #9199a3;
  font-size: 12px;
}

.crowds > .item.append > svg {
  margin-right: 10px;
}

.crowds > .item > .delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  display: flex;
}

.crowds > .item > .delete > svg {
  margin: auto;
}

.crowds > .item > .title {
  font-size: 14px;
}

.crowds > .item > .footer {
  font-size: 12px;
}
</style>
