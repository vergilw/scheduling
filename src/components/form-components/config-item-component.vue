<template>
    <div class="field">
        <a class="remove" @click="$emit('remove', id)"><i class="fas fa-times"></i></a>
        <a class="edit" @click="$emit('edit', id)"><i class="icon primary edit"></i></a>
        <table>
            <tbody>
                <tr v-for="(item, index) in configArr" :key="index">
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
        configArr: Array,
        id: Number,
    },
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
