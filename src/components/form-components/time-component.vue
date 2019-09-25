<template>
  <div class="field">
    <label class="header">{{ label }}</label>
    <div class="horizontal">
      <input id="start-time" type="text" :value="startTime" placeholder="开始时间" />
      <input id="end-time" type="text" :value="endTime" placeholder="结束时间" />
    </div>
  </div>
</template>

<script>
import TimePicker from "timepicker.js";

export default {
  name: "TimeComponent",
  props: {
    name: String,
    label: String,
    startTime: String,
    endTime: String
  },
  mounted: function() {
    let component = this;
    var timepicker = new TimePicker(["start-time", "end-time"], {
      lang: "en",
      theme: "blue-grey"
    });
    timepicker.on("change", function(evt) {
      var value = (evt.hour || "00") + ":" + (evt.minute || "00");
      evt.element.value = value;

      if(evt.element.id === "start-time") {
        component.$emit("changeStartTime", value);
      } else if(evt.element.id === "end-time") {
        component.$emit("changeEndTime", value);
      }
    });
  }
};
</script>

<style src='timepicker.js/dist/timepicker.min.css'>
/* global styles */
</style>

<style scoped>
.field > label,
.ui.form .field > label {
  font-size: 14px;
  color: #4b525a;
}

.field > .horizontal,
.ui.form .field > .horizontal {
  display: flex;
  justify-content: space-between;
}

.field > .horizontal > input,
.ui.form .field > .horizontal > input {
  width: 45%;
  font-size: 14px;
  color: #4b525a;
}
</style>
