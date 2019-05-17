<template>
    <DashboardCard title="Daily Tasks" icon="fa fa-gift" class="scrollable">
        <div class="item">
            <div class="main">
                <Column :xs="2" class="no-gutter">
                    <Devcoins amount="500" class="xs"/>
                </Column>
                <Column :xs="10" class="no-gutter">Submit 5 Objectives</Column>
            </div>
            <Button class="outline sm">Claim</Button>
        </div>

        <div class="item">
            <div class="main">
                <Column :xs="2" class="no-gutter">
                    <Devcoins amount="500" class="xs"/>
                </Column>
                <Column :xs="10" class="no-gutter">Comment on a User Submission</Column>
            </div>
            <Button class="outline sm" disabled>Claim</Button>
        </div>
    </DashboardCard>
</template>


<script>
import DashboardCard from '@/components/DashboardCard';
import Devcoins from '@/components/Devcoins';

export default {
    name: 'DailyPrizes',
    components: { DashboardCard, Devcoins },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.item {
    @extend %flex-justify;
    padding: $grid-gutter-width;
    border-bottom: 1px solid $divider-color;
}

.main {
    width: 100%;
}
</style>
