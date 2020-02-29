<template>
    <div>
        <Applications :schedule="schedule" />
    </div>
</template>

<script>
import { names } from '../../../utils/auth';
import Applications from '@/components/game/Applications';

export default {
    name: 'DashboardSchedulesApplications',

    meta: {
        auth: names.MODERATOR,
    },

    components: { Applications },

    computed: {
        schedule() {
            const schedules = this.$store.state.game.schedules;
            return schedules.find(
                (schedule) => schedule.id === Number(this.$route.query.schedule),
            );
        },
    },
};
</script>
