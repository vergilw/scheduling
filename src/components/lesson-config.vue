<template>
    <ConfigComponent
        label="课件"
        button="添加课件"
        :itemArray="lessonConfigModels"
        @addConfig="addConfig"
        @remove="remove"
        @edit="edit"
    />
</template>

<script>
    import ConfigComponent from "./form-components/config-component.vue";

    export default {
        name: 'LessonConfig',
        computed: {
            lessonConfigModels: function() {
                return null;
                // return this.$store.state.global.courseConfigModels;
            },
        },
        components: {
            ConfigComponent
        },
        methods: {
            construct: function(item) {
                let arr = new Array();

                return arr;
            },
            addConfig: function () {
                $(".ui.modal.period-subcourse").dimmer("hide");
                $(".ui.modal.period-subcourse")
                    .modal({ autofocus: false, allowMultiple: true })
                    .modal("show");
            },
            remove: function (id) {
                console.log("lesson remove");
            },
            edit: function (id) {
                console.log('lesson edit');
            }
        }
    };
</script>

<style scoped>

</style>
