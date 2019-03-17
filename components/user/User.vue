<template>
    <div class="User">
        <Avatar :user="user" />
        <strong class="username">{{ user.username }}</strong>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Avatar from '~/components/user/Avatar';

    export default {
        name: "User",
        components: { Avatar },
        props: [
            'user'
        ]        
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

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
