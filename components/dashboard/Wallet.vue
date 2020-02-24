<template>
    <DashboardCard class="wallet">
        <div class="wallet__inner">
            <Devcoins :amount="stats.coins" />

            <div class="devcoins-wallet__actions">
                <Button class="outline sm" disabled>
                    Shop
                </Button>
            </div>
        </div>

        <div class="inventory">
            <Column :xs="3" class="inventory__slot no-gutter" />
            <Column :xs="3" class="inventory__slot no-gutter" />
            <Column :xs="3" class="inventory__slot no-gutter" />
            <Column :xs="3" class="inventory__slot no-gutter" />
            <Column :xs="3" class="inventory__slot no-gutter" />
            <Column :xs="3" class="inventory__slot no-gutter" />
            <Column :xs="3" class="inventory__slot no-gutter" />
            <Column :xs="3" class="inventory__slot no-gutter" />
        </div>

        <div class="inventory__footer">
            <a href="#">Open Inventory</a>
        </div>
    </DashboardCard>
</template>

<script>
import DashboardCard from '@/components/DashboardCard';
import Devcoins from '@/components/Devcoins';

export default {
    name: 'Wallet',
    components: { DashboardCard, Devcoins },
    props: {
        stats: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.wallet {
    overflow: hidden;

    &__inner {
        @extend %flex-justify;
        padding: $grid-gutter-width;
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
        @include aspect-ratio(1, 1);
        border-bottom: 1px solid $divider-color;
        border-left: 1px solid $divider-color;
    }

    &__footer {
        line-height: 1;
        padding: $xs-space $grid-gutter-width $grid-gutter-width;
        text-align: right;

        a {
            text-transform: uppercase;
            font-size: $font-size-sm;
            color: $text-color-muted;
        }
    }

    &:before {
        @extend %absolute-overlay;
        content: 'Coming Soon!';
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
