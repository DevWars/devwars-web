<template>
    <div
        class="obj-list__square"
        :style="{backgroundColor: highlighted ? colors[color] : ''}"
        @click="$emit('change', !active)"
        @mouseover="hovered = true"
        @mouseleave="hovered = false"
    ></div>
</template>


<script>
export default {
    name: 'SquareToggle',
    props: {
        color: {},
        active: {
            default: false,
        },
    },
    data: () => {
        return {
            colors: {
                blue: '#00c9ff',
                red: '#ff007d',
            },
            hovered: false,
        };
    },
    computed: {
        highlighted() {
            return this.hovered || this.active;
        },
    },
};
</script>
