<template>
  <div class="field">
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
    placeholder: String
  }
};
</script>