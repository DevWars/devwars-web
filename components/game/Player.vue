<template>
    <div class="Player">
        <User :user="user" :class="team.toLowerCase()" />

        <strong v-if="lang" class="language" :class="lang.toLowerCase()">{{ lang }}</strong>
    </div>
</template>

<script>
    import Component from 'nuxt-class-component';
    import Vue from 'vue';
    import { Prop } from 'vue-property-decorator';
    import User from '~/components/user/User';

    @Component({
        components: { User },
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

    .User {
        /deep/ .Avatar {
            border: $border-size solid transparent;
            border-radius: 50%;
        }
        &.blue /deep/ .Avatar { border-color: $brand-primary; }
        &.red /deep/ .Avatar { border-color: $brand-secondary; }
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
