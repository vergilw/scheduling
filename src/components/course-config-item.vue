<template>
    <div class="field">
        <a class="remove" @click="remove(id)"><i class="fas fa-times"></i></a>
        <a class="edit" href="#"><i class="icon primary edit"></i></a>
        <table>
            <tbody>
                <tr>
                    <td>课节次</td>
                    <td>
                        <span v-for="item in courseConfig.time" :key="item.id">
                            {{initCourseTime(item)}}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>教室</td>
                    <td>{{courseConfig.room.name}}</td>
                </tr>
                <tr>
                    <td>班级</td>
                    <td>{{courseConfig.crowd.name}}</td>
                </tr>
                <tr>
                    <td>学生</td>
                    <td>{{courseConfig.students.count}}</td>
                </tr>
                <tr>
                    <td>老师</td>
                    <td>{{courseConfig.teacher.name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'CourseConfigItem',
    props: {
        courseConfig: Object,
        id: Number,
    },
    methods: {
        initCourseTime: function(time) {
            let intervals = "";
            time['intervals'].forEach(function (interval) {
                intervals += ("/" +　interval['duration']);
            });
            return time['week'] + intervals;
        },
        remove: function (id) {
            let models = this.$store.state.courseConfigModels;

            let deleteIndex = 0;
            this.$store.state.courseConfigModels.forEach(function (model, index) {
                if(model.id === id) {
                    deleteIndex = index;
                }
            });
            models.splice(deleteIndex, 1);

            this.$store.commit('courseConfigModelsUpdated', models);
        }
    }
  };
</script>

<style scoped>

    .remove {
        position: absolute;
        top: 6px;
        right: 16px;
    }

    td:last-child {
        vertical-align: text-top;
    }

</style>
