<template>
    <DashboardCard
        title="Activity Log"
        icon="fa fa-bar-chart"
        class="scrollable"
    >
        <div class="activity-history">
            <div v-for="activity in paged" :key="activity.id" class="item">
                <Column :xs="2" class="date no-gutter">
                    {{ activity.created_at | moment('mediumDate') }}
                </Column>

                <Column :xs="9" class="no-gutter">
                    <div>{{ activity.description }}</div>

                    <div class="rewards">
                        <div
                            v-if="activity.coins"
                            class="reward"
                            :class="[activity.coins > 0 ? 'win' : 'lose']"
                        >
                            <DevcoinIcon />
                            <span>{{ activity.coins | number }}</span>
                        </div>
                        <div
                            v-if="activity.xp"
                            class="reward"
                            :class="[activity.xp > 0 ? 'win' : 'lose']"
                        >
                            <div class="xp">XP</div>
                            <span>{{ activity.xp | number }}</span>
                        </div>
                    </div>
                </Column>
            </div>
        </div>
    </DashboardCard>
</template>

<script>
import DashboardCard from '@/components/DashboardCard';
import DevcoinIcon from '@/components/DevcoinIcon';

export default {
    name: 'Activities',

    components: { DashboardCard, DevcoinIcon },

    props: {
        paged: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import 'utils.scss';

.item {
    display: flex;
    padding: $grid-gutter-width;
    border-bottom: 1px solid $divider-color;
}

.date {
    color: $text-color-muted;
}

.rewards {
    display: flex;
}

.reward {
    display: flex;
    align-items: center;
    min-width: 100px;
    margin-top: $xs-space;
    padding: $xxs-space $grid-gutter-width;
    border-radius: 50px;
    background-color: darken($bg-color-2, 3%);
    font-size: $font-size-sm;
    color: $success-color;

    & + & {
        margin-left: $xxs-space;
    }

    span {
        margin-left: 10px;
    }

    &.lose {
        color: $danger-color;
    }

    .DevcoinIcon {
        width: 18px;
        height: 18px;
    }

    .xp {
        font-size: 15px;
        color: $blue-color;
    }
}
</style>
