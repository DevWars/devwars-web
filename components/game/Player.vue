<template>
    <component
        :is="navigateToProfile ? 'nuxt-link' : 'div'"
        class="Player hover"
        :to="navigateToProfile ? `/dashboard/${player.user.id}` : ''"
        @click="!navigateToProfile ? $emit('click') : () => {}"
    >
        <User
            :user="player.user"
            :class="team.name"
        />

        <div class="languages">
            <strong
                v-for="language in languages"
                :key="language"
                :class="language"
            >
                {{ language }}
            </strong>
        </div>
    </component>
</template>

<script>
import User from '@/components/user/User';

export default {
    name: 'Player',

    components: { User },

    props: {
        player: {
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
        navigateToProfile: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.hover:hover {
    background-color: rgba(#000, 0.2);
    cursor: pointer;
}

.Player {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $xs-space 0;
    color: inherit;

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
        font-size: $font-size-lg;
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
