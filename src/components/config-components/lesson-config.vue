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
    import ConfigComponent from "../form-components/config-component.vue";

    export default {
        name: 'LessonConfig',
        computed: {
            lessonConfigModels: function() {
                return this.$store.state.courseForm.lessonItems;
            },
        },
        components: {
            ConfigComponent
        },
        methods: {
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
                            component.$store.commit("lessonForm/reset");
                            $(".ui.modal.period-subcourse .ui.form").form("clear");
                            $('.ui.sgfield > .ui.file.sgfield > .description').text("未选择任何文件").css("color","#9199a3");
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

                let element = this.$parent.$el;
                let component = this.$parent;

                console.log('positionIndex: ' + index);
                console.log('title: ' + this.$store.state.courseForm.lessonItems[index][0].value);
                console.log('fileTitle: ' + this.$store.state.courseForm.lessonItems[index][1].value);
                console.log('mediaTitle: ' + this.$store.state.courseForm.lessonItems[index][2].value);

                let itemData = {
                    positionIndex: index,
                    title: this.$store.state.courseForm.lessonItems[index][0].value,
                    fileTitle: this.$store.state.courseForm.lessonItems[index][1].value,
                    mediaTitle: this.$store.state.courseForm.lessonItems[index][2].value,
                };
                component.$store.commit("lessonForm/assign", itemData);

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
                            component.$store.commit("lessonForm/reset");
                            $(".ui.modal.period-subcourse .ui.form").form("clear");
                            $('.ui.sgfield > .ui.file.sgfield > .description').text("未选择任何文件").css("color","#9199a3");;
                        }
                    })
                    .modal("show");
            }
        }
    };
</script>

<style scoped>

</style>
