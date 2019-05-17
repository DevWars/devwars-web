<template>
    <div class="Player" @click="$emit('click')">
        <User :user="user" :class="team.name"/>

        <div class="languages">
            <strong v-for="language in languages" :key="language" :class="language">{{ language }}</strong>
        </div>
    </div>
</template>


<script>
import User from '@/components/user/User';

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
        languages: {
            type: Array,
            required: true,
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

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

    .languages > strong {
        display: inline-block;
        text-transform: uppercase;

        &:not(:first-child) {
            padding-left: 10px;
        }

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
