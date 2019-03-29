<template>
    <Applications :schedules="[schedule]">
        <div slot-scope="{isApplied, enter, cancel}">
            <a
                v-show="!isApplied(schedule)"
                class="btn btn-primary"
                @click="enter(schedule)"
            >Register for Entry</a>
            <a
                v-show="isApplied(schedule)"
                class="btn btn-outline-danger"
                @click="cancel(schedule)"
            >Resign</a>
        </div>
    </Applications>
</template>


<script>
import Applications from '~/components/game/Applications';

export default {
    name: 'RegistrationButton',
    components: { Applications },
    props: {
        schedule: {
            type: Object,
            required: true,
        },
    },
};
</script>
