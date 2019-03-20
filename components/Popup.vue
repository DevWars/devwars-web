<template>
    <div>
        <slot name="trigger"></slot>
        <div class="webui-popover-content">
            <slot name="menu"></slot>
        </div>
    </div>
</template>


<script>
/* global $ */
import jQuery from 'jquery';

export default {
    name: 'Popup',
    mounted() {
        const el = this.$slots.trigger[0].elm;
        const content = this.$slots.menu[0].elm;

        $(content).click(() => {
            $(el).webuiPopover('hide');
        });

        $(el).webuiPopover({
            type: 'html',
            content: jQuery(content),
            placement: 'bottom',
            animation: 'pop',
        });
    },
};
</script>


<style lang="scss">
@import '../assets/styles/utils';

.webui-popover {
    padding: 0 !important;
    border: none !important;
}

.webui-arrow:after {
    border-bottom-color: $bg-color-1 !important;
}

.webui-popover-content {
    padding-right: $m-space !important;
    background-color: $bg-color-1;

    a,
    button {
        display: block;
        margin: $xxs-space 0;
        text-transform: uppercase;
        font-size: $h6-font-size;
        color: $text-color-secondary;

        &:hover {
            color: $text-color-primary;
        }
    }
}
</style>
