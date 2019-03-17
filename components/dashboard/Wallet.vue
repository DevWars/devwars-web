<template>
    <DashboardCard class="wallet">
        <div class="wallet__inner">
            <div>
                <div class="devcoins devcoins-lg">
                    <Devcoin></Devcoin>
                    <div class="devcoins__amount">{{ user.statistics.coins | number }}</div>
                </div>
            </div>
            <div class="devcoins-wallet__actions">
                <button class="btn btn-outline-white btn-sm" disabled>Shop</button>
            </div>
        </div>

        <div class="inventory">
            <div class="inventory__slot col-xs-3 no-gutter"></div>
            <div class="inventory__slot col-xs-3 no-gutter"></div>
            <div class="inventory__slot col-xs-3 no-gutter"></div>
            <div class="inventory__slot col-xs-3 no-gutter"></div>
            <div class="inventory__slot col-xs-3 no-gutter"></div>
            <div class="inventory__slot col-xs-3 no-gutter"></div>
            <div class="inventory__slot col-xs-3 no-gutter"></div>
            <div class="inventory__slot col-xs-3 no-gutter"></div>
        </div>
        <div class="inventory__footer">
            <a href="#">Open Inventory</a>
        </div>
    </DashboardCard>
</template>

<script>
    import Vue from 'vue';

    import DashboardCard from '~/components/DashboardCard';
    import Devcoin from '~/components/Devcoin';

    export default {
        name: "Wallet",
        components: { DashboardCard, Devcoin },
        props: ['user']
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.wallet {
    overflow: hidden;

    &__inner {
        @extend %flex-justify;
        padding: $grid-gutter-part;
    }
}

.inventory {
    @extend %clear;
    border-top: 1px solid $divider-color;
    margin-left: -1px;
    background-color: $bg-color-2;
    position: relative;
    cursor: not-allowed;

    &__slot {
        @include aspect-ratio(1,1);
        border-bottom: 1px solid $divider-color;
        border-left: 1px solid $divider-color;
    }

    &__footer {
        line-height: 1;
        padding: $xs-space $grid-gutter-part $grid-gutter-part;
        text-align: right;

        a {
            text-transform: uppercase;
            font-size: $font-size-sm;
            color: $text-color-muted;
        }
    }

    &:before {
        @extend %absolute-overlay;
        content: "Coming Soon!";
        width: 100%;
        z-index: 2;
        font-weight: $font-weight-bold;
        text-align: center;
        background-color: rgba($bg-color-4, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        color: $text-color-muted;
    }
}
</style>
