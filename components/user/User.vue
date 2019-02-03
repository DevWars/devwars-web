<template>
    <div class="User">
        <Avatar :user="user" />
        <strong class="username">{{ user.username }}</strong>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import Avatar from '~/components/user/Avatar';

    @Component({
        components: { Avatar },
        props: ['user']
    })
    export default class User extends Vue {}
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
