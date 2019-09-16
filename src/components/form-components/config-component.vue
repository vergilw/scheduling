<template>
    <div class="interval field" :class="{required: isRequired}">
        <label class="header">{{label}}</label>
        <ConfigItemComponent
        v-for="(item, index) in itemArray"
        :course-config="item"
        :index="index"
        :key="index"
        @remove="remove"
        @edit="edit"
        />
        <div class="ui add sgfield" @click="$emit('addConfig')">
            <i class="fas fa-plus"></i>
            {{button}}
        </div>
    </div>
</template>

<script>
    import ConfigItemComponent from './config-item-component.vue'

    export default {
        name: 'ConfigComponent',
        props: {
            label: String,
            button: String,
            isRequired: Boolean,
            itemArray: Array
        },
        components: {
            ConfigItemComponent
        },
        methods: {
            remove: function(index) {
                this.$emit('remove', index);
            },
            edit: function(index) {
                this.$emit('edit', index);
            },
        }
    };

    function initCourseTime2(time) {
        let timeArr = new Array();

        if(time.length > 0) {
            time.forEach(function (timeItem) {
                let intervals = "";
                timeItem['intervals'].forEach(function (interval) {
                    intervals += (" / " +　interval['duration']);
                });
                let timeStr = timeItem['week'] + intervals;
                timeArr.push(timeStr);
            })
        }

        return timeArr;
    };
</script>

<style scoped>

    .interval.field > label,
    .add.ui.sgfield {
        font-size: 14px;
    }

    .ui.add.sgfield {
        cursor: pointer;
    }

</style>
