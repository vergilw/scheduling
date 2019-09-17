<template>
  <div class="hud" hidden>
    {{ value }}
  </div>
</template>

<script>
export default {
  name: "HUD",
  data: function() {
    return {
      value: null
    }
  },
  methods: {
    show: function(value) {
      console.log('aa');
      this.value = value;
      this.$el.show();
    }
  }
};
</script>

<style scoped>
.hud {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2000;
}
</style>