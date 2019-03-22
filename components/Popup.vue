<template>
    <div>
        <div  @click.prevent="showPopUp = !showPopUp">
            <slot name="trigger"></slot>
        </div>
        <div  v-if="showPopUp" class="">
            <slot name="menu"></slot>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Popup',
    data: () => {
        return {
            showPopUp: false,
        }
    },
};
</script>


<style lang="scss">
@import '../assets/styles/utils';
// .webui-arrow:after {
//     border-bottom-color: $bg-color-1 !important;
// }

// .webui-popover-content {
//     padding-right: $m-space !important;
//     background-color: $bg-color-1;

//     a,
//     button {
//         display: block;
//         margin: $xxs-space 0;
//         text-transform: uppercase;
//         font-size: $h6-font-size;
//         color: $text-color-secondary;

//         &:hover {
//             color: $text-color-primary;
//         }
//     }
// }
</style>
