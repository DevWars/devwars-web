<template>
    <DashboardCard title="Upcoming Games" icon="fa fa-calendar" class="scrollable">
        <div
            v-for="schedule in upcoming"
            :key="schedule.id"
            class="schedule"
            :class="{ entered: isApplied(schedule) }"
        >
            <div class="main">
                <Column
                    :xs="2"
                    class="no-gutter status"
                >{{ isApplied(schedule) ? 'Entered' : 'Not Entered'}}</Column>
                <Column :xs="10" class="no-gutter">
                    {{ schedule.startTime | moment('longDate') }}
                    @ {{ schedule.startTime | moment('HH:mm') }} (UTC)
                </Column>
            </div>

            <RegistrationButtons :schedule="schedule"/>
        </div>
    </DashboardCard>
</template>


<script>
import RegistrationButtons from '@/components/game/RegistrationButtons';
import DashboardCard from '@/components/DashboardCard';

export default {
    name: 'UpcomingGames',

    components: { RegistrationButtons, DashboardCard },

    props: {
        upcoming: {
            type: Array,
            required: true,
        },
    },

    computed: {
        applications() {
            return this.$store.state.game.applications;
        },
    },

    methods: {
        isApplied(schedule) {
            return this.applications.some((application) => {
                return application.schedule && application.schedule.id === schedule.id;
            });
        },
    },
};
</script>


<style lang="scss" scoped>
@import 'utils.scss';

.schedule {
    @extend %flex-justify;
    padding: $grid-gutter-width;
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
