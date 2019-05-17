<template>
    <Applications :schedules="[schedule]">
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
