<template>
    <div class="Player">
        <div class="user">
            <div class="avatar" :class="team.toLowerCase()">
                <Avatar :user="user" />
            </div>

            <div class="name">{{ user.username }}</div>
        </div>

        <strong v-if="lang" class="language" :class="lang.toLowerCase()">{{ lang }}</strong>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import { Prop } from 'vue-property-decorator';
    import Avatar from '~/components/user/Avatar';

    @Component({
        components: { Avatar },
        props: {
            user: Object,
            team: String,
            lang: String,
        },
    })
    export default class Player extends Vue {}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.Player {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $xs-space 0;

    &:hover {
        background-color: rgba(#000, 0.2);
        cursor: pointer;
    }

    .user {
        display: flex;
        align-items: center;
    }

    .avatar {
        border: $border-size solid transparent;
        border-radius: 50%;

        &.blue { border-color: $brand-primary; }
        &.red { border-color: $brand-secondary; }
    }

    .name {
        padding: 0 $xs-space;
        font-size: $h4-font-size;
    }

    .language {
        text-transform: uppercase;

        &.html { color: $html-color; }
        &.css { color: $css-color; }
        &.js, &.javascript { color: $js-color; }
    }
}
</style>
