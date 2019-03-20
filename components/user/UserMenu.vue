<template>
    <div v-if="user" class="user-menu">
        <Popup>
            <div slot="trigger" class="user-group">
                <Avatar v-if="user" :user="user" class="sm"/>
                <div class="user-group__name">{{ user.username }}</div>
            </div>
            <div slot="menu" class="menu">
                <slot></slot>
            </div>
        </Popup>
    </div>
</template>


<script>
import Popup from '~/components/Popup';
import Avatar from '~/components/user/Avatar';

export default {
    name: 'UserMenu',
    components: { Popup, Avatar },
    props: {
        'user': {
            type: Object,
            required: true,
        },
    },
};
</script>


<style lang="scss" scoped>
@import '../../assets/styles/utils';

.user-menu {
    cursor: pointer;
    user-select: none;

    @include breakpoint(sm) {
        display: block;
    }
}

.user-group {
    .user-avatar,
    &__name {
        @extend %align-middle;
    }

    &__name {
        margin-left: $xs-space;
        margin-right: $xs-space;
        font-weight: $font-weight-bold;
        line-height: 1;
    }

    &__meta {
        display: block;
        margin-top: $xxxs-space;
        font-size: $h6-font-size;
        color: $p-color;
    }
}

.menu /deep/ > .divider {
    border-top: 1px solid $divider-color;
    margin: $xxs-space 0;
}
</style>
