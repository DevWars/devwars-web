<template>
    <div class="ModPanel">
        <ModSidebar/>

        <div class="main">
            <nuxt/>
        </div>
    </div>
</template>


<script>
import ModSidebar from '~/components/mod/ModSidebar';

export default {
    name: 'Mod',
    layout: 'header',
    components: { ModSidebar },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

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
