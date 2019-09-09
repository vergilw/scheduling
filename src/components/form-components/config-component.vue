<template>
    <div class="interval field">
        <label class="header">{{label}}</label>
        <div class="ui config sgfield">
            <ConfigItemComponent
            v-for="item in itemArray"
            :course-config="construct(item)"
            :id="item.id"
            :key="item.id"
            @remove="remove"
            @edit="edit"
            />
        </div>
        <div class="ui add sgfield" @click="$emit('addConfig')">+{{button}}</div>
    </div>
</template>

<script>
    import ConfigItemComponent from './config-item-component.vue'

    export default {
        name: 'ConfigComponent',
        props: {
            label: String,
            button: String,
            itemArray: Array
        },
        components: {
            ConfigItemComponent
        },
        methods: {
            remove: function(id) {
                this.$emit('remove', id);
            },
            edit: function(id) {
                this.$emit('edit', id);
            },
            construct: function(item) {
                let arr = new Array();
                let time = new Object();
                time.key = item.time.key;
                time.value = initCourseTime2(item.time.value);
                arr.push(time);

                let room = new Object();
                room.key = item.room.key;
                room.value = item.room.value;
                arr.push(room);

                let crowd = new Object();
                crowd.key = item.crowd.key;
                crowd.value = item.crowd.value;
                arr.push(crowd);

                let teacher = new Object();
                teacher.key = item.teacher.key;
                teacher.value = item.teacher.value;
                arr.push(teacher);

                return arr;
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

    .field {
        font-size: 14px;
    }

    .ui.add.sgfield {
        cursor: pointer;
    }

</style>
