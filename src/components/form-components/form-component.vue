<template>
  <form class="ui form">
    <InputComponent />
    <SelectComponent />
    
  </form>
</template>

<script>
import SelectComponent from './select-component.vue';
import InputComponent from './input-component.vue';

export default {
  name: "FormComponent",
  components: {
    SelectComponent,
    InputComponent
  }
};
</script>

<style scoped>
.ui.form {
  margin: auto;
  max-width: 420px;
}
</style>