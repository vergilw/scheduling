<template>
  <div>
    <router-view></router-view>
    <notifications group="hud" position="top center" />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>