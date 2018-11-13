<template>
    <div class="section">
        <div class="header" :class="{ noScore: !blueScore && !redScore }">
            <span class="points team-blue" v-if="blueScore >= 0">{{ blueScore }}</span>
            <h3 v-if="title">{{ title }}</h3>
            <span class="points team-red" v-if="redScore >= 0">{{ redScore }}</span>
        </div>

        <div class="main">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: [ 'title', 'blueScore', 'redScore' ]
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.section {
    padding: 0 $s-space;
    text-align: center;
}

.header {
    @extend %flex-justify;
    border-top: 1px solid $divider-color;
    padding: $xs-space;
    margin: $grid-gutter-width auto $s-space;
    position: relative;

    h3 {
        @extend %absolute-center;
        display: block;
        text-transform: uppercase;
        font-family: $alt-font-face;
        font-weight: $font-weight-semibold;
        color: $text-color-secondary;
    }

    &.noScore {
        margin-bottom: 0;

        & > h3 {
            @include clear-position;
            width: 100%;
            padding: $xs-space 0;
        }

        & + .main {
            margin-bottom: $m-space;
            font-weight: $font-weight-regular;
        }
    }
}

.points {
    display: flex;
    align-items: center;
    font-size: $h1-font-size;
    font-weight: $font-weight-bold;

    &.aced:after {
        content: 'ACED';
        border: 1px solid $bonus-color;
        padding: $xxxs-space $xxs-space;
        margin: 0 $grid-gutter-part;
        font-weight: $font-weight-regular;
        font-size: $font-size-xs;
        color: $bonus-color;
    }

    &.team-blue {
        color: $brand-primary;
    }

    &.team-red {
        color: $brand-secondary;
    }
}
</style>
