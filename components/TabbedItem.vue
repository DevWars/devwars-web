<template>
    <div v-show="isActive" class="TabbedItem">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabbedItem',

    props: {
        name: { required: true, type: String },
        selected: { default: false, type: Boolean },
        default: { default: false, type: Boolean },
    },

    data() {
        return {
            isActive: false,
        };
    },

    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        },
    },

    mounted() {
        this.isActive = this.selected;
    },
};
</script>
