<template>
  <div class="field" v-bind:class="{ required : isRequired }">
    <label>{{ label }}</label>
    <textarea v-if="isMultipleLines && isMultipleLines === true" rows="4"></textarea>
    <input v-else type="text" v-bind:name="name" v-bind:placeholder="placeholder"  v-model="getVal" />
    <span>{{getVal}}</span>
  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    isMultipleLines: Boolean,
    label: String,
    name: String,
    placeholder: String,
    isRequired: Boolean,
    value: String,
  },
  computed:{
    getVal: {
      get:function () {
        // return this.value;
        return this.$store.state.global.name;
      },
      set:function (newVal) {
        // this.$emit('input',val);
        this.$store.commit('updateVal', newVal)
      }
    },
  }
};
</script>

<style scoped>
.ui.form .field > input, .field > input {
  min-height: 40.42px;
}

.ui.form .field > label, .field > label {
  font-size: 14px;
}

.ui.form .field > input, .field > input,
.ui.form .field > textarea, .field > textarea {
  font-size: 14px;
}
</style>
