<template>
    <div
        class="obj-list__square"
        @click="$emit('change', !active)"
        @mouseover="hovered = true"
        @mouseleave="hovered = false"
        :style="{backgroundColor: highlighted ? colors[color] : ''}"
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
