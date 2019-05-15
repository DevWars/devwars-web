<template>
    <DashboardCard title="Activity Log" icon="fa fa-bar-chart" class="scrollable">
        <ul class="activity-history">
            <li v-for="activity in paged" :key="activity.id" class="item">
                <div
                    class="date col-xs-3 no-gutter"
                >{{ activity.created_at | moment('mediumDate') }}</div>
                <div class="title col-xs-6 no-gutter">{{ activity.description}}</div>
                <div class="rewards col-sm-3 no-gutter">
                    <div
                        v-if="activity.bits"
                        class="reward"
                        :class="[activity.bits > 0 ? 'win' : '']"
                    >{{ (activity.bits) }} Devcoins</div>
                    <div
                        v-if="activity.xp"
                        class="reward"
                        :class="[activity.xp > 0 ? 'win' : '']"
                    >{{ (activity.xp) }} XP</div>
                </div>
            </li>
        </ul>
    </DashboardCard>
</template>


<script>
import DashboardCard from '~/components/DashboardCard';

export default {
    name: 'Activities',
    components: { DashboardCard },
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

.activity-history {
    @extend %list-unstyled;
    max-height: 250px;
    padding-top: 0;
    overflow-y: auto;
}

.date,
.title,
.rewards {
    font-size: $font-size-sm;
}

.item {
    @extend %clear;
    padding: $grid-gutter-part;
    border-bottom: 1px solid $divider-color;
    font-size: 0;
}

.date {
    color: $text-color-muted;
}

.rewards {
    text-align: right;
}

.reward {
    display: inline-block;
    padding: $xxs-space $grid-gutter-part;
    border-radius: 50px;
    background-color: darken($bg-color-2, 3%);
    color: $success-color;

    & + & {
        margin-top: $xs-space;
    }

    &:before {
        content: '+';
    }

    &.lose {
        color: $danger-color;

        &:before {
            content: '-';
        }
    }
}
</style>
