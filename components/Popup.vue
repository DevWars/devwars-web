<template>
    <div class="Popup">
        <div @click.prevent="showPopUp = !showPopUp">
            <slot name="trigger"></slot>
        </div>
        <div v-if="showPopUp" v-closable="{handler: close, outSideFrom: '.menu'}" class="menu">
            <div class="arrow"></div>
            <slot name="menu" :close="close"></slot>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Popup',

    data: () => ({
        showPopUp: false,
    }),

    methods: {
        close() {
            this.showPopUp = !this.showPopUp;
        },
    },
};
</script>


<style lang="scss">
@import 'utils.scss';

.Popup {
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

    .menu /deep/ {
        .divider {
            border-top: 1px solid $divider-color;
            margin: $xxs-space 0;
        }

        a,
        button {
            display: block;
            width: 100%;
            background-color: transparent;
            color: $text-color-secondary;
            text-align: left;

            &:hover {
                background-color: $bg-color-3;
                color: #fff;
            }
        }
    }
}
</style>
