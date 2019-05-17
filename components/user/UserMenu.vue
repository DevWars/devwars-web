<template>
    <div v-if="user" class="UserMenu">
        <Popup>
            <template #trigger>
                <User size="sm" :user="user"/>
            </template>
            <template #menu="{close}">
                <div>
                    <div class="arrow"></div>
                    <div class="menu">
                        <slot :close="close"></slot>
                    </div>
                </div>
            </template>
        </Popup>
    </div>
</template>


<script>
import Popup from '~/components/Popup';
import User from '~/components/user/User';

export default {
    name: 'UserMenu',
    components: { Popup, User },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.UserMenu {
    cursor: pointer;
    user-select: none;
    position: relative;

    .menu {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        z-index: $zindex-popover;
        min-width: 150px;
        padding: 10px 0;
        background-color: $bg-color-2;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

        &:before {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 100%;
            display: block;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            border-width: 10px;
            border-bottom-color: $bg-color-2;
            transform: translateX(-50%);
        }
    }
}

.menu /deep/ {
    .divider {
        border-top: 1px solid $divider-color;
        margin: $xxs-space 0;
    }

    a,
    button {
        display: block;
        width: 100%;
        color: $text-color-secondary;
        text-align: left;

        &:hover {
            color: $text-color-primary;
        }
    }
}
</style>
