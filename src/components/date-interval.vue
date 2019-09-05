<template>
    <div class="interval field">
        <label class="header">{{label}}</label>
        <div class="inline fields">
            <date-component date-holder="选择开始时间" :value="start" @input="start = $event"></date-component>
            <span class="span">-</span>
            <date-component date-holder="选择结束时间" :value="end" @input="end = $event"></date-component>
        </div>
    </div>
</template>

<script>
  import DateComponent from './form-components/date-component.vue'

  export default {
    name: 'DateInterval',
    props: {
        label: String,
        startDate: String,
        endDate: String
    },
    computed: {
        start: {
            get() {

            },
            set(value) {
                this.$emit('inputStartDate', value);
            }
        },
        end: {
            get() {

            },
            set(value) {
                this.$emit('inputEndDate', value);
            }
        }
    },
    components: {
      'date-component': DateComponent
    },
  };
</script>

<style scoped>

    .field {
        font-size: 14px;
    }

    .span {
        margin: 5px;
    }

</style>
