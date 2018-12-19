<template>
    <div class="ModPanel">
        <ModSidebar />

        <div class="main">
            <nuxt/>
        </div>
    </div>
</template>

<script>
import Component from 'nuxt-class-component';
import Vue from 'vue';

import ModSidebar from '~/components/mod/ModSidebar';

@Component({
    layout: 'header',
    components: { ModSidebar }
})
export default class Mod extends Vue {

}
</script>

<style lang="scss" scoped>
@import '../assets/styles/utils';

.ModPanel {
    height: calc(100vh - #{$header-height});
    display: flex;
    flex: 1;

    @include breakpoint(md) {
        display: block;
    }

    .main {
        width: 100%;
        background: $bg-color-3;
        overflow-y: auto;
        position: relative;
    }
}
</style>

