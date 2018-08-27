<template>
    <DashboardCard title="Daily Tasks" icon="fa fa-gift">
        <div class="item">
            <div class="main">
                <div class="col-xs-2 no-gutter">
                    <div class="devcoins">
                        <Devcoin></Devcoin>
                        <div class="devcoins__amount">500</div>
                    </div>
                </div>
                <div class="col-xs-8 no-gutter">Submit 5 Objectives</div>
            </div>
            <div>
                <a href="#" class="btn btn-outline-white btn-sm">Claim</a>
            </div>
        </div>

        <div class="item">
            <div class="main">
                <div class="col-xs-2 no-gutter">
                    <div class="devcoins">
                        <Devcoin></Devcoin>
                        <div class="devcoins__amount">200</div>
                    </div>
                </div>
                <div class="col-xs-8 no-gutter">Comment on a User Submission</div>
            </div>
            <div>
                <a href="#" class="btn btn-outline-white btn-sm disabled">Claim</a>
            </div>
        </div>
    </DashboardCard>
</template>

<script>
    import Component, {State} from 'nuxt-class-component';
    import Vue from 'vue';

    import DashboardCard from '~/components/DashboardCard';

    @Component({
        components: { DashboardCard }
    })

    export default class DailyPrizes extends Vue {
    }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/utils';

.item {
    @extend %flex-justify;
    padding: $grid-gutter-part;
    border-bottom: 1px solid $divider-color;
}

.main {
    width: 100%;
}
</style>
