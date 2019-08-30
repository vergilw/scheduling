<template>
    <div class="interval field">
        <label class="header">{{label}}</label>
        <div class="ui config sgfield">
            <CourseConfigItem
            v-for="item in itemArray"
            :course-config="item"
            :id="item.id"
            :key="item.id"
            />
        </div>
        <div class="ui add sgfield" @click="addConfig()">+添加配置</div>
    </div>
</template>

<script>
    import CourseConfigItem from './course-config-item.vue'

    export default {
        name: 'CourseConfig',
        props: {
            label: String,
            itemArray: Array
        },
        components: {
            CourseConfigItem
        },
        methods: {
            addConfig: function () {

            }
        }
    };
</script>

<style scoped>

</style>
