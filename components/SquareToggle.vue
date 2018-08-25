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
    import Component from 'nuxt-class-component';
    import Vue from 'vue';

    import { Prop } from 'vue-property-decorator';

    @Component({})
    export default class extends Vue {
        @Prop() color;
        @Prop({default: false}) active;

        hovered = false;

        get highlighted() {
            return this.hovered || this.active;
        }

        colors = {
            'blue': '#00c9ff',
            'red': '#ff007d'
        }
    }
</script>
