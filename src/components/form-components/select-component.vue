<template>
  <div v-if="itemsArray && itemsArray.length > 1" class="equal width fields">
    <div v-for="(items, index) in itemsArray" class="field" v-bind:class="{ first : (index === 0) }" v-bind:key="index">
      <label v-if="index === 0" class="header">{{ label }}</label>
      <select class="ui selection dropdown">
        <option v-for="item in items" v-bind:value="item.name" v-bind:key="item.id">{{ item.name }}</option>
      </select>
    </div>
  </div>
  <div v-else-if="itemsArray" class="field">
    <label class="header">{{ label }}</label>
    <select class="ui selection dropdown">
      <option
        v-for="item in itemsArray[0]"
        v-bind:value="item.name"
        v-bind:key="item.id"
      >{{ item.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    label: String,
    itemsArray: Array
  },
  mounted: function() {
    $(".field .ui.dropdown").dropdown();
  }
};
</script>

<style scoped>
.equal.width.fields > .field:not(.first) {
  display: flex;
  align-items: flex-end;
}
</style>