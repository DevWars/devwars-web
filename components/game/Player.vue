<template>
    <div class="Player">
        <User :user="user" :class="team.name.toLowerCase()"/>

        <strong v-if="language" class="language" :class="language.toLowerCase()">{{ language }}</strong>
    </div>
</template>


<script>
import User from '~/components/user/User';

export default {
    name: 'Player',
    components: { User },
    props: {
        user: {
            type: Object,
            required: true,
        },
        team: {
            type: Object,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
    },
};
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
        &.blue /deep/ .Avatar {
            border-color: $brand-primary;
        }
        &.red /deep/ .Avatar {
            border-color: $brand-secondary;
        }
    }

    .name {
        padding: 0 $xs-space;
        font-size: $h4-font-size;
    }

    .language {
        text-transform: uppercase;

        &.html {
            color: $html-color;
        }
        &.css {
            color: $css-color;
        }
        &.js,
        &.javascript {
            color: $js-color;
        }
    }
}
</style>
