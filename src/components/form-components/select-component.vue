<template>
  <div
    v-if="itemsArray && itemsArray.length > 1 && Array.isArray(itemsArray[0])"
    class="equal width fields"
    v-bind:class="{ required : isRequired }"
  >
    <div
      v-for="(items, index) in itemsArray"
      class="field"
      v-bind:class="{ first : (index === 0) }"
      v-bind:key="index"
    >
      <label v-if="index === 0" class="header">{{ label }}</label>

      <div class="ui selection dropdown">
        <input type="hidden" v-bind:name="name" />
        <i class="dropdown icon"></i>
        <div class="default text"></div>
        <div class="menu">
          <div
            class="item"
            v-for="(item, index) in items"
            v-bind:key="index"
            v-bind:data-value="index"
          >{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else-if="itemsArray && itemsArray.length > 0 && itemsArray[0] != null"
    class="field"
    v-bind:class="{ required : isRequired }"
  >
    <label class="header">{{ label }}</label>

    <div class="ui selection dropdown">
      <input type="hidden" v-bind:name="name" />
      <i class="dropdown icon"></i>
      <div class="default text"></div>
      <div class="menu">
        <div
          class="item"
          v-for="(item, index) in itemsArray"
          v-bind:key="index"
          v-bind:data-value="index"
          v-on:click="$emit('onChangeOption', name, index)"
        >{{ item.name }}</div>
        <div v-if="newText" v-on:click="$emit('onNewOption', name)" class="new">
          <i class="fas fa-plus"></i>
          {{ newText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    label: String,
    name: String,
    itemsArray: Array,
    isRequired: Boolean,
    newText: String
  },
  methods:{
    changeValue:function(value){
      $(".field > .ui.dropdown > .text").html(value);
      $(".field > .ui.dropdown .item").removeClass("active selected");
    }
  },
  updated: function() {
    $(".field .ui.dropdown").dropdown();
  }
};
</script>

<style scoped>
.equal.width.fields > .field:not(.first) {
  display: flex;
  align-items: flex-end;
}

.equal.width.fields > .field > label,
.field > label,
.ui.form .field > label {
  font-size: 14px;
}

.field > .ui.dropdown > .text,
.field > .ui.dropdown > .menu > .item {
  font-size: 14px;
}

.field > .ui.dropdown > .menu > .new {
  padding: 0 18px;
  line-height: 41px;
  font-size: 14px;
  height: 41px;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  color: #00cddd;
  cursor: pointer;
}
</style>
