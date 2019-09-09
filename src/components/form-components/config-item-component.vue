<template>
    <div class="ui config sgfield">
        <a class="remove" @click="$emit('remove', index)">
            <i class="fas fa-times"></i>
        </a>
        <a class="edit" @click="$emit('edit', index)">
            <i class="icon primary edit"></i>
        </a>
        <table>
            <tbody>
                <tr v-for="(item, intemIndex) in courseConfig" :key="intemIndex">
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
    name: 'ConfigItemComponent',
    props: {
        courseConfig: Array,
        index: Number,
    },
  };
</script>

<style scoped>

    .ui.config.sgfield > a.remove > svg {
        position: absolute;
        right: 14px;
        top: 10px;
        color: #9199a3;
    }

    .ui.config.sgfield > a.edit > i {
        bottom: 10px;
    }

</style>
