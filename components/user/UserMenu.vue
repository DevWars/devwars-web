<template>
    <div v-if="user" class="user-menu">
        <Popup>
             <template #trigger>
                <div class="user-group">
                    <Avatar v-if="user" :user="user" class="sm"/>
                    <div class="user-group__name">{{ user.username }}</div>
                </div>
            </template>
            <template #menu>
                <div>
                    <div class="arrow"></div>
                    <div class="menu inner">
                        <slot></slot>
                    </div>
                </div>
            </template>
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
    position: relative;
    // @include breakpoint(sm) {
    //     display: block;
    // }

    .menu {
        &.inner {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 9999;
            min-width: 50px;
            min-height: 32px;
            padding: 1px;
            text-align: left;
            white-space: normal;
            background-clip: padding-box;
            border: 1px solid #ccc;
            border: 1px solid rgba(0,0,0,.2);
            border-radius: 6px;
            -webkit-box-shadow: 0 5px 10px rgba(0,0,0,.2);
            box-shadow: 0 5px 10px rgba(0,0,0,.2);
        }
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
