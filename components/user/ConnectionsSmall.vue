<template>
    <div class="ConnectionsSmall">
        <Icon
            v-for="connection in connections"
            :key="connection.provider"
            :name="`brands/${connection.provider.toLowerCase()}`"
            :title="connection.username"
        />
    </div>
</template>

<script>
export default {
    name: 'ConnectionsSmall',

    props: {
        connections: {
            type: Array,
            default: () => [],
        },

        size: {
            type: String,
            required: false,
            default: 'md',
        },
    },
};
</script>

<style lang="scss" scoped>
.ConnectionsSmall {
    .Icon {
        margin: 5px;
    }
}
</style>
