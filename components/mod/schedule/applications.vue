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

    props: {
        schedule: {
            type: Object,
            required: true,
        },
    },
};
</script>
