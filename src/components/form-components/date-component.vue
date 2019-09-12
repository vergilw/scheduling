<template>
  <div class="ui input">
    <input
      type="text"
      onfocus="this.type='date'"
      onblur="this.type='text'"
      :placeholder="dateHolder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'DateComponent',
  props: {
    dateHolder: String,
    value: String,
  },
};
</script>

<style scoped>

</style>
