<template>
    <div class="User">
        <Avatar :user="user" :class="size" />
        <strong class="username">{{ user.username }}</strong>
        <ConnectionsSmall :connections="user.connections" />
    </div>
</template>

<script>
import Avatar from '@/components/user/Avatar';
import ConnectionsSmall from '@/components/user/ConnectionsSmall';

export default {
    name: 'User',
    components: { Avatar, ConnectionsSmall },
    props: {
        user: {
            type: Object,
            required: true,
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
@import 'utils.scss';

.User {
    display: flex;
    align-items: center;
    line-height: 1;

    .username {
        margin-left: 10px;
        margin-right: 10px;
    }
}
</style>
