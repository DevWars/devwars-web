<template>
    <UserApplications :schedules="[schedule]">
        <ButtonGroup slot-scope="{isApplied, enter, cancel}">
            <Button
                v-show="!isApplied(schedule)"
                class="primary"
                @click="enter(schedule)"
            >Register for Entry</Button>
            <Button
                v-show="isApplied(schedule)"
                class="outline danger"
                @click="cancel(schedule)"
            >Resign</Button>
        </ButtonGroup>
    </UserApplications>
</template>


<script>
import UserApplications from '@/components/game/UserApplications';

export default {
    name: 'RegistrationButton',
    components: { UserApplications },
    props: {
        schedule: {
            type: Object,
            required: true,
        },
    },
};
</script>
