<template>
    <div class="field">
        <a class="remove" @click="remove()"><i class="fas fa-times"></i></a>
        <a class="edit" href="#"><i class="icon primary edit"></i></a>
        <table>
            <tbody>
                <tr v-for="(item, index) in courseConfig" :key="index">
                    <td>{{item.key}}</td>
                    <td v-if="item.value instanceof Array">
                        <span v-for="(spanItem, spanIndex) in item.value" :key="spanIndex">
                            {{spanItem}}
                        </span>
                    <td v-else>
                        {{item.value}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'CourseConfigItem',
    props: {
        courseConfig: Array,
        id: Number,
    },
    methods: {
        remove: function () {
            let models = this.$store.state.global.courseConfigModels;

            // let deleteIndex = 0;
            // this.$store.state.courseConfigModels.forEach(function (model, index) {
            //     if(model.id === id) {
            //         deleteIndex = index;
            //     }
            // });
            // models.splice(deleteIndex, 1);

            models.splice(0, 1);

            this.$store.commit('global/courseConfigModelsUpdated', models);
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
