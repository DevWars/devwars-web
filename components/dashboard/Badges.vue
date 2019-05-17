<template>
    <DashboardCard title="Badges" icon="fa fa-shield">
        <div class="dashboard-badges">
            <div class="overview">
                <i class="icon fa fa-shield"></i>
                <p class="total">{{owned.length }}</p>
            </div>

            <Button to="/badges" class="outline sm">View Badges</Button>

            <Progress
                title="Badges"
                :meta="(owned.length + '/' + badges.length)"
                :progress="(owned.length / badges.length * 100)  + '%'"
            />
        </div>
    </DashboardCard>
</template>


<script>
import DashboardCard from '@/components/DashboardCard';
import Progress from '@/components/form/Progress';

export default {
    name: 'DashboardBadges',
    components: { DashboardCard, Progress },
    props: {
        owned: {
            type: Object,
            required: true,
        },
    },
    computed: {
        badges() {
            return this.$store.state.badges.badges;
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.dashboard-badges {
    padding: 30px;
    text-align: center;
    font-size: 0;
    line-height: 1;
}

.overview {
    padding-bottom: $xs-space;
}

.icon,
.total {
    @extend %align-middle;
}

.total {
    line-height: 50px;
    font-size: 48px;
    font-weight: 400;
}

.icon {
    padding-right: 10px;

    &:before {
        font-size: 38px;
    }
}

.Button {
    margin-bottom: $m-space;
}
</style>
