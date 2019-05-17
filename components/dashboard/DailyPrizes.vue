<template>
    <DashboardCard title="Daily Tasks" icon="fa fa-gift" class="scrollable">
        <div class="item">
            <div class="main">
                <div class="col-xs-2 no-gutter">
                    <Devcoins amount="500" class="xs"/>
                </div>
                <div class="col-xs-8 no-gutter">Submit 5 Objectives</div>
            </div>
            <div>
                <Button class="outline sm">Claim</Button>
            </div>
        </div>

        <div class="item">
            <div class="main">
                <div class="col-xs-2 no-gutter">
                    <Devcoins amount="300" class="xs"/>
                </div>
                <div class="col-xs-8 no-gutter">Comment on a User Submission</div>
            </div>
            <div>
                <Button class="outline sm" disabled>Claim</Button>
            </div>
        </div>
    </DashboardCard>
</template>


<script>
import DashboardCard from '~/components/DashboardCard';
import Devcoins from '~/components/Devcoins';

export default {
    name: 'DailyPrizes',
    components: { DashboardCard, Devcoins },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.item {
    @extend %flex-justify;
    padding: $grid-gutter-part;
    border-bottom: 1px solid $divider-color;
}

.main {
    width: 100%;
}
</style>
