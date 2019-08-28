<template>
  <div class="field" v-bind:class="{ required : isRequired }">
    <label>{{ label }}</label>
    <textarea v-if="isMultipleLines && isMultipleLines === true" rows="4"></textarea>
    <input v-else type="text" v-bind:name="name" v-bind:placeholder="placeholder" v-bind:value="value" />
  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    isMultipleLines: Boolean,
    label: String,
    name: String,
    value: String,
    placeholder: String,
    isRequired: Boolean
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