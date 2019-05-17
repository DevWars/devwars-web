<template>
    <DashboardCard title="Upcoming Games" icon="fa fa-calendar" class="scrollable">
        <Applications>
            <div slot-scope="{isApplied, cancel, enter}">
                <div
                    v-for="schedule in upcoming"
                    :key="schedule.id"
                    class="schedule"
                    :class="{ entered: isApplied(schedule) }"
                >
                    <div class="main">
                        <div
                            class="col-xs-2 no-gutter status"
                        >{{ isApplied(schedule) ? 'Entered' : 'Not Entered'}}</div>
                        <div class="col-xs-8 no-gutter">
                            {{ schedule.startTime | moment('longDate') }}
                            @ {{ schedule.startTime | moment('HH:mm') }} (UTC)
                        </div>
                    </div>

                    <div class="actions">
                        <Button
                            v-if="!isApplied(schedule)"
                            class="outline sm block"
                            @click="enter(schedule)"
                        >Enter</Button>
                        <Button
                            v-else
                            class="outline danger sm block"
                            @click="cancel(schedule)"
                        >Cancel</Button>
                    </div>
                </div>
            </div>
        </Applications>
    </DashboardCard>
</template>


<script>
import Applications from '~/components/game/Applications';
import DashboardCard from '~/components/DashboardCard';

export default {
    name: 'UpcomingGames',

    components: { Applications, DashboardCard },

    props: {
        upcoming: {
            type: Array,
            required: true,
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.schedule {
    @extend %flex-justify;
    padding: $grid-gutter-part;
    border-bottom: 1px solid $divider-color;

    .status {
        color: $text-color-muted;
    }

    &.entered .status {
        color: $warning-color;
    }
}

/deep/ {
    .main {
        width: 100%;
    }

    .actions {
        width: 100px;
    }
}
</style>
