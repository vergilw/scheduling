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
                // return null;
                return this.$store.state.courseForm.lessonItems;
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
                var element = this.$parent.$el;
                var component = this.$parent;

                $(".ui.active.dimmable.modal:not(.period-subcourse)").dimmer("show");
                $(element).dimmer({
                    onHide: function() {
                        $(".ui.modal.period-subcourse").modal("hide");
                    }
                });

                $(".ui.modal.period-subcourse")
                    .modal({
                        autofocus: false,
                        allowMultiple: true,
                        onHidden: function() {
                            $(element).dimmer("hide");
                            // component.$store.commit("classTimeForm/reset");
                            $(".ui.modal.period-subcourse .ui.form").form("clear");
                        }
                    })
                    .modal("show");
            },
            remove: function (index) {
                console.log("lesson remove");
                this.$store.commit("courseForm/deleteLessonItems", index);
            },
            edit: function (index) {
                console.log('lesson edit');
                // var itemData = {
                //     positionIndex: index,
                //     weekdayIndex: this.$store.state.courseForm.lessonItems[index][0].data,
                //     timeItemIndex: this.$store.state.courseForm.lessonItems[index][1].data
                // };
                // this.$store.commit("classTimeForm/assign", itemData);

            }
        }
    };
</script>

<style scoped>

</style>
